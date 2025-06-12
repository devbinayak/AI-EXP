import type React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  isDisabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend, isLoading, isDisabled }) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading && !isDisabled && value.trim()) {
      onSend();
    }
  };

  return (
    <div className="flex items-center p-3 border-t bg-card gap-2">
      <Input
        type="text"
        placeholder="Type your message..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading || isDisabled}
        className="flex-grow focus-visible:ring-1 focus-visible:ring-primary text-sm"
        aria-label="Chat message input"
      />
      <Button
        onClick={onSend}
        disabled={isLoading || isDisabled || !value.trim()}
        size="icon"
        className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
        aria-label="Send message"
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default ChatInput;
