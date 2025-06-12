import type React from 'react';

export type Sender = 'user' | 'stranger' | 'ai' | 'system';

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  avatar?: React.ReactNode;
  originalText?: string;
  moderationAnnouncement?: string;
}

export type ChatMode =
  | 'idle'
  | 'searching'
  | 'chatting'
  | 'disconnected';

export type ChatPartner = 'stranger' | 'ai' | null;
