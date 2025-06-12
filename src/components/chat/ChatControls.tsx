import type React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Bot, RefreshCw, Loader2 } from 'lucide-react';
import type { ChatMode } from '@/lib/types';

interface ChatControlsProps {
  chatMode: ChatMode;
  isLoading: boolean; // For initial connection loading
  onStartStranger: () => void;
  onStartAi: () => void;
  onFindNext: () => void;
  // onDisconnect: () => void; // Could be added later
}

const ChatControls: React.FC<ChatControlsProps> = ({
  chatMode,
  isLoading,
  onStartStranger,
  onStartAi,
  onFindNext,
}) => {
  if (chatMode === 'searching' || (isLoading && chatMode !== 'chatting')) {
    return (
      <div className="p-4 flex flex-col items-center justify-center border-t h-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-sm text-muted-foreground">Connecting...</p>
      </div>
    );
  }

  if (chatMode === 'idle') {
    return (
      <div className="p-4 flex flex-col sm:flex-row items-center justify-center gap-3 border-t h-auto sm:h-24">
        <Button onClick={onStartStranger} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-transform hover:scale-105" size="lg">
          <MessageCircle className="mr-2 h-5 w-5" /> Chat with a Stranger
        </Button>
        <Button onClick={onStartAi} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transition-transform hover:scale-105" size="lg">
          <Bot className="mr-2 h-5 w-5" /> Chat with Teenger AI
        </Button>
      </div>
    );
  }

  if (chatMode === 'disconnected') {
    return (
      <div className="p-4 flex flex-col items-center justify-center border-t h-24">
        <Button onClick={onFindNext} className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform hover:scale-105 animate-pulse" size="lg">
          <RefreshCw className="mr-2 h-5 w-5" /> Find Next Chat
        </Button>
      </div>
    );
  }

  // No controls visible during 'chatting' mode (input handled by ChatInput)
  // or if chatMode is 'chatting' but no specific controls needed here.
  // This component will render nothing if chatMode === 'chatting'
  if (chatMode === 'chatting') {
    return <div className="h-0 p-0 border-none"></div>; // Ensure it doesn't take up space
  }

  return null;
};

export default ChatControls;
