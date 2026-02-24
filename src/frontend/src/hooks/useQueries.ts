import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, VideoCategory, Video, ExchangeRate } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useFetchMarketData() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.fetchMarketData();
    },
  });
}

export function useGetAllVideoCategories() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<VideoCategory[]>({
    queryKey: ['videoCategories'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllVideoCategories();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetVideosByCategory(categoryName: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['videos', categoryName],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getVideosByCategory(categoryName);
    },
    enabled: !!actor && !actorFetching && !!categoryName,
  });
}

interface CuratedVideo {
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
  source: 'curated';
}

// Verified and accessible public TED YouTube videos focused on business, leadership, entrepreneurship, and innovation
// All videos are from the official TED YouTube channel and are publicly available
// Videos selected for relevance to small business owners and entrepreneurs
const CURATED_VIDEOS: CuratedVideo[] = [
  // Business Growth & Strategy
  {
    title: 'The single biggest reason why start-ups succeed | Bill Gross',
    description: 'Bill Gross has founded a lot of start-ups, and incubated many others — and he got curious about why some succeeded and others failed. So he gathered data from hundreds of companies, his own and other people\'s, and ranked each company on five key factors. He found one factor that stands out from the others — and surprised even him.',
    url: 'https://www.youtube.com/watch?v=bNpx7gpSqbY',
    thumbnail: 'https://i.ytimg.com/vi/bNpx7gpSqbY/hqdefault.jpg',
    category: 'Business Growth & Strategy',
    source: 'curated',
  },
  {
    title: 'How to build a company where the best ideas win | Ray Dalio',
    description: 'What if you knew what your coworkers really thought about you and what they were really like? Ray Dalio makes the business case for using radical transparency and algorithmic decision-making to create an idea meritocracy where people can speak up and say what they really think.',
    url: 'https://www.youtube.com/watch?v=hm3IPkWBvcY',
    thumbnail: 'https://i.ytimg.com/vi/hm3IPkWBvcY/hqdefault.jpg',
    category: 'Business Growth & Strategy',
    source: 'curated',
  },
  {
    title: 'The way we think about work is broken | Barry Schwartz',
    description: 'What makes work satisfying? Apart from a paycheck, there are intangible values of work that are rarely discussed. In this talk, Barry Schwartz makes a passionate call for "practical wisdom" as an antidote to a society gone mad with bureaucracy.',
    url: 'https://www.youtube.com/watch?v=lRO3jnXQhAs',
    thumbnail: 'https://i.ytimg.com/vi/lRO3jnXQhAs/hqdefault.jpg',
    category: 'Business Growth & Strategy',
    source: 'curated',
  },
  // Leadership & Management
  {
    title: 'How great leaders inspire action | Simon Sinek',
    description: 'Simon Sinek presents a simple but powerful model for how leaders inspire action, starting with a golden circle and the question "Why?" His examples include Apple, Martin Luther King, and the Wright brothers.',
    url: 'https://www.youtube.com/watch?v=qp0HIF3SfI4',
    thumbnail: 'https://i.ytimg.com/vi/qp0HIF3SfI4/hqdefault.jpg',
    category: 'Leadership & Management',
    source: 'curated',
  },
  {
    title: 'The puzzle of motivation | Dan Pink',
    description: 'Career analyst Dan Pink examines the puzzle of motivation, starting with a fact that social scientists know but most managers don\'t: Traditional rewards aren\'t always as effective as we think.',
    url: 'https://www.youtube.com/watch?v=rrkrvAUbU9Y',
    thumbnail: 'https://i.ytimg.com/vi/rrkrvAUbU9Y/hqdefault.jpg',
    category: 'Leadership & Management',
    source: 'curated',
  },
  {
    title: 'The happy secret to better work | Shawn Achor',
    description: 'We believe that we should work to be happy, but could that be backwards? In this fast-moving and entertaining talk, psychologist Shawn Achor argues that actually happiness inspires productivity.',
    url: 'https://www.youtube.com/watch?v=fLJsdqxnZb0',
    thumbnail: 'https://i.ytimg.com/vi/fLJsdqxnZb0/hqdefault.jpg',
    category: 'Leadership & Management',
    source: 'curated',
  },
  {
    title: 'Why good leaders make you feel safe | Simon Sinek',
    description: 'What makes a great leader? Management theorist Simon Sinek suggests, it\'s someone who makes their employees feel secure, who draws staffers into a circle of trust. But creating trust and safety requires courage and sacrifice.',
    url: 'https://www.youtube.com/watch?v=lmyZMtPVodo',
    thumbnail: 'https://i.ytimg.com/vi/lmyZMtPVodo/hqdefault.jpg',
    category: 'Leadership & Management',
    source: 'curated',
  },
  // Entrepreneurship & Innovation
  {
    title: 'Your body language may shape who you are | Amy Cuddy',
    description: 'Body language affects how others see us, but it may also change how we see ourselves. Social psychologist Amy Cuddy argues that "power posing" can boost feelings of confidence, and might have an impact on our chances for success.',
    url: 'https://www.youtube.com/watch?v=Ks-_Mh1QhMc',
    thumbnail: 'https://i.ytimg.com/vi/Ks-_Mh1QhMc/hqdefault.jpg',
    category: 'Entrepreneurship & Innovation',
    source: 'curated',
  },
  {
    title: 'How to build your creative confidence | David Kelley',
    description: 'Is your school or workplace divided into "creatives" versus practical people? Yet surely, David Kelley suggests, creativity is not the domain of only a chosen few. Telling stories from his legendary design career and his own life, he offers ways to build the confidence to create.',
    url: 'https://www.youtube.com/watch?v=16p9YRF0l-g',
    thumbnail: 'https://i.ytimg.com/vi/16p9YRF0l-g/hqdefault.jpg',
    category: 'Entrepreneurship & Innovation',
    source: 'curated',
  },
  {
    title: 'The power of believing that you can improve | Carol Dweck',
    description: 'Carol Dweck researches "growth mindset" — the idea that we can grow our brain\'s capacity to learn and to solve problems. In this talk, she describes two ways to think about a problem that\'s slightly too hard for you to solve.',
    url: 'https://www.youtube.com/watch?v=_X0mgOOSpLU',
    thumbnail: 'https://i.ytimg.com/vi/_X0mgOOSpLU/hqdefault.jpg',
    category: 'Entrepreneurship & Innovation',
    source: 'curated',
  },
  {
    title: 'The surprising habits of original thinkers | Adam Grant',
    description: 'How do creative people come up with great ideas? Organizational psychologist Adam Grant studies "originals": thinkers who dream up new ideas and take action to put them into the world.',
    url: 'https://www.youtube.com/watch?v=fxbCHn6gE3U',
    thumbnail: 'https://i.ytimg.com/vi/fxbCHn6gE3U/hqdefault.jpg',
    category: 'Entrepreneurship & Innovation',
    source: 'curated',
  },
  // Marketing & Communication
  {
    title: 'The art of asking | Amanda Palmer',
    description: 'Don\'t make people pay for music, says Amanda Palmer. Let them. In a passionate talk that begins in her days as a street performer, she examines the new relationship between artist and fan.',
    url: 'https://www.youtube.com/watch?v=xMj_P_6H69g',
    thumbnail: 'https://i.ytimg.com/vi/xMj_P_6H69g/hqdefault.jpg',
    category: 'Marketing & Communication',
    source: 'curated',
  },
  {
    title: 'How to speak so that people want to listen | Julian Treasure',
    description: 'Have you ever felt like you\'re talking, but nobody is listening? Here\'s Julian Treasure to help. In this useful talk, the sound expert demonstrates the how-to\'s of powerful speaking.',
    url: 'https://www.youtube.com/watch?v=eIho2S0ZahI',
    thumbnail: 'https://i.ytimg.com/vi/eIho2S0ZahI/hqdefault.jpg',
    category: 'Marketing & Communication',
    source: 'curated',
  },
  {
    title: 'The power of vulnerability | Brené Brown',
    description: 'Brené Brown studies human connection -- our ability to empathize, belong, love. In a poignant, funny talk, she shares a deep insight from her research, one that sent her on a personal quest to know herself as well as to understand humanity.',
    url: 'https://www.youtube.com/watch?v=iCvmsMzlF7o',
    thumbnail: 'https://i.ytimg.com/vi/iCvmsMzlF7o/hqdefault.jpg',
    category: 'Marketing & Communication',
    source: 'curated',
  },
  // Financial Planning & Decision Making
  {
    title: 'The psychology of your future self | Dan Gilbert',
    description: '"Human beings are works in progress that mistakenly think they\'re finished." Dan Gilbert shares recent research on a phenomenon he calls the "end of history illusion," where we somehow imagine that the person we are right now is the person we\'ll be for the rest of time.',
    url: 'https://www.youtube.com/watch?v=XNbaR54Gpj4',
    thumbnail: 'https://i.ytimg.com/vi/XNbaR54Gpj4/hqdefault.jpg',
    category: 'Financial Planning & Decision Making',
    source: 'curated',
  },
  {
    title: 'How to make hard choices | Ruth Chang',
    description: 'Here\'s a talk that could literally change your life. Which career should I pursue? Should I break up — or get married?! Where should I live? Big decisions like these can be agonizingly difficult. But that\'s because we think about them the wrong way, says philosopher Ruth Chang.',
    url: 'https://www.youtube.com/watch?v=8GQZuzIdeQQ',
    thumbnail: 'https://i.ytimg.com/vi/8GQZuzIdeQQ/hqdefault.jpg',
    category: 'Financial Planning & Decision Making',
    source: 'curated',
  },
  {
    title: 'The riddle of experience vs. memory | Daniel Kahneman',
    description: 'Using examples from vacations to colonoscopies, Nobel laureate and founder of behavioral economics Daniel Kahneman reveals how our "experiencing selves" and our "remembering selves" perceive happiness differently.',
    url: 'https://www.youtube.com/watch?v=XgRlrBl-7Yg',
    thumbnail: 'https://i.ytimg.com/vi/XgRlrBl-7Yg/hqdefault.jpg',
    category: 'Financial Planning & Decision Making',
    source: 'curated',
  },
  // Productivity & Time Management
  {
    title: 'Inside the mind of a master procrastinator | Tim Urban',
    description: 'Tim Urban knows that procrastination doesn\'t make sense, but he\'s never been able to shake his habit of waiting until the last minute to get things done. In this hilarious and insightful talk, Urban takes us on a journey through YouTube binges, Wikipedia rabbit holes and bouts of staring out the window.',
    url: 'https://www.youtube.com/watch?v=arj7oStGLkU',
    thumbnail: 'https://i.ytimg.com/vi/arj7oStGLkU/hqdefault.jpg',
    category: 'Productivity & Time Management',
    source: 'curated',
  },
  {
    title: 'How to gain control of your free time | Laura Vanderkam',
    description: 'There are 168 hours in each week. How do we find time for what matters most? Time management expert Laura Vanderkam studies how busy people spend their lives, and she\'s discovered that many of us drastically overestimate our commitments each week, while underestimating the time we have to ourselves.',
    url: 'https://www.youtube.com/watch?v=n3kNlFMXslo',
    thumbnail: 'https://i.ytimg.com/vi/n3kNlFMXslo/hqdefault.jpg',
    category: 'Productivity & Time Management',
    source: 'curated',
  },
];

