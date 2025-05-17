
import { ChatMessage } from '../types/chat';
import { formatDistanceToNow } from 'date-fns';
import { User, Bot } from 'lucide-react';

interface MessageItemProps {
  message: ChatMessage;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} chat-message`}
    >
      <div 
        className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
          isUser 
            ? 'bg-purple-600 text-white rounded-tr-none' 
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
        }`}
      >
        <div className="flex items-center space-x-2 mb-1">
          {isUser ? (
            <User className="w-4 h-4" />
          ) : (
            <Bot className="w-4 h-4" />
          )}
          <span className="font-medium text-sm">
            {isUser ? 'You' : 'Assistant'}
          </span>
          <span className="text-xs opacity-70">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};