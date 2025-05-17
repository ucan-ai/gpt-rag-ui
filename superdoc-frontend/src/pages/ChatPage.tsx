import React, { useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";
import {
  sessionState,
  useChatSession,
  useChatMessages,
} from "@chainlit/react-client";
import { Playground } from '../components/playground';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  type: string;
}

export function ChatPage() {
  const session = useRecoilValue(sessionState);
  const { connect } = useChatSession();
  const { messages } = useChatMessages();
  const [ready, setReady] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Not connected");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showAgentsPanel, setShowAgentsPanel] = useState(false);

  // Sample agents data
  const agents: Agent[] = [
    {
      id: '1',
      name: 'Document Summarizer',
      description: 'Summarizes uploaded documents',
      status: 'active',
      type: 'Summarization'
    },
    {
      id: '2',
      name: 'Query Assistant',
      description: 'Enhances search queries',
      status: 'active',
      type: 'Search'
    },
    {
      id: '3',
      name: 'Data Extractor',
      description: 'Extracts structured data',
      status: 'inactive',
      type: 'Processing'
    }
  ];

  useEffect(() => {
    // Connect to Chainlit
    const connectToChainlit = async () => {
      try {
        setConnectionStatus("Connecting to Chainlit...");
        
        // Connect directly to Chainlit
        connect({
          userEnv: {},
          accessToken: undefined
        });
        
        setConnectionStatus("Connected to Chainlit!");
        setReady(true);
      } catch (error: any) {
        console.error("Connection error:", error);
        setConnectionStatus(`Error connecting: ${error.message || String(error)}`);
        setReady(false);
      }
    };

    if (!session?.socket?.connected) {
      connectToChainlit();
    } else {
      setConnectionStatus("Already connected");
      setReady(true);
    }
  }, [session?.socket?.connected, connect]);

  // Toggle panel visibility for mobile
  const toggleAgentsPanel = () => {
    setShowAgentsPanel(!showAgentsPanel);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Connection status bar (can be hidden in production) */}
      <div className="bg-blue-50 p-2 text-sm border-b flex justify-between items-center">
        <p className="text-blue-700">
          <span className="font-medium">Status:</span> {connectionStatus} 
          {session?.socket?.connected && (
            <span className="ml-2 inline-block w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>
        
        {/* Mobile toggle for agents panel */}
        <button 
          className="md:hidden px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded flex items-center"
          onClick={toggleAgentsPanel}
        >
          {showAgentsPanel ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close Agents
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              AI Agents
            </>
          )}
        </button>
      </div>
      
      {/* Main content with chat and agents panel */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left spacing for centering */}
        <div className="hidden lg:block w-1/6 border-r border-gray-200"></div>
        
        {/* Centered chat interface */}
        <div className={`flex-1 lg:w-4/6 ${showAgentsPanel ? 'hidden md:block' : ''}`}>
          <Playground className="h-full" />
        </div>
        
        {/* Right panel with agents - visible on md+ screens or when toggled on mobile */}
        <div className={`
          ${showAgentsPanel ? 'absolute inset-0 z-10 md:static md:z-auto' : 'hidden'} 
          md:block w-full md:w-1/4 lg:w-1/6 border-l border-gray-200 bg-white overflow-y-auto
        `} style={{ height: '70vh' }}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">AI Agents</h3>
              {/* Close button for mobile view */}
              <button 
                className="md:hidden text-gray-500 hover:text-gray-700"
                onClick={() => setShowAgentsPanel(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">Select an agent to assist you</p>
            
            <div className="space-y-3">
              {agents.map(agent => (
                <div 
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedAgent === agent.id 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium text-sm">{agent.name}</h4>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{agent.description}</p>
                </div>
              ))}
            </div>
            
            {selectedAgent && (
              <div className="mt-4">
                <button 
                  onClick={() => {
                    // In a real app, this would activate the agent for the current chat
                    alert(`Agent activated: ${agents.find(a => a.id === selectedAgent)?.name}`);
                    setShowAgentsPanel(false); // Close panel on mobile after activation
                  }}
                  className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Activate Agent
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}