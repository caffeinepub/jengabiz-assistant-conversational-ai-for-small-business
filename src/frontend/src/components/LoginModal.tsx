import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { Loader2 } from 'lucide-react';

interface LoginModalProps {
  open: boolean;
}

export default function LoginModal({ open }: LoginModalProps) {
  const { login, loginStatus } = useInternetIdentity();

  const isLoggingIn = loginStatus === 'logging-in';

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="glass-card-strong shadow-glass animate-scale-in max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-4">
          <div className="mx-auto h-20 w-20 rounded-full glass-card flex items-center justify-center animate-float">
            <img
              src="/assets/generated/jengabiz-logo-transparent.dim_200x200.png"
              alt="JengaBiz"
              className="h-16 w-16"
            />
          </div>
          <DialogTitle className="text-2xl text-center">Welcome to JengaBiz</DialogTitle>
          <DialogDescription className="text-center text-base">
            Your AI-powered business assistant for financial planning and growth strategies.
            Sign in to get started.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full glass-button shadow-glow transition-all duration-300 hover:scale-105 h-12 text-base"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <img
                  src="/assets/generated/ii-login-icon-transparent.dim_64x64.png"
                  alt="Internet Identity"
                  className="h-5 w-5 mr-2"
                />
                Sign in with Internet Identity
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground/70">
            Secure authentication powered by Internet Computer
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
