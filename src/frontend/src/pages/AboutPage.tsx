import { Target, Heart, Rocket, Users, TrendingUp, Globe, Lightbulb, Award, Sparkles, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const missionCards = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To democratize business education and financial strategy guidance, making expert advice accessible to every entrepreneur regardless of their background or resources.',
    image: '/assets/generated/mission-background.dim_800x400.jpg',
    color: 'from-primary/20 to-accent/20',
  },
  {
    icon: Heart,
    title: 'Our Vision',
    description: 'A world where every small business owner has the tools, knowledge, and confidence to build sustainable, profitable enterprises that transform communities.',
    image: '/assets/generated/digital-transformation-hero.dim_800x400.jpg',
    color: 'from-accent/20 to-primary/20',
  },
  {
    icon: Rocket,
    title: 'Our Drive',
    description: 'Empowering entrepreneurs with AI-powered mentorship, real-time market insights, and curated learning resources to accelerate business growth and success.',
    image: '/assets/generated/about-team-collaboration.dim_800x400.jpg',
    color: 'from-primary/20 via-accent/20 to-primary/20',
  },
];

const impactAreas = [
  {
    icon: Building2,
    title: 'Financial Planning',
    description: 'Accessible tools and guidance for budgeting, cash flow management, and strategic financial decision-making.',
    stat: '1000+',
    statLabel: 'Businesses Supported',
  },
  {
    icon: TrendingUp,
    title: 'Business Growth',
    description: 'Strategic insights and actionable advice to help entrepreneurs scale their operations sustainably.',
    stat: '85%',
    statLabel: 'Growth Rate',
  },
  {
    icon: Lightbulb,
    title: 'Digital Mentorship',
    description: 'AI-powered conversations providing personalized guidance tailored to your unique business challenges.',
    stat: '24/7',
    statLabel: 'Availability',
  },
  {
    icon: Globe,
    title: 'Multi-Channel Access',
    description: 'Connect via web, WhatsApp, or USSD - business guidance wherever and however you need it.',
    stat: '3',
    statLabel: 'Platforms',
  },
];

const valuePropositions = [
  {
    icon: Users,
    title: 'Community-Driven',
    description: 'Built for entrepreneurs, by people who understand the challenges of building a business from the ground up.',
    image: '/assets/generated/community-impact.dim_400x300.jpg',
  },
  {
    icon: Award,
    title: 'Expert-Curated Content',
    description: 'Access curated TED talks and resources from world-class business leaders and innovators.',
    image: '/assets/generated/success-story-card.dim_400x300.jpg',
  },
  {
    icon: Sparkles,
    title: 'Innovation-First',
    description: 'Leveraging cutting-edge AI technology to provide intelligent, context-aware business guidance.',
    image: '/assets/generated/innovation-workspace.dim_400x300.jpg',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 animate-fade-in pb-8">
      {/* Hero Section with Viens-la style reveal */}
      <section className="space-y-6 animate-slide-up">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full animate-float">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">About JengaBiz</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_200%]">
            Empowering Entrepreneurs
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            JengaBiz is more than an AI assistant—it's your digital business partner, 
            committed to helping small business owners achieve financial clarity and sustainable growth.
          </p>
        </div>

        {/* Mission, Vision, Drive Cards with Hero Reveal Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {missionCards.map((card, index) => {
            const Icon = card.icon;
            const animationDelay = `${index * 150}ms`;
            
            return (
              <Card
                key={card.title}
                className="group glass-card-strong shadow-glass hover:shadow-glass-hover transition-all duration-500 hover:scale-105 border-glass overflow-hidden animate-scale-in"
                style={{ animationDelay }}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} animate-shimmer bg-[length:200%_200%]`} />
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full glass-button shadow-glow flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{card.title}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Impact Areas Section */}
      <section className="space-y-6 animate-slide-up" style={{ animationDelay: '450ms' }}>
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Our Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transforming small business development through accessible technology and expert guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactAreas.map((area, index) => {
            const Icon = area.icon;
            const animationDelay = `${550 + index * 100}ms`;
            
            return (
              <Card
                key={area.title}
                className="group glass-card shadow-glass hover:shadow-glass-hover transition-all duration-300 hover:scale-105 border-glass animate-scale-in"
                style={{ animationDelay }}
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-full glass-card-strong flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="glass-card">
                      {area.stat}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{area.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardDescription className="text-sm leading-relaxed">
                    {area.description}
                  </CardDescription>
                  <p className="text-xs text-muted-foreground/70 font-medium">
                    {area.statLabel}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Value Propositions Section */}
      <section className="space-y-6 animate-slide-up" style={{ animationDelay: '950ms' }}>
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Why Choose JengaBiz</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with entrepreneurs in mind, designed for real-world business challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valuePropositions.map((value, index) => {
            const Icon = value.icon;
            const animationDelay = `${1050 + index * 100}ms`;
            
            return (
              <Card
                key={value.title}
                className="group glass-card shadow-glass hover:shadow-glass-hover transition-all duration-500 hover:scale-105 border-glass overflow-hidden animate-scale-in"
                style={{ animationDelay }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="h-10 w-10 rounded-full glass-button shadow-glow flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="animate-slide-up" style={{ animationDelay: '1350ms' }}>
        <Card className="glass-card-strong shadow-glass border-glass overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 animate-shimmer bg-[length:200%_200%]" />
            <CardContent className="relative p-8 md:p-12 text-center space-y-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full glass-button shadow-glow animate-float mx-auto">
                <Rocket className="h-8 w-8 text-primary-foreground" />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Join thousands of entrepreneurs who are building sustainable, profitable businesses 
                  with JengaBiz as their trusted digital mentor.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Badge variant="secondary" className="glass-card text-base px-4 py-2">
                  <Globe className="h-4 w-4 mr-2" />
                  English & Swahili
                </Badge>
                <Badge variant="secondary" className="glass-card text-base px-4 py-2">
                  <Users className="h-4 w-4 mr-2" />
                  Community Support
                </Badge>
                <Badge variant="secondary" className="glass-card text-base px-4 py-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI-Powered
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground/80 italic pt-4">
                Start your journey today—ask a question, explore market insights, or watch curated business content.
              </p>
            </CardContent>
          </div>
        </Card>
      </section>
    </div>
  );
}
