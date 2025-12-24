
export type TabType = 'chats' | 'status' | 'groups' | 'calls' | 'ai';

export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'voice' | 'emoji';
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'typing';
  lastSeen?: string;
}

export interface ChatSession {
  id: string;
  user: User;
  lastMessage: string;
  unreadCount: number;
  lastTimestamp: string;
}

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  imageUrl?: string;
  text?: string;
  timestamp: string;
  viewed: boolean;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  members: string[];
  lastMessage: string;
}

export interface CallLog {
  id: string;
  user: User;
  type: 'audio' | 'video';
  direction: 'incoming' | 'outgoing' | 'missed';
  timestamp: string;
}
