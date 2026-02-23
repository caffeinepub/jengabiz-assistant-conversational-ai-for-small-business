import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSaveCallerUserProfile } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface ProfileSetupModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileSetupModal({ open, onClose }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const { mutate: saveProfile, isPending } = useSaveCallerUserProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    saveProfile(
      { name: name.trim() },
      {
        onSuccess: () => {
          toast.success('Profile created successfully!');
          onClose();
        },
        onError: (error) => {
          toast.error('Failed to create profile');
          console.error('Profile creation error:', error);
        },
      }
    );
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="glass-card-strong shadow-glass animate-scale-in max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full glass-card flex items-center justify-center animate-float">
            <span className="text-3xl">👋</span>
          </div>
          <DialogTitle className="text-2xl text-center">Welcome!</DialogTitle>
          <DialogDescription className="text-center text-base">
            Let's get you set up. What should we call you?
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="glass-card border-glass"
              disabled={isPending}
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={isPending || !name.trim()}
            className="w-full glass-button shadow-glow transition-all duration-300 hover:scale-105 h-12 text-base"
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Creating Profile...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
