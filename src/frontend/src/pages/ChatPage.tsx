import { useState, useEffect, useRef, useCallback, useMemo, Suspense, lazy } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from '@/components/ChatMessage';
import WelcomeScreen from '@/components/WelcomeScreen';
import { generateAIResponse } from '@/lib/aiResponses';

// Lazy load AnimatedBackground to prevent blocking initial render
const AnimatedBackground = lazy(() => import('@/components/AnimatedBackground'));

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const STORAGE_KEY = 'jengabiz-chat-history';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setMessages(parsed);
        setShowChat(parsed.length > 0);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        setShowChat(true);
      } catch (error) {
        console.error('Failed to save chat history:', error);
      }
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  // Debounced send handler to prevent rapid submissions
  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    // Clear any pending debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage.content);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  }, [input, isLoading]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // Memoize the message list to prevent unnecessary re-renders
  const messageList = useMemo(() => (
    messages.map((message, index) => (
      <ChatMessage key={message.id} message={message} index={index} />
    ))
  ), [messages]);

  return (
    <div className="mx-auto w-full max-w-4xl flex-1 flex flex-col">
      {!showChat ? (
        <div className="animate-fade-in">
          <WelcomeScreen />
        </div>
      ) : (
        <div className="flex-1 flex flex-col animate-fade-in">
          <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
            <div className="space-y-6 pb-4">
              {messageList}
              {isLoading && (
                <div className="flex items-start gap-3 animate-fade-in">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass-card">
                    <div className="h-5 w-5 text-primary animate-spin-slow">
                      ✨
                    </div>
                  </div>
                  <div className="flex-1 space-y-2 pt-2">
                    <div className="flex gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Input Area */}
      <div className="pt-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="relative rounded-2xl glass-card-strong shadow-glass">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about budgeting, pricing, cash flow, or growth strategies..."
            className="min-h-[100px] resize-none border-0 bg-transparent p-4 pr-14 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="absolute bottom-3 right-3 h-10 w-10 rounded-full shadow-glow glass-button transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground/70 animate-fade-in" style={{ animationDelay: '400ms' }}>
          JengaBiz Assistant can make mistakes. Please verify important information.
        </p>
      </div>
    </div>
  );
}
