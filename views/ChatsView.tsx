
import React from 'react';
import { ChatSession } from '../types';

interface ChatsViewProps {
  searchQuery: string;
}

const MOCK_CHATS: ChatSession[] = [
  { id: '1', user: { id: 'u1', name: 'Alice Smith', avatar: 'https://picsum.photos/id/64/200', status: 'online' }, lastMessage: 'Hey! Are we still on for lunch?', unreadCount: 2, lastTimestamp: '10:45 AM' },
  { id: '2', user: { id: 'u2', name: 'Bob Johnson', avatar: 'https://picsum.photos/id/91/200', status: 'offline' }, lastMessage: 'The report is ready for review.', unreadCount: 0, lastTimestamp: 'Yesterday' },
  { id: '3', user: { id: 'u3', name: 'Sarah Wilson', avatar: 'https://picsum.photos/id/103/200', status: 'online' }, lastMessage: 'Did you see that new AI feature?', unreadCount: 5, lastTimestamp: '9:30 AM' },
  { id: '4', user: { id: 'u4', name: 'Michael Brown', avatar: 'https://picsum.photos/id/117/200', status: 'typing' }, lastMessage: 'Typing...', unreadCount: 0, lastTimestamp: 'Just now' },
  { id: '5', user: { id: 'u5', name: 'Emma Davis', avatar: 'https://picsum.photos/id/129/200', status: 'online' }, lastMessage: 'I sent you the photos.', unreadCount: 1, lastTimestamp: '11:20 AM' },
  { id: '6', user: { id: 'u6', name: 'David Miller', avatar: 'https://picsum.photos/id/177/200', status: 'offline' }, lastMessage: 'Call me when you can.', unreadCount: 0, lastTimestamp: 'Tuesday' },
  { id: '7', user: { id: 'u7', name: 'Sophie Taylor', avatar: 'https://picsum.photos/id/182/200', status: 'online' }, lastMessage: 'The meeting was moved to 4 PM.', unreadCount: 0, lastTimestamp: 'Monday' },
];

const ChatsView: React.FC<ChatsViewProps> = ({ searchQuery }) => {
  const filteredChats = MOCK_CHATS.filter(chat => 
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-6 pb-20 space-y-2">
      {filteredChats.map((chat) => (
        <div 
          key={chat.id} 
          className="flex items-center p-3 rounded-2xl hover:bg-sky-50 dark:hover:bg-slate-700 transition-colors cursor-pointer group"
        >
          <div className="relative">
            <img 
              src={chat.user.avatar} 
              alt={chat.user.name} 
              className="w-14 h-14 rounded-2xl object-cover shadow-sm" 
            />
            {chat.user.status === 'online' && (
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
            )}
            {chat.user.status === 'typing' && (
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-sky-500 border-2 border-white dark:border-slate-800 rounded-full animate-pulse"></div>
            )}
          </div>
          
          <div className="ml-4 flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <h3 className="font-bold text-lg truncate">{chat.user.name}</h3>
              <span className="text-[11px] text-slate-400 font-medium">{chat.lastTimestamp}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className={`text-sm truncate pr-2 ${chat.unreadCount > 0 ? 'text-slate-900 dark:text-slate-100 font-semibold' : 'text-slate-400'}`}>
                {chat.lastMessage}
              </p>
              {chat.unreadCount > 0 && (
                <span className="bg-sky-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-lg min-w-[20px] text-center">
                  {chat.unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatsView;
