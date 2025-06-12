import type React from 'react';
import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Bot, Smile, Info } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const getAvatarForSender = (sender: Message['sender']) => {
  switch (sender) {
    case 'user':
      return <User className="h-5 w-5" />;
    case 'ai':
      return <Bot className="h-5 w-5" />;
    case 'stranger':
      return <Smile className="h-5 w-5" />;
    case 'system':
      return <Info className="h-5 w-5" />;
    default:
      return null;
  }
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';

  const avatar = getAvatarForSender(message.sender);

  return (
    <div
      className={cn(
        'flex w-full animate-in fade-in-50 slide-in-from-bottom-2 duration-300',
        isUser ? 'justify-end' : 'justify-start',
        isSystem ? 'my-2 justify-center' : 'my-1'
      )}
    >
      <div className={cn('flex items-end max-w-[80%] gap-2', isUser ? 'flex-row-reverse' : 'flex-row')}>
        {!isSystem && (
          <Avatar className="h-8 w-8 self-start shadow-sm">
            {/* Placeholder for actual avatar images if needed later */}
            {/* <AvatarImage src="https://placehold.co/40x40.png" alt={`${message.sender} avatar`} /> */}
            <AvatarFallback className={cn(
              isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
            )}>
              {avatar}
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={cn(
            'rounded-lg px-3 py-2 shadow-md break-words',
            isUser ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card text-card-foreground rounded-bl-none',
            isSystem ? 'bg-muted text-muted-foreground text-xs italic text-center w-full max-w-full' : ''
          )}
        >
          <p className="text-sm">{message.text}</p>
          {message.moderationAnnouncement && (
            <p className="mt-1 text-xs italic opacity-80">
              System: {message.moderationAnnouncement} (Original: "{message.originalText}")
            </p>
          )}
          {!isSystem && (
            <p className={cn('mt-1 text-xs opacity-70', isUser ? 'text-right' : 'text-left')}>
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
