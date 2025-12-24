
import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  CircleDot, 
  Users, 
  Phone, 
  Sparkles, 
  Settings, 
  Search, 
  MoreVertical,
  Camera,
  Moon,
  Sun,
  Languages
} from 'lucide-react';
import { TabType } from './types';
import ChatsView from './views/ChatsView';
import StatusView from './views/StatusView';
import GroupsView from './views/GroupsView';
import CallsView from './views/CallsView';
import AIView from './views/AIView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('chats');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPersian, setIsPersian] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Apply dark mode and RTL
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleLanguage = () => setIsPersian(!isPersian);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'chats': return <ChatsView searchQuery={searchQuery} />;
      case 'status': return <StatusView />;
      case 'groups': return <GroupsView searchQuery={searchQuery} />;
      case 'calls': return <CallsView />;
      case 'ai': return <AIView />;
      default: return <ChatsView searchQuery={searchQuery} />;
    }
  };

  const getTitle = () => {
    if (isPersian) {
      switch (activeTab) {
        case 'chats': return 'گفتگوها';
        case 'status': return 'وضعیت';
        case 'groups': return 'گروه‌ها';
        case 'calls': return 'تماس‌ها';
        case 'ai': return 'دستیار هوشمند';
      }
    }
    return activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-sky-50'}`}>
      {/* Phone Frame Emulator */}
      <div className={`relative w-full h-full max-w-md bg-white overflow-hidden flex flex-col shadow-2xl transition-all duration-300 ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} ${isPersian ? 'rtl' : ''} h-[92vh] sm:rounded-[3rem] border-8 ${isDarkMode ? 'border-slate-700' : 'border-white'}`}>
        
        {/* Top Header */}
        <header className="px-6 py-5 flex items-center justify-between z-10">
          <h1 className="text-2xl font-bold text-sky-500 tracking-tight">SkyChat</h1>
          <div className="flex items-center space-x-3 gap-3">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 hover:bg-sky-100 dark:hover:bg-slate-700 rounded-full transition-colors">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={toggleLanguage} className="p-2 hover:bg-sky-100 dark:hover:bg-slate-700 rounded-full transition-colors">
              <Languages size={20} />
            </button>
            <button className="p-2 hover:bg-sky-100 dark:hover:bg-slate-700 rounded-full transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </header>

        {/* Dynamic Title and Search (Visible in certain tabs) */}
        {activeTab !== 'ai' && (
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold">{getTitle()}</h2>
              {activeTab === 'chats' && (
                <button className="bg-sky-500 text-white p-2 rounded-xl shadow-lg shadow-sky-200">
                  <Camera size={20} />
                </button>
              )}
            </div>
            <div className={`flex items-center px-4 py-2 ${isDarkMode ? 'bg-slate-700' : 'bg-sky-50'} rounded-2xl`}>
              <Search size={18} className="text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder={isPersian ? "جستجو..." : "Search..."} 
                className="bg-transparent border-none focus:outline-none w-full text-sm py-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          {renderActiveTab()}
        </main>

        {/* Bottom Navigation */}
        <nav className={`flex items-center justify-between px-6 py-4 border-t ${isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-sky-100 bg-white'}`}>
          <NavButton 
            active={activeTab === 'chats'} 
            onClick={() => setActiveTab('chats')} 
            icon={<MessageCircle size={24} />} 
            label={isPersian ? "گفتگو" : "Chats"} 
          />
          <NavButton 
            active={activeTab === 'status'} 
            onClick={() => setActiveTab('status')} 
            icon={<CircleDot size={24} />} 
            label={isPersian ? "وضعیت" : "Status"} 
          />
          <NavButton 
            active={activeTab === 'groups'} 
            onClick={() => setActiveTab('groups')} 
            icon={<Users size={24} />} 
            label={isPersian ? "گروه‌ها" : "Groups"} 
          />
          <NavButton 
            active={activeTab === 'calls'} 
            onClick={() => setActiveTab('calls')} 
            icon={<Phone size={24} />} 
            label={isPersian ? "تماس" : "Calls"} 
          />
          <NavButton 
            active={activeTab === 'ai'} 
            onClick={() => setActiveTab('ai')} 
            icon={<Sparkles size={24} className={activeTab === 'ai' ? 'animate-pulse' : ''} />} 
            label={isPersian ? "هوش مصنوعی" : "AI"} 
            isSpecial
          />
        </nav>
      </div>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  isSpecial?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label, isSpecial }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center transition-all duration-300 ${active ? 'text-sky-500 scale-110' : 'text-slate-400 hover:text-sky-300'}`}
    >
      <div className={`p-2 rounded-2xl ${active && isSpecial ? 'bg-sky-500 text-white shadow-lg shadow-sky-200' : ''}`}>
        {icon}
      </div>
      <span className={`text-[10px] mt-1 font-semibold ${active ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
    </button>
  );
};

export default App;
