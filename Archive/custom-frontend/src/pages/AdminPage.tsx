import React, { useState } from 'react';

interface SystemSettings {
  apiKey: string;
  modelName: string;
  maxTokens: number;
  temperature: number;
  enableLogging: boolean;
  cacheResults: boolean;
}

export function AdminPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    apiKey: 'sk-••••••••••••••••••••••••••••••',
    modelName: 'gpt-4',
    maxTokens: 4096,
    temperature: 0.7,
    enableLogging: true,
    cacheResults: true
  });
  
  const [saved, setSaved] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
    setSaved(false);
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: Number(value)
    });
    setSaved(false);
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
    setSaved(false);
  };
  
  const handleSave = () => {
    // In a real application, this would save to a backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Administration</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">System Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">API Key</label>
            <input
              type="password"
              name="apiKey"
              value={settings.apiKey}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Model</label>
            <select
              name="modelName"
              value={settings.modelName}
              onChange={handleSelectChange}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="claude-3-opus">Claude 3 Opus</option>
              <option value="claude-3-sonnet">Claude 3 Sonnet</option>
              <option value="llama-3-70b">Llama 3 70B</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Max Tokens</label>
            <input
              type="number"
              name="maxTokens"
              value={settings.maxTokens}
              onChange={handleNumberChange}
              min="1"
              max="8192"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Temperature</label>
            <input
              type="range"
              name="temperature"
              value={settings.temperature}
              onChange={handleNumberChange}
              min="0"
              max="1"
              step="0.1"
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>0 - More Deterministic</span>
              <span>{settings.temperature}</span>
              <span>1 - More Creative</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="enableLogging"
              checked={settings.enableLogging}
              onChange={handleInputChange}
              id="enableLogging"
              className="mr-2"
            />
            <label htmlFor="enableLogging" className="font-medium">Enable Logging</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="cacheResults"
              checked={settings.cacheResults}
              onChange={handleInputChange}
              id="cacheResults"
              className="mr-2"
            />
            <label htmlFor="cacheResults" className="font-medium">Cache Results</label>
          </div>
        </div>
        
        <div className="mt-6">
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Settings
          </button>
          
          {saved && (
            <span className="ml-4 text-green-600">Settings saved successfully!</span>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">System Status</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 p-4 rounded-md border-l-4 border-green-500">
            <div className="font-medium text-green-800">API Status</div>
            <div className="text-green-700">Operational</div>
          </div>
          
          <div className="bg-green-100 p-4 rounded-md border-l-4 border-green-500">
            <div className="font-medium text-green-800">Database</div>
            <div className="text-green-700">Connected</div>
          </div>
          
          <div className="bg-green-100 p-4 rounded-md border-l-4 border-green-500">
            <div className="font-medium text-green-800">Storage</div>
            <div className="text-green-700">78% Free</div>
          </div>
        </div>
        
        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
          Run System Diagnostics
        </button>
      </div>
    </div>
  );
} 