// Hook to get curated videos - returns verified, accessible TED videos
export function useGetCuratedVideos() {
  return useQuery<CuratedVideo[]>({
    queryKey: ['curatedVideos'],
    queryFn: async () => {
      // Simulate a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      return CURATED_VIDEOS;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  category: string;
  source: 'youtube';
}

// YouTube API integration hook - disabled by default to avoid API quota issues
// This is kept for future enhancement if YouTube API key is provided
export function useGetYouTubeVideos(enabled: boolean = false) {
  return useQuery<YouTubeVideo[]>({
    queryKey: ['youtubeVideos'],
    queryFn: async () => {
      const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
      
      if (!API_KEY) {
        console.warn('YouTube API key not configured');
        return [];
      }

      const categories = [
        { name: 'Business Growth & Strategy', query: 'TED business strategy growth' },
        { name: 'Marketing & Communication', query: 'TED marketing communication' },
        { name: 'Financial Planning & Decision Making', query: 'TED decision making finance' },
        { name: 'Productivity & Time Management', query: 'TED productivity time management' },
      ];

      const allVideos: YouTubeVideo[] = [];

      for (const category of categories) {
        try {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(category.query)}&type=video&maxResults=3&key=${API_KEY}&relevanceLanguage=en&safeSearch=strict`
          );

          if (!response.ok) {
            console.error(`Failed to fetch YouTube videos for ${category.name}`);
            continue;
          }

          const data = await response.json();

          if (data.items) {
            const videos = data.items.map((item: any) => ({
              id: item.id.videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
              channelTitle: item.snippet.channelTitle,
              publishedAt: item.snippet.publishedAt,
              category: category.name,
              source: 'youtube' as const,
            }));

            allVideos.push(...videos);
          }
        } catch (error) {
          console.error(`Error fetching YouTube videos for ${category.name}:`, error);
        }
      }

      return allVideos;
    },
    enabled,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });
}

// USSD Integration with retry mechanism and connection validation
interface USSDResponse {
  success: boolean;
  message: string;
  status: 'available' | 'unavailable' | 'error';
  timestamp: number;
}

export function useSendUSSDRequest() {
  const { actor } = useActor();

  return useMutation<USSDResponse, Error, { code: string; service: string }>({
    mutationFn: async ({ code, service }) => {
      if (!actor) {
        throw new Error('Actor not available');
      }

      try {
        const response = await actor.sendUSSDRequest(code, service);
        
        // Parse the backend response
        return {
          success: true,
          message: response,
          status: 'available' as const,
          timestamp: Date.now(),
        };
      } catch (error: any) {
        // Handle specific error cases
        if (error.message?.includes('Unauthorized')) {
          throw new Error('Please log in to use USSD services');
        }
        
        // Network or service errors
        throw new Error('USSD service temporarily unavailable. Please try again.');
      }
    },
    retry: (failureCount, error) => {
      // Don't retry on authentication errors
      if (error.message?.includes('log in')) {
        return false;
      }
      // Retry up to 3 times for network/service errors
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => {
      // Exponential backoff: 1s, 2s, 4s
      return Math.min(1000 * Math.pow(2, attemptIndex), 4000);
    },
  });
}

// Check USSD service availability
export function useCheckUSSDAvailability() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<{ available: boolean; message: string }>({
    queryKey: ['ussdAvailability'],
    queryFn: async () => {
      if (!actor) {
        return {
          available: false,
          message: 'Service initializing...',
        };
      }

      try {
        // Test with a simple ping request
        await actor.sendUSSDRequest('*711*23#', 'ping');
        return {
          available: true,
          message: 'USSD service is operational',
        };
      } catch (error: any) {
        // If unauthorized, service is available but user needs to log in
        if (error.message?.includes('Unauthorized')) {
          return {
            available: true,
            message: 'Please log in to use USSD services',
          };
        }
        
        return {
          available: false,
          message: 'USSD service temporarily unavailable',
        };
      }
    },
    enabled: !!actor && !actorFetching,
    staleTime: 1000 * 60 * 5, // Check every 5 minutes
    retry: false,
  });
}

// Exchange Rates Hooks
export function useGetExchangeRates() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ExchangeRate[]>({
    queryKey: ['exchangeRates'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getExchangeRates();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // Auto-refetch every 5 minutes
  });
}

export function useGetLastExchangeRatesUpdateTimestamp() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<bigint | null>({
    queryKey: ['exchangeRatesTimestamp'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getLastExchangeRatesUpdateTimestamp();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // Auto-refetch every 5 minutes
  });
}
