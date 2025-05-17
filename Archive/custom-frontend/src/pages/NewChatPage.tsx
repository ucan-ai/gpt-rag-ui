import { useEffect, useRef } from 'react';

export function NewChatPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject the Langflow chat script only once
    if (!document.getElementById('langflow-embed-script')) {
      const script = document.createElement('script');
      script.id = 'langflow-embed-script';
      script.src = 'https://cdn.jsdelivr.net/gh/logspace-ai/langflow-embedded-chat@v1.0.7/dist/build/static/js/bundle.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
    // Add the custom element after the script loads
    if (containerRef.current && !containerRef.current.querySelector('langflow-chat')) {
      const chat = document.createElement('langflow-chat');
      chat.setAttribute('window_title', 'SuperDoc AI');
      chat.setAttribute('flow_id', '46b7dd9f-8a17-46b8-9d7f-5a009fce7b47');
      chat.setAttribute('host_url', 'https://d2ki1jf2nj4s9o.cloudfront.net');
      chat.setAttribute('api_key', 'sk-tQuZRiWenQsQaHcvH6UIi8JoCdn8MQAYCpI7vEoAIu8'); // Replace with your actual API key
      containerRef.current.appendChild(chat);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 dark:bg-gray-900">
      <div ref={containerRef} className="w-full max-w-2xl" />
    </div>
  );
} 