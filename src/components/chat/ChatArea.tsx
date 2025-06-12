import type React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageBubble from './MessageBubble';
import type { Message } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean; // For overall loading like AI response
}

const ChatArea = React.forwardRef<HTMLDivElement, ChatAreaProps>(({ messages, isLoading }, ref) => {
  return (
    <ScrollArea className="flex-grow p-4 space-y-2 bg-background/50 relative" ref={ref}>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isLoading && messages.length > 0 && messages[messages.length-1].sender === 'user' && (
         <div className="flex justify-start my-1">
            <div className="flex items-end max-w-[80%] gap-2">
                {/* Empty avatar placeholder to align with message bubbles */}
                <div className="h-8 w-8 self-start"></div>
                <div className="rounded-lg px-3 py-2 shadow-md bg-card text-card-foreground rounded-bl-none">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            </div>
        </div>
      )}
    </ScrollArea>
  );
});

ChatArea.displayName = 'ChatArea';
export default ChatArea;
