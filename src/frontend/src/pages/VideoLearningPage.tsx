import { useState, useMemo, useCallback, memo } from 'react';
import { Play, ExternalLink, Youtube, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useGetAllVideoCategories, useGetCuratedVideos } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import type { Video } from '../backend';

interface CuratedVideo {
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
  source: 'curated';
}

type AnyVideo = Video | CuratedVideo;

const VIDEOS_PER_PAGE = 12;

// Memoized video card component to prevent unnecessary re-renders
const VideoCard = memo(({ 
  video, 
  videoKey, 
  categoryIndex, 
  videoIndex, 
  onPlay 
}: { 
  video: AnyVideo; 
  videoKey: string; 
  categoryIndex: number; 
  videoIndex: number; 
  onPlay: (video: AnyVideo) => void;
}) => {
  const [isLoadingThumb, setIsLoadingThumb] = useState(true);

  const handleThumbnailLoad = useCallback(() => {
    setIsLoadingThumb(false);
  }, []);

  const handleThumbnailError = useCallback(() => {
    setIsLoadingThumb(false);
  }, []);

  const handlePlayClick = useCallback(() => {
    onPlay(video);
  }, [video, onPlay]);

  return (
    <Card
      className="glass-card shadow-glass border-glass transition-all duration-300 hover:shadow-glass-hover hover:scale-105 group overflow-hidden animate-scale-in"
      style={{ animationDelay: `${(categoryIndex * 3 + videoIndex) * 80}ms` }}
    >
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg aspect-video bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
          {isLoadingThumb && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 animate-shimmer bg-[length:200%_200%]">
              <Loader2 className="h-8 w-8 text-primary/60 animate-spin" />
            </div>
          )}
          <img
            src={video.thumbnail}
            alt={video.title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isLoadingThumb ? 'opacity-0' : 'opacity-100 group-hover:scale-110'
            }`}
            onLoad={handleThumbnailLoad}
            onError={handleThumbnailError}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              onClick={handlePlayClick}
              size="lg"
              className="glass-button shadow-glow rounded-full h-16 w-16 p-0 scale-90 group-hover:scale-100 transition-transform duration-300"
            >
              <Play className="h-8 w-8 fill-current" />
            </Button>
          </div>
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="glass-card-strong shadow-glass">
              <Youtube className="h-3 w-3 mr-1" />
              TED
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {video.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-sm">
          {video.description}
        </CardDescription>
        <Button
          onClick={handlePlayClick}
          variant="outline"
          size="sm"
          className="w-full mt-2 glass-button-subtle hover:glass-button transition-all duration-300"
        >
          <Play className="h-4 w-4 mr-2" />
          Watch Now
        </Button>
      </CardContent>
    </Card>
  );
});

VideoCard.displayName = 'VideoCard';

export default function VideoLearningPage() {
  const { data: categories, isLoading: categoriesLoading } = useGetAllVideoCategories();
  const { data: curatedVideos, isLoading: curatedLoading } = useGetCuratedVideos();
  const [selectedVideo, setSelectedVideo] = useState<AnyVideo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const isLoading = categoriesLoading || curatedLoading;

  const handlePlayVideo = useCallback((video: AnyVideo) => {
    setSelectedVideo(video);
    setIsDialogOpen(true);
  }, []);

  const isCuratedVideo = (video: AnyVideo): video is CuratedVideo => {
    return 'source' in video && video.source === 'curated';
  };

  const getEmbedUrl = useCallback((video: AnyVideo): string => {
    const url = video.url;
    // Convert YouTube watch URLs to embed URLs
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    // Convert YouTube short URLs to embed URLs
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    return url;
  }, []);

  const getVideoUrl = useCallback((video: AnyVideo): string => {
    return video.url;
  }, []);

  // Memoize merged categories to prevent recalculation on every render
  const mergedCategories = useMemo(() => {
    const result: Array<{ name: string; videos: AnyVideo[] }> = [];
    
    // Start with backend categories
    if (categories) {
      categories.forEach(cat => {
        result.push({
          name: cat.name,
          videos: [...cat.videos],
        });
      });
    }

    // Add curated videos
    if (curatedVideos && curatedVideos.length > 0) {
      curatedVideos.forEach(video => {
        const existingCategory = result.find(cat => cat.name === video.category);
        if (existingCategory) {
          existingCategory.videos.push(video);
        } else {
          result.push({
            name: video.category,
            videos: [video],
          });
        }
      });
    }

    return result;
  }, [categories, curatedVideos]);

  // Memoize paginated videos
  const paginatedVideos = useMemo(() => {
    const allVideos = mergedCategories.flatMap(cat => cat.videos);
    const startIndex = currentPage * VIDEOS_PER_PAGE;
    const endIndex = startIndex + VIDEOS_PER_PAGE;
    return allVideos.slice(startIndex, endIndex);
  }, [mergedCategories, currentPage]);

  const totalPages = useMemo(() => {
    const allVideos = mergedCategories.flatMap(cat => cat.videos);
    return Math.ceil(allVideos.length / VIDEOS_PER_PAGE);
  }, [mergedCategories]);

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  }, []);

  // Enhanced loading skeleton with shimmer effect
  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-8 animate-fade-in">
        <div className="space-y-3">
          <Skeleton className="h-10 w-64 glass-card animate-pulse-slow" />
          <Skeleton className="h-6 w-96 glass-card animate-pulse-slow" style={{ animationDelay: '100ms' }} />
        </div>
        
        {[1, 2].map((categoryIndex) => (
          <div key={categoryIndex} className="space-y-4 animate-slide-up" style={{ animationDelay: `${categoryIndex * 150}ms` }}>
            <div className="flex items-center gap-3">
              <Skeleton className="h-1 w-12 rounded-full glass-card" />
              <Skeleton className="h-8 w-48 glass-card animate-pulse-slow" />
              <Skeleton className="h-6 w-20 rounded-full glass-card" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="glass-card shadow-glass border-glass overflow-hidden animate-scale-in" style={{ animationDelay: `${(categoryIndex * 3 + i) * 100}ms` }}>
                  <CardHeader className="p-0">
                    <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 animate-shimmer bg-[length:200%_200%]">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-12 w-12 text-primary/40 animate-spin" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-6 w-full glass-card animate-pulse-slow" />
                    <Skeleton className="h-4 w-full glass-card animate-pulse-slow" style={{ animationDelay: '50ms' }} />
                    <Skeleton className="h-4 w-3/4 glass-card animate-pulse-slow" style={{ animationDelay: '100ms' }} />
                    <Skeleton className="h-10 w-full rounded-lg glass-card animate-pulse-slow" style={{ animationDelay: '150ms' }} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Youtube className="h-8 w-8 text-primary" />
          Video Learning
        </h2>
        <p className="text-muted-foreground">
          Curated TED talks on business strategies, leadership, entrepreneurship, and innovation
        </p>
      </div>

      {/* Video Categories */}
      {mergedCategories && mergedCategories.length > 0 ? (
        mergedCategories.map((category, categoryIndex) => (
          <section key={category.name} className="space-y-4 animate-slide-up" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
              <h3 className="text-2xl font-bold text-foreground">{category.name}</h3>
              <Badge variant="secondary" className="glass-card">
                {category.videos.length} {category.videos.length === 1 ? 'video' : 'videos'}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.videos.map((video, videoIndex) => {
                const videoKey = `${video.title}-${videoIndex}`;
                
                return (
                  <VideoCard
                    key={videoKey}
                    video={video}
                    videoKey={videoKey}
                    categoryIndex={categoryIndex}
                    videoIndex={videoIndex}
                    onPlay={handlePlayVideo}
                  />
                );
              })}
            </div>
          </section>
        ))
      ) : (
        <Card className="glass-card shadow-glass border-glass animate-scale-in">
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="h-20 w-20 rounded-full glass-card flex items-center justify-center animate-float">
              <Youtube className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">No Videos Available</h3>
              <p className="text-muted-foreground max-w-md">
                Video content is being curated. Check back soon for educational resources on business growth, leadership, and entrepreneurship!
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video Player Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl glass-card-strong border-glass shadow-glass animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Youtube className="h-5 w-5 text-primary" />
              {selectedVideo?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative w-full rounded-lg overflow-hidden glass-card border-glass bg-black" style={{ paddingBottom: '56.25%' }}>
              {selectedVideo && (
                <iframe
                  src={getEmbedUrl(selectedVideo)}
                  title={selectedVideo.title}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
            {selectedVideo && (
              <div className="space-y-3 glass-card p-4 rounded-lg border-glass">
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedVideo.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-button-subtle hover:glass-button transition-all duration-300"
                  onClick={() => window.open(getVideoUrl(selectedVideo), '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Watch on YouTube
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
