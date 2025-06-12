
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Message, ChatMode, ChatPartner, Sender } from '@/lib/types';
import { aiChatParticipant } from '@/ai/flows/ai-chat-participant';
import { aiChatModerator } from '@/ai/flows/ai-chat-moderator';

import TeengerLogo from '@/components/icons/TeengerLogo';
import ChatArea from '@/components/chat/ChatArea';
import ChatInput from '@/components/chat/ChatInput';
import ChatControls from '@/components/chat/ChatControls';
import { User, Bot, Smile, Info, Users, Download, Globe } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const BOT_TYPING_DELAY = 1000;
const STRANGER_CONNECT_DELAY = 2000;
const STRANGER_MESSAGE_DELAY = 1500;
const STRANGER_DISCONNECT_DELAY = 20000; // 20 seconds for demo

export default function TeengerPage() {
  const [chatMode, setChatMode] = useState<ChatMode>('idle');
  const [chatPartner, setChatPartner] = useState<ChatPartner>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For initial connection or AI response
  
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const strangerDisconnectTimer = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = useCallback((text: string, sender: Sender, originalText?: string, moderationAnnouncement?: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: crypto.randomUUID(),
        text,
        sender,
        timestamp: new Date(),
        originalText,
        moderationAnnouncement,
      },
    ]);
  }, []);

  const resetChat = useCallback(() => {
    setMessages([]);
    setInputValue('');
    if (strangerDisconnectTimer.current) {
      clearTimeout(strangerDisconnectTimer.current);
      strangerDisconnectTimer.current = null;
    }
  }, []);

  const handleStartStrangerChat = useCallback(async () => {
    resetChat();
    setChatMode('searching');
    setChatPartner('stranger');
    setIsLoading(true);
    addMessage('Looking for a cool teen...', 'system');

    await new Promise(resolve => setTimeout(resolve, STRANGER_CONNECT_DELAY));

    setIsLoading(false);
    setChatMode('chatting');
    addMessage("Connected with a new friend! Say Hi!", 'system');
    
    // Simulate stranger's first message
    setTimeout(() => {
        const greetings = ["Hey!", "Hi there!", "What's up?", "Yo!"];
        addMessage(greetings[Math.floor(Math.random() * greetings.length)], 'stranger');
    }, STRANGER_MESSAGE_DELAY);

    // Simulate stranger disconnecting after a while
    strangerDisconnectTimer.current = setTimeout(() => {
      if (chatMode === 'chatting' && chatPartner === 'stranger') {
        addMessage('Oh no! Your friend left the chat.', 'system');
        setChatMode('disconnected');
        setChatPartner(null);
      }
    }, STRANGER_DISCONNECT_DELAY);

  }, [addMessage, resetChat, chatMode, chatPartner]);

  const handleStartAiChat = useCallback(async () => {
    resetChat();
    setChatMode('searching');
    setChatPartner('ai');
    setIsLoading(true);
    addMessage('Waking up the Teenger AI...', 'system');

    await new Promise(resolve => setTimeout(resolve, BOT_TYPING_DELAY / 2));
    
    setIsLoading(false);
    setChatMode('chatting');
    addMessage("You're now chatting with Teenger AI! Ask anything.", 'system');
  }, [addMessage, resetChat]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || chatMode !== 'chatting' || !chatPartner) return;

    const userInput = inputValue;
    setInputValue('');
    setIsLoading(true); // For AI response or simulated stranger response

    // Moderation
    let moderatedText = userInput;
    let originalTextForDisplay: string | undefined = undefined;
    let moderationAnnouncementForDisplay: string | undefined = undefined;

    try {
      const moderationResult = await aiChatModerator({ userMessage: userInput });
      if (moderationResult.moderationAnnouncement) {
        moderatedText = moderationResult.moderatedMessage;
        originalTextForDisplay = userInput;
        moderationAnnouncementForDisplay = moderationResult.moderationAnnouncement;
      }
    } catch (error) {
      console.error("Moderation failed:", error);
      toast({
        title: "Moderation Error",
        description: "Could not moderate message. Please try again.",
        variant: "destructive",
      });
    }
    
    addMessage(moderatedText, 'user', originalTextForDisplay, moderationAnnouncementForDisplay);

    if (chatPartner === 'ai') {
      try {
        const chatHistory = messages
          .filter(msg => msg.sender === 'user' || msg.sender === 'ai')
          .map(msg => `${msg.sender === 'user' ? 'User' : 'AI'}: ${msg.text}`)
          .join('\n');
        
        const aiResponse = await aiChatParticipant({ chatHistory, userInput: moderatedText });
        setTimeout(() => { // Simulate AI typing
          addMessage(aiResponse.aiResponse, 'ai');
          setIsLoading(false);
        }, BOT_TYPING_DELAY);
      } catch (error) {
        console.error("AI Chat failed:", error);
        addMessage("Sorry, I'm having trouble thinking right now. Let's try that again.", 'ai');
        setIsLoading(false);
         toast({
          title: "AI Error",
          description: "Could not get response from AI. Please try again.",
          variant: "destructive",
        });
      }
    } else if (chatPartner === 'stranger') {
      // Simulate stranger's reply
      setTimeout(() => {
        const replies = ["lol", "cool", "idk", "interesting...", "tell me more"];
        addMessage(replies[Math.floor(Math.random() * replies.length)], 'stranger');
        setIsLoading(false);
      }, STRANGER_MESSAGE_DELAY + Math.random() * 1000);
    }
  }, [inputValue, chatMode, chatPartner, addMessage, messages, toast]);

  const handleFindNext = useCallback(() => {
    handleStartStrangerChat();
  }, [handleStartStrangerChat]);
  
  useEffect(() => {
    return () => {
      if (strangerDisconnectTimer.current) {
        clearTimeout(strangerDisconnectTimer.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-2 sm:p-4 font-body antialiased">
      <header className="my-4 sm:my-8 transform transition-transform hover:scale-105 duration-300">
        <TeengerLogo />
      </header>

      <main className="w-full max-w-lg sm:max-w-xl md:max-w-2xl bg-card shadow-xl rounded-lg flex flex-col h-[80vh] sm:h-[75vh] md:h-[70vh] overflow-hidden border">
        <ChatArea messages={messages} isLoading={isLoading && chatMode === 'chatting'} ref={chatAreaRef} />
        
        {chatMode === 'chatting' && (
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            isLoading={isLoading && messages.length > 0 && messages[messages.length-1].sender === 'user'} 
            isDisabled={isLoading && !(messages.length > 0 && messages[messages.length-1].sender === 'user')}
          />
        )}
        
        <ChatControls
          chatMode={chatMode}
          isLoading={isLoading && chatMode === 'searching'}
          onStartStranger={handleStartStrangerChat}
          onStartAi={handleStartAiChat}
          onFindNext={handleFindNext}
        />
      </main>

      <section className="w-full max-w-lg sm:max-w-xl md:max-w-2xl mt-8 mb-4 px-2 sm:px-0">
        <h2 className="text-2xl font-semibold text-center mb-6 text-primary">Our Global Reach</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex flex-col items-center p-4 bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/50 transition-all hover:shadow-xl hover:scale-105">
            <div className="p-3 bg-primary/10 rounded-full mb-3 shadow-md">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">15,000+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Active Users</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/50 transition-all hover:shadow-xl hover:scale-105">
            <div className="p-3 bg-primary/10 rounded-full mb-3 shadow-md">
              <Download className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">50,000+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Downloads</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/50 transition-all hover:shadow-xl hover:scale-105">
            <div className="p-3 bg-primary/10 rounded-full mb-3 shadow-md">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">120+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Countries</p>
          </div>
        </div>
      </section>

      <footer className="mt-4 sm:mt-8 text-center text-xs sm:text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Teenger. Keep it cool, keep it kind.</p>
        <p className="text-xs opacity-70">For entertainment purposes only.</p>
      </footer>
    </div>
  );
}
