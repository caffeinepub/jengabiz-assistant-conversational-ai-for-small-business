import { useState, useEffect, useCallback } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatPage from './ChatPage';
import MarketAnalysisPage from './MarketAnalysisPage';
import VideoLearningPage from './VideoLearningPage';
import AboutPage from './AboutPage';
import LoginModal from '@/components/LoginModal';
import ProfileSetupModal from '@/components/ProfileSetupModal';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function MainApp() {
  const { identity, loginStatus } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [activeTab, setActiveTab] = useState<'chat' | 'market' | 'videos' | 'about'>('chat');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const isAuthenticated = !!identity;

  // Show login modal if not authenticated
  useEffect(() => {
    if (!isAuthenticated && loginStatus !== 'logging-in') {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [isAuthenticated, loginStatus]);

  // Show profile setup if authenticated but no profile
  useEffect(() => {
    if (isAuthenticated && !profileLoading && isFetched && userProfile === null) {
      setShowProfileSetup(true);
    } else {
      setShowProfileSetup(false);
    }
  }, [isAuthenticated, profileLoading, isFetched, userProfile]);

  // Memoized handler for AI button click
  const handleAIButtonClick = useCallback(() => {
    setActiveTab('chat');
  }, []);

  // Handler to close profile setup modal
  const handleCloseProfileSetup = useCallback(() => {
    setShowProfileSetup(false);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header activeTab={activeTab} />

        <main className="flex-1 container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 glass-card shadow-glass mb-8">
              <TabsTrigger value="chat" className="data-[state=active]:glass-button">
                Chat
              </TabsTrigger>
              <TabsTrigger value="market" className="data-[state=active]:glass-button">
                Market Analysis
              </TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:glass-button">
                Video Learning
              </TabsTrigger>
              <TabsTrigger value="about" className="data-[state=active]:glass-button">
                About
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="mt-0">
              <ChatPage />
            </TabsContent>

            <TabsContent value="market" className="mt-0">
              <MarketAnalysisPage />
            </TabsContent>

            <TabsContent value="videos" className="mt-0">
              <VideoLearningPage />
            </TabsContent>

            <TabsContent value="about" className="mt-0">
              <AboutPage />
            </TabsContent>
          </Tabs>
        </main>

        <Footer />
      </div>

      {/* Persistent Floating AI Assistant Button */}
      <Button
        onClick={handleAIButtonClick}
        size="lg"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl glass-button backdrop-blur-xl bg-primary/80 hover:bg-primary/90 transition-all duration-300 hover:scale-110 active:scale-95 group animate-float"
        aria-label="Open AI Chat Assistant"
      >
        <div className="relative">
          <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
          <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-pulse" />
        </div>
      </Button>

      {/* Modals */}
      <LoginModal open={showLoginModal} />
      <ProfileSetupModal open={showProfileSetup} onClose={handleCloseProfileSetup} />
    </div>
  );
}
