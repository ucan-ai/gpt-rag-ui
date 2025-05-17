import { useState } from 'react';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  type: string;
}

export function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Document Summarizer',
      description: 'Automatically generates concise summaries of uploaded documents',
      status: 'active',
      type: 'Summarization'
    },
    {
      id: '2',
      name: 'Query Assistant',
      description: 'Enhances search queries with semantic understanding',
      status: 'active',
      type: 'Search'
    },
    {
      id: '3',
      name: 'Data Extractor',
      description: 'Extracts structured data from unstructured text',
      status: 'inactive',
      type: 'Processing'
    }
  ]);

  const toggleAgentStatus = (id: string) => {
    setAgents(agents.map(agent => 
      agent.id === id 
        ? { ...agent, status: agent.status === 'active' ? 'inactive' : 'active' } 
        : agent
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">AI Agents</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Available Agents</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Create New Agent
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{agent.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{agent.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{agent.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => toggleAgentStatus(agent.id)}
                      className={`mr-2 px-3 py-1 rounded text-xs ${
                        agent.status === 'active' 
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {agent.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200">
                      Configure
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Agent Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-3xl font-bold text-blue-600">2</div>
            <div className="text-gray-600">Active Agents</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-3xl font-bold text-blue-600">1,243</div>
            <div className="text-gray-600">Tasks Completed</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-3xl font-bold text-blue-600">98.6%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-3xl font-bold text-blue-600">1.2s</div>
            <div className="text-gray-600">Avg. Response Time</div>
          </div>
        </div>
      </div>
    </div>
  );
} 