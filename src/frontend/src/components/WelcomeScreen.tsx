import { memo } from 'react';
import { MessageCircle, TrendingUp, Video, Info } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

const WelcomeScreen = memo(() => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section with Enhanced Reveal */}
      <div className="text-center space-y-6 animate-hero-reveal">
        <div className="inline-block">
          <img
            src="/assets/generated/jengabiz-logo-transparent.dim_200x200.png"
            alt="JengaBiz Logo"
            className="h-24 w-24 mx-auto animate-float"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground animate-slide-up" style={{ animationDelay: '100ms' }}>
          Welcome to <span className="text-primary">JengaBiz</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
          Your AI-powered business advisor for small enterprises in Kenya
        </p>
      </div>

      {/* Mission, Vision & Motivation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="glass-card shadow-glass border-glass p-6 rounded-2xl transition-all duration-300 hover:shadow-glass-hover hover:scale-105 animate-scale-in" style={{ animationDelay: '400ms' }}>
          <div className="h-12 w-12 rounded-full glass-card flex items-center justify-center mb-4 animate-float">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Our Mission</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To empower small business owners with accessible, AI-driven insights that drive growth and sustainability.
          </p>
        </div>

        <div className="glass-card shadow-glass border-glass p-6 rounded-2xl transition-all duration-300 hover:shadow-glass-hover hover:scale-105 animate-scale-in" style={{ animationDelay: '500ms' }}>
          <div className="h-12 w-12 rounded-full glass-card flex items-center justify-center mb-4 animate-float" style={{ animationDelay: '100ms' }}>
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Our Vision</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A thriving ecosystem where every entrepreneur has the tools and knowledge to succeed in the digital economy.
          </p>
        </div>

        <div className="glass-card shadow-glass border-glass p-6 rounded-2xl transition-all duration-300 hover:shadow-glass-hover hover:scale-105 animate-scale-in" style={{ animationDelay: '600ms' }}>
          <div className="h-12 w-12 rounded-full glass-card flex items-center justify-center mb-4 animate-float" style={{ animationDelay: '200ms' }}>
            <span className="text-2xl">💡</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Why We Exist</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Because every small business deserves expert guidance, regardless of budget or location. We're here to level the playing field.
          </p>
        </div>
      </div>

      {/* About Section with Enhanced Messaging */}
      <div className="glass-card shadow-glass border-glass p-8 rounded-2xl space-y-6 animate-slide-up" style={{ animationDelay: '700ms' }}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full glass-card flex items-center justify-center">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">About JengaBiz</h2>
        </div>
        
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">JengaBiz</strong> is your trusted companion in building a successful business. 
            We understand the challenges you face—from managing cash flow to pricing your products competitively.
          </p>
          <p>
            Our AI assistant provides personalized advice in both <strong className="text-foreground">English</strong> and{' '}
            <strong className="text-foreground">Swahili</strong>, making business expertise accessible to everyone. 
            Whether you're just starting out or looking to scale, we're here to help you make informed decisions.
          </p>
          <p className="text-primary font-medium">
            💪 Your success is our mission. Let's build something great together!
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '800ms' }}>
        <div className="glass-card shadow-glass border-glass p-6 rounded-2xl transition-all duration-300 hover:shadow-glass-hover hover:scale-105 group">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full glass-card flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">AI Business Advisor</h3>
              <p className="text-sm text-muted-foreground">
                Get instant answers to your business questions in English or Swahili. From budgeting to marketing strategies.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card shadow-glass border-glass p-6 rounded-2xl transition-all duration-300 hover:shadow-glass-hover hover:scale-105 group">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full glass-card flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Market Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Stay ahead with real-time market trends, sector performance insights, and growth opportunities.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card shadow-glass border-glass p-6 rounded-2xl transition-all duration-300 hover:shadow-glass-hover hover:scale-105 group">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full glass-card flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Video Learning</h3>
              <p className="text-sm text-muted-foreground">
                Learn from the best with curated TED talks on entrepreneurship, leadership, and innovation.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card shadow-glass border-glass p-6 rounded-2xl transition-all duration-300 hover:shadow-glass-hover hover:scale-105 group">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full glass-card flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <SiWhatsapp className="h-6 w-6 text-green-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Multi-Channel Support</h3>
              <p className="text-sm text-muted-foreground">
                Reach us via WhatsApp or USSD for seamless communication, even with limited internet connectivity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '900ms' }}>
        <p className="text-lg text-muted-foreground">
          Ready to grow your business? Start a conversation below! 👇
        </p>
        <div className="flex gap-2 justify-center">
          <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
});

WelcomeScreen.displayName = 'WelcomeScreen';

export default WelcomeScreen;
