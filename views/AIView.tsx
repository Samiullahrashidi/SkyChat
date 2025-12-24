
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { getAIResponse } from '../geminiService';

interface AIMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIView: React.FC = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
    { id: '1', text: "Hello! I'm your SkyChat AI Assistant. How can I help you today?", sender: 'ai', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: AIMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await getAIResponse(input);
    
    const aiMsg: AIMessage = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900/50">
      {/* AI Header */}
      <div className="px-6 py-4 bg-white dark:bg-slate-800 flex items-center shadow-sm z-10 border-b dark:border-slate-700">
        <div className="p-2 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl text-white mr-3">
          <Sparkles size={24} />
        </div>
        <div>
          <h2 className="font-bold text-xl">SkyChat AI</h2>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Always Active</span>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-sky-500 text-white ml-2' : 'bg-white dark:bg-slate-700 text-sky-500 mr-2 border dark:border-slate-600'}`}>
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-sky-500 text-white rounded-tr-none' : 'bg-white dark:bg-slate-700 dark:text-slate-100 rounded-tl-none border dark:border-slate-600'}`}>
                {msg.text}
                <div className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-white/60' : 'text-slate-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-700 p-3 rounded-2xl rounded-tl-none shadow-sm border dark:border-slate-600">
              <Loader2 size={16} className="animate-spin text-sky-500" />
              <span className="text-xs text-slate-400">AI is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-800 border-t dark:border-slate-700 z-10">
        <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-2xl px-4 py-1">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent border-none focus:outline-none py-3 text-sm resize-none max-h-32 min-h-[44px]"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-xl transition-all duration-300 ${input.trim() && !isLoading ? 'bg-sky-500 text-white shadow-lg shadow-sky-100' : 'text-slate-300'}`}
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          Powered by Gemini 3. Responses may vary in accuracy.
        </p>
      </div>
    </div>
  );
};

export default AIView;
