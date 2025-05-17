
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-blue-600">SuperDoc</span>
          <span className="ml-2 text-sm bg-gray-200 px-2 py-1 rounded-md text-gray-700">for IronFleet</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/chat" className="text-gray-700 hover:text-blue-600 font-medium">
            Chat
          </Link>
          <Link to="/ingest" className="text-gray-700 hover:text-blue-600 font-medium">
            Ingest
          </Link>
          <Link to="/agents" className="text-gray-700 hover:text-blue-600 font-medium">
            AI Agents
          </Link>
          <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium">
            Administration
          </Link>
        </nav>
      </div>
    </header>
  );
}