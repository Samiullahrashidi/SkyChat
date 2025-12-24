
import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { Story } from '../types';

const MOCK_STORIES: Story[] = [
  { id: 's1', userId: 'u1', userName: 'Alice Smith', userAvatar: 'https://picsum.photos/id/64/200', imageUrl: 'https://picsum.photos/id/10/400/800', timestamp: '2h ago', viewed: false },
  { id: 's2', userId: 'u3', userName: 'Sarah Wilson', userAvatar: 'https://picsum.photos/id/103/200', text: 'Working on something exciting! 🚀', timestamp: '4h ago', viewed: false },
  { id: 's3', userId: 'u5', userName: 'Emma Davis', userAvatar: 'https://picsum.photos/id/129/200', imageUrl: 'https://picsum.photos/id/20/400/800', timestamp: '6h ago', viewed: true },
  { id: 's4', userId: 'u7', userName: 'Sophie Taylor', userAvatar: 'https://picsum.photos/id/182/200', imageUrl: 'https://picsum.photos/id/30/400/800', timestamp: 'Yesterday', viewed: true },
];

const StatusView: React.FC = () => {
  const [viewingStory, setViewingStory] = useState<Story | null>(null);

  return (
    <div className="px-6 pb-20">
      {/* My Status */}
      <div className="flex items-center p-3 mb-6 bg-sky-50 dark:bg-slate-700/50 rounded-3xl cursor-pointer">
        <div className="relative">
          <img 
            src="https://picsum.photos/id/65/200" 
            alt="My Avatar" 
            className="w-14 h-14 rounded-2xl object-cover grayscale opacity-80" 
          />
          <div className="absolute -bottom-1 -right-1 bg-sky-500 text-white p-1 rounded-lg border-2 border-white dark:border-slate-800 shadow-sm">
            <Plus size={14} />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="font-bold">My Status</h3>
          <p className="text-sm text-slate-400">Tap to add status update</p>
        </div>
      </div>

      <h4 className="text-sm font-bold text-slate-400 mb-4 px-1 uppercase tracking-wider">Recent Updates</h4>
      <div className="space-y-4">
        {MOCK_STORIES.filter(s => !s.viewed).map((story) => (
          <StatusItem key={story.id} story={story} onClick={() => setViewingStory(story)} />
        ))}
      </div>

      <h4 className="text-sm font-bold text-slate-400 mt-8 mb-4 px-1 uppercase tracking-wider">Viewed Updates</h4>
      <div className="space-y-4 opacity-60">
        {MOCK_STORIES.filter(s => s.viewed).map((story) => (
          <StatusItem key={story.id} story={story} onClick={() => setViewingStory(story)} />
        ))}
      </div>

      {/* Story Viewer Modal */}
      {viewingStory && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="w-full h-full max-w-md relative flex flex-col">
            {/* Progress Bars */}
            <div className="absolute top-4 left-4 right-4 flex space-x-1 z-20">
              <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white w-full animate-[progress_5s_linear_forwards]"></div>
              </div>
            </div>

            {/* Header */}
            <div className="absolute top-8 left-6 right-6 flex items-center justify-between z-20">
              <div className="flex items-center">
                <img src={viewingStory.userAvatar} alt="" className="w-10 h-10 rounded-xl border border-white/20" />
                <div className="ml-3">
                  <p className="text-white font-bold">{viewingStory.userName}</p>
                  <p className="text-white/60 text-xs">{viewingStory.timestamp}</p>
                </div>
              </div>
              <button onClick={() => setViewingStory(null)} className="text-white bg-white/10 p-2 rounded-full backdrop-blur-md">
                <Check size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-sky-400 to-blue-600">
              {viewingStory.imageUrl ? (
                <img src={viewingStory.imageUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="p-10 text-center">
                  <h2 className="text-3xl font-bold text-white leading-tight">{viewingStory.text}</h2>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="absolute bottom-10 left-0 right-0 text-center px-10">
               <input 
                type="text" 
                placeholder="Reply..." 
                className="w-full bg-white/20 border-none focus:outline-none rounded-2xl py-3 px-6 text-white placeholder-white/60 backdrop-blur-xl"
               />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface StatusItemProps {
  story: Story;
  onClick: () => void;
}

// Fixed: StatusItem is now correctly typed as a React.FC to handle React-specific props like 'key'.
const StatusItem: React.FC<StatusItemProps> = ({ story, onClick }) => (
  <div onClick={onClick} className="flex items-center cursor-pointer hover:bg-sky-50 dark:hover:bg-slate-700 p-2 rounded-2xl transition-all">
    <div className={`p-0.5 rounded-2xl border-2 ${story.viewed ? 'border-slate-300' : 'border-sky-500'}`}>
      <img src={story.userAvatar} alt="" className="w-12 h-12 rounded-[14px] object-cover" />
    </div>
    <div className="ml-4 flex-1">
      <h3 className="font-bold">{story.userName}</h3>
      <p className="text-xs text-slate-400">{story.timestamp}</p>
    </div>
  </div>
);

export default StatusView;
