
import React from 'react';
import { Phone, Video, PhoneIncoming, PhoneOutgoing, PhoneMissed } from 'lucide-react';
import { CallLog } from '../types';

const MOCK_CALLS: CallLog[] = [
  { id: 'c1', user: { id: 'u1', name: 'Alice Smith', avatar: 'https://picsum.photos/id/64/200', status: 'online' }, type: 'audio', direction: 'incoming', timestamp: '10:15 AM' },
  { id: 'c2', user: { id: 'u3', name: 'Sarah Wilson', avatar: 'https://picsum.photos/id/103/200', status: 'online' }, type: 'video', direction: 'missed', timestamp: '9:05 AM' },
  { id: 'c3', user: { id: 'u2', name: 'Bob Johnson', avatar: 'https://picsum.photos/id/91/200', status: 'offline' }, type: 'audio', direction: 'outgoing', timestamp: 'Yesterday' },
  { id: 'c4', user: { id: 'u5', name: 'Emma Davis', avatar: 'https://picsum.photos/id/129/200', status: 'online' }, type: 'video', direction: 'incoming', timestamp: 'Yesterday' },
  { id: 'c5', user: { id: 'u1', name: 'Alice Smith', avatar: 'https://picsum.photos/id/64/200', status: 'online' }, type: 'audio', direction: 'outgoing', timestamp: 'Monday' },
];

const CallsView: React.FC = () => {
  return (
    <div className="px-6 pb-20 space-y-2">
      <div className="flex items-center space-x-4 mb-6">
        <button className="flex-1 bg-sky-100 dark:bg-slate-700 py-3 rounded-2xl flex items-center justify-center space-x-2 text-sky-600 dark:text-sky-400 font-bold hover:bg-sky-200 transition-colors">
          <Phone size={18} />
          <span>New Audio</span>
        </button>
        <button className="flex-1 bg-sky-500 py-3 rounded-2xl flex items-center justify-center space-x-2 text-white font-bold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-200">
          <Video size={18} />
          <span>New Video</span>
        </button>
      </div>

      <h4 className="text-sm font-bold text-slate-400 mt-4 mb-4 px-1 uppercase tracking-wider">Recent Calls</h4>
      
      {MOCK_CALLS.map((call) => (
        <div key={call.id} className="flex items-center p-3 rounded-2xl hover:bg-sky-50 dark:hover:bg-slate-700 transition-colors group">
          <img src={call.user.avatar} alt="" className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
          <div className="ml-4 flex-1">
            <h3 className="font-bold text-lg">{call.user.name}</h3>
            <div className="flex items-center space-x-1 mt-0.5">
              {call.direction === 'incoming' && <PhoneIncoming size={12} className="text-green-500" />}
              {call.direction === 'outgoing' && <PhoneOutgoing size={12} className="text-sky-500" />}
              {call.direction === 'missed' && <PhoneMissed size={12} className="text-red-500" />}
              <span className={`text-xs ${call.direction === 'missed' ? 'text-red-500 font-semibold' : 'text-slate-400'}`}>
                {call.timestamp}
              </span>
            </div>
          </div>
          <button className="p-3 text-sky-500 hover:bg-white dark:hover:bg-slate-600 rounded-xl transition-colors">
            {call.type === 'audio' ? <Phone size={20} /> : <Video size={20} />}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CallsView;
