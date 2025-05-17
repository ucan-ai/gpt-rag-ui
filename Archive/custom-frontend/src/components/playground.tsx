import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  useChatInteract,
  useChatMessages,
  IStep,
} from "@chainlit/react-client";
import { useMemo, useState, useRef, useEffect } from "react";

function flattenMessages(
  messages: IStep[], 
  condition: (node: IStep) => boolean
): IStep[] {
  return messages.reduce((acc: IStep[], node) => {
    if (condition(node)) {
      acc.push(node);
    }
    
    if (node.steps?.length) {
      acc.push(...flattenMessages(node.steps, condition));
    }
    
    return acc;
  }, []);
}

interface PlaygroundProps {
  className?: string;
}

export function Playground({ className = '' }: PlaygroundProps) {
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useChatInteract();
  const { messages } = useChatMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const flatMessages = useMemo(() => {
    return flattenMessages(messages, (m) => m.type.includes("message"))
  }, [messages]);

  // Handle scrolling behavior with stability improvements
  useEffect(() => {
    if (!shouldAutoScroll || !chatContainerRef.current || flatMessages.length === 0) return;
    
    // Use requestAnimationFrame to ensure DOM has updated before scrolling
    requestAnimationFrame(() => {
      if (chatContainerRef.current) {
        // Only scroll if already near bottom or it's a new user message
        const container = chatContainerRef.current;
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
        const lastMessage = flatMessages[flatMessages.length - 1];
        const isUserMessage = lastMessage && lastMessage.name === "user";
        
        if (isNearBottom || isUserMessage) {
          container.scrollTop = container.scrollHeight;
        }
      }
    });
  }, [flatMessages, shouldAutoScroll]);

  // Listen for scroll events to determine if auto-scroll should be enabled
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      setShouldAutoScroll(isNearBottom);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendMessage = () => {
    const content = inputValue.trim();
    if (content) {
      const message = {
        name: "user",
        type: "user_message" as const,
        output: content,
      };
      sendMessage(message, []);
      setInputValue("");
      // Re-enable auto-scroll when user sends a message
      setShouldAutoScroll(true);
    }
  };

  const renderMessage = (message: IStep) => {
    const isUser = message.name === "user";
    const dateOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(message.createdAt).toLocaleTimeString(
      undefined,
      dateOptions
    );
    
    return (
      <div 
        key={message.id} 
        className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
      >
        <div 
          className={`max-w-3/4 rounded-lg p-3 ${
            isUser 
              ? 'bg-blue-600 text-white rounded-br-none' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white rounded-bl-none'
          }`}
        >
          <div className="flex items-center mb-1">
            <span className={`text-xs font-medium ${isUser ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>
              {isUser ? 'You' : 'SuperDoc Assistant'}
            </span>
          </div>
          <p className="text-sm whitespace-pre-wrap">{message.output}</p>
          <div className="text-right">
            <small className={`text-xs ${isUser ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>
              {date}
            </small>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col ${className}`} style={{ height: '100%' }}>
      {/* Chat container with fixed height */}
      <div className="flex-grow flex flex-col" style={{ height: '70vh' }}>
        {flatMessages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
            <div className="text-center max-w-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Welcome to SuperDoc</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Ask me anything about your documents or how I can assist you today.
              </p>
            </div>
          </div>
        ) : (
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-auto p-4"
            style={{ overscrollBehavior: 'contain' }}
          >
            <div className="space-y-1 max-w-3xl mx-auto py-4">
              {flatMessages.map((message) => renderMessage(message))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>
      
      {/* Input area with fixed position at the bottom of the chat container */}
      <div className="border-t p-4 bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-2 max-w-3xl mx-auto">
          <Input
            autoFocus
            className="flex-1 bg-gray-100 dark:bg-gray-700 border-0 focus-visible:ring-2 focus-visible:ring-blue-500"
            id="message-input"
            placeholder="Type your message here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage} 
            className="bg-blue-600 hover:bg-blue-700"
            type="submit"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
