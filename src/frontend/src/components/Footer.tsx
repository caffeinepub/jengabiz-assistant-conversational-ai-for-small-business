import { memo, useCallback, useState } from 'react';
import { Heart, MessageCircle, Smartphone, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCheckUSSDAvailability, useSendUSSDRequest } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

const Footer = memo(() => {
  const whatsappNumber = '254700000000'; // Replace with actual WhatsApp Business number
  const whatsappMessage = encodeURIComponent('Hi JengaBiz! I need help with my business.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const ussdCode = '*711*23#'; // Example USSD code
  
  const { identity } = useInternetIdentity();
  const { data: ussdStatus, isLoading: checkingStatus } = useCheckUSSDAvailability();
  const { mutate: sendUSSD, isPending: sendingUSSD, isError, error } = useSendUSSDRequest();
  const [lastResponse, setLastResponse] = useState<string | null>(null);

  const isAuthenticated = !!identity;

  const handleWhatsAppClick = useCallback(() => {
    window.open(whatsappUrl, '_blank');
  }, [whatsappUrl]);

  const handleUSSDClick = useCallback(() => {
    if (!isAuthenticated) {
      setLastResponse('Please log in to use USSD services');
      return;
    }

    if (!ussdStatus?.available) {
      setLastResponse('USSD service is temporarily unavailable. Please try again later.');
      return;
    }

    sendUSSD(
      { code: ussdCode, service: 'jengabiz' },
      {
        onSuccess: (response) => {
          setLastResponse(response.message);
          // Auto-clear success message after 5 seconds
          setTimeout(() => setLastResponse(null), 5000);
        },
        onError: (err) => {
          setLastResponse(err.message);
          // Auto-clear error message after 5 seconds
          setTimeout(() => setLastResponse(null), 5000);
        },
      }
    );
  }, [isAuthenticated, ussdStatus, sendUSSD, ussdCode]);

  const getStatusIcon = useCallback(() => {
    if (checkingStatus) {
      return <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />;
    }
    if (ussdStatus?.available) {
      return <CheckCircle2 className="h-3 w-3 text-green-500" />;
    }
    return <AlertCircle className="h-3 w-3 text-amber-500" />;
  }, [checkingStatus, ussdStatus]);

  const getStatusText = useCallback(() => {
    if (checkingStatus) return 'Checking...';
    if (!isAuthenticated) return 'Login required';
    return ussdStatus?.available ? 'Available' : 'Unavailable';
  }, [checkingStatus, isAuthenticated, ussdStatus]);

  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'jengabiz-app');

  return (
    <footer className="glass-footer shadow-glass-top">
      <div className="container mx-auto px-4 py-6 space-y-4">
        {/* Multi-channel Communication Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="font-medium">Connect with us:</span>
          </div>
          
          {/* WhatsApp Button */}
          <Button
            onClick={handleWhatsAppClick}
            variant="outline"
            size="sm"
            className="glass-button hover:shadow-glow transition-all duration-300 group"
          >
            <SiWhatsapp className="h-4 w-4 mr-2 text-green-500 group-hover:scale-110 transition-transform" />
            Chat via WhatsApp
          </Button>

          {/* USSD Information with Status */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleUSSDClick}
                  disabled={sendingUSSD || checkingStatus}
                  className="flex items-center gap-2 glass-card px-3 py-2 rounded-lg border-glass hover:shadow-glow transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Smartphone className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground/70">USSD Code:</span>
                      {getStatusIcon()}
                    </div>
                    <span className="text-sm font-mono font-semibold text-foreground">{ussdCode}</span>
                  </div>
                  {sendingUSSD && (
                    <Loader2 className="h-3 w-3 animate-spin text-primary ml-1" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p className="font-medium">USSD Service Status</p>
                  <p className="text-xs text-muted-foreground">{getStatusText()}</p>
                  {!isAuthenticated && (
                    <p className="text-xs text-amber-500">Please log in to use this service</p>
                  )}
                  {isAuthenticated && ussdStatus?.available && (
                    <p className="text-xs text-green-500">Click to send USSD request</p>
                  )}
                  {isAuthenticated && !ussdStatus?.available && (
                    <p className="text-xs text-amber-500">Service temporarily unavailable</p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Status Message Alert */}
        {lastResponse && (
          <Alert className={`glass-card border-glass animate-fade-in ${isError ? 'border-amber-500/50' : 'border-green-500/50'}`}>
            <div className="flex items-start gap-2">
              {isError ? (
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
              )}
              <AlertDescription className="text-sm">
                {lastResponse}
              </AlertDescription>
            </div>
          </Alert>
        )}

        <Separator className="my-4" />

        {/* Attribution */}
        <p className="text-center text-sm text-muted-foreground/80 animate-fade-in">
          © {currentYear}. Built with{' '}
          <span className="inline-block animate-pulse-slow">
            <Heart className="inline h-4 w-4 text-red-500 fill-red-500" />
          </span>{' '}
          using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:text-primary/80 transition-all duration-300 hover:scale-105 inline-block"
          >
            caffeine.ai
          </a>
        </p>

        {/* Additional Info */}
        <p className="text-center text-xs text-muted-foreground/60">
          Available in English and Swahili | Secure communication guaranteed
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
