import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message, MessageRole } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 
          ${isUser ? 'bg-white/10 text-white' : 'bg-gradient-to-br from-primary to-violet-700 text-white shadow-lg shadow-violet-500/20'}`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        {/* Bubble Content */}
        <div className={`rounded-2xl p-4 text-sm leading-relaxed overflow-hidden
          ${isUser 
            ? 'bg-surface border border-white/5 text-text' 
            : 'bg-transparent text-gray-200'}`}>
          
          {isUser ? (
            <div className="whitespace-pre-wrap">{message.text}</div>
          ) : (
            <div className="markdown-content">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h3: ({node, ...props}) => <h3 className="text-primary font-bold text-base mt-4 mb-2 uppercase tracking-wide" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-300" {...props} />,
                  li: ({node, ...props}) => <li className="pl-1" {...props} />,
                  p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                  strong: ({node, ...props}) => <strong className="text-white font-semibold" {...props} />,
                  table: ({node, ...props}) => <div className="overflow-x-auto my-4 rounded-lg border border-white/10"><table className="w-full text-left border-collapse" {...props} /></div>,
                  thead: ({node, ...props}) => <thead className="bg-white/5 text-gray-200" {...props} />,
                  th: ({node, ...props}) => <th className="p-3 font-semibold border-b border-white/10 text-xs uppercase tracking-wider" {...props} />,
                  td: ({node, ...props}) => <td className="p-3 border-b border-white/5 text-sm" {...props} />,
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
