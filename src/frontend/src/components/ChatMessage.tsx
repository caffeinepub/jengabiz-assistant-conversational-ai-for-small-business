import { memo } from 'react';
import type { Message } from '@/pages/ChatPage';

interface ChatMessageProps {
  message: Message;
  index: number;
}

const ChatMessage = memo(({ message, index }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div
      className="flex items-start gap-3 animate-fade-in animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Avatar */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass-card ${
          isUser ? 'bg-primary/20' : ''
        }`}
      >
        <span className="text-lg">{isUser ? '👤' : '✨'}</span>
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-2">
        <div
          className={`rounded-2xl px-4 py-3 glass-card shadow-glass border-glass animate-bubble-expand ${
            isUser ? 'bg-primary/10' : ''
          }`}
          style={{ animationDelay: `${index * 50 + 100}ms` }}
        >
          <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function - only re-render if message content or id changes
  return (
    prevProps.message.id === nextProps.message.id &&
    prevProps.message.content === nextProps.message.content &&
    prevProps.index === nextProps.index
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
