
import React from 'react';
import { Users, ShieldCheck } from 'lucide-react';
import { Group } from '../types';

interface GroupsViewProps {
  searchQuery: string;
}

const MOCK_GROUPS: Group[] = [
  { id: 'g1', name: 'Frontend Wizards', description: 'React and CSS masters only', avatar: 'https://picsum.photos/id/1/200', members: ['u1', 'u2', 'u3'], lastMessage: 'Alex: Just merged the new design' },
  { id: 'g2', name: 'Family Weekend', description: 'Planning the trip to the lake', avatar: 'https://picsum.photos/id/22/200', members: ['u4', 'u5', 'u6'], lastMessage: 'Mom: Don\'t forget the sunscreen!' },
  { id: 'g3', name: 'Crypto Miners', description: 'To the moon! 🚀', avatar: 'https://picsum.photos/id/33/200', members: ['u7', 'u1', 'u5'], lastMessage: 'Bitcoin is up again!' },
  { id: 'g4', name: 'Gym Rats', description: 'Early morning sessions', avatar: 'https://picsum.photos/id/44/200', members: ['u2', 'u4', 'u6'], lastMessage: 'See you at 6 AM' },
];

const GroupsView: React.FC<GroupsViewProps> = ({ searchQuery }) => {
  const filteredGroups = MOCK_GROUPS.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    g.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-6 pb-20 space-y-4">
      {/* Create Group Action */}
      <button className="w-full flex items-center p-4 bg-sky-500 text-white rounded-3xl shadow-lg shadow-sky-100 hover:scale-[1.02] transition-transform">
        <div className="bg-white/20 p-2 rounded-xl">
          <Users size={24} />
        </div>
        <div className="ml-4 text-left">
          <p className="font-bold">Create New Group</p>
          <p className="text-xs text-white/80">Connect with multiple friends</p>
        </div>
      </button>

      <h4 className="text-sm font-bold text-slate-400 mt-8 mb-2 px-1 uppercase tracking-wider">All Groups</h4>
      {filteredGroups.map((group) => (
        <div key={group.id} className="flex items-center p-3 rounded-2xl hover:bg-sky-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">
          <div className="relative">
            <img src={group.avatar} alt={group.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
            <div className="absolute -top-1 -right-1 bg-sky-500 text-white p-1 rounded-lg border-2 border-white dark:border-slate-800 scale-75">
              <ShieldCheck size={14} />
            </div>
          </div>
          <div className="ml-4 flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <h3 className="font-bold text-lg truncate">{group.name}</h3>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-600 px-2 py-0.5 rounded-full text-slate-500 dark:text-slate-300">
                {group.members.length} members
              </span>
            </div>
            <p className="text-sm text-slate-400 truncate italic">
              {group.lastMessage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupsView;
