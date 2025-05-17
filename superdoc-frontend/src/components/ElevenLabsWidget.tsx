import React, { useEffect, useRef } from 'react';

export const ElevenLabsWidget: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create the widget element
    const elevenlabsWidget = document.createElement('elevenlabs-convai');
    elevenlabsWidget.setAttribute('agent-id', 'TNIqReT9FMZb24QHSdCj');
    
    // Create script
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    script.type = 'text/javascript';
    
    // Clear container and append elements
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(elevenlabsWidget);
      document.body.appendChild(script);
    }
    
    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="elevenlabs-widget w-full h-96 bg-gray-50 flex items-center justify-center"
    >
      <p className="text-gray-400">Loading ElevenLabs widget...</p>
    </div>
  );
};