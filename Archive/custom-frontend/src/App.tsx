
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatPage } from './pages/ChatPage';
import { LandingPage } from './pages/LandingPage';
import { IngestPage } from './pages/IngestPage';
import { AgentsPage } from './pages/AgentsPage';
import { AdminPage } from './pages/AdminPage';
import { NewChatPage } from './pages/NewChatPage';
import './App.css';
import { ElevenLabsWidget } from './components/ElevenLabsWidget';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/newchat" element={<NewChatPage />} />
            <Route path="/ingest" element={<IngestPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
        {/* Add ElevenLabs widget */}
        <ElevenLabsWidget />
      </div>
    </Router>
  );
}

export default App;
