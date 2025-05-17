
import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              SuperDoc AI Assistant
            </h1>
            <p className="text-xl mb-8">
              Transform your document interactions with advanced AI-powered conversations and insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/chat" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-colors">
                Start Using SuperDoc
              </Link>
              <a href="#features" className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Contextual Conversations</h3>
              <p className="text-gray-600">
                Our AI maintains context throughout your conversation for more relevant and helpful responses.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Voice Assistant</h3>
              <p className="text-gray-600">
                Interact with SuperDoc using your voice with ElevenLabs integration for a natural conversation experience.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Document Retrieval</h3>
              <p className="text-gray-600">
                Powerful document analysis and retrieval technology that helps you find and understand information quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right">
                    <h3 className="text-xl font-semibold mb-2">Ask a Question</h3>
                    <p className="text-gray-600">
                      Type or speak your question in natural language to start the conversation.
                    </p>
                  </div>
                  <div className="md:w-0 md:flex-grow flex justify-center my-4 md:my-0">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:hidden"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:hidden"></div>
                  <div className="md:w-0 md:flex-grow flex justify-center my-4 md:my-0">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">2</div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <h3 className="text-xl font-semibold mb-2">AI Retrieves Information</h3>
                    <p className="text-gray-600">
                      SuperDoc searches through your documents and knowledge base for relevant information.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right">
                    <h3 className="text-xl font-semibold mb-2">Generates Response</h3>
                    <p className="text-gray-600">
                      Using retrieved information, the AI generates a comprehensive answer to your question.
                    </p>
                  </div>
                  <div className="md:w-0 md:flex-grow flex justify-center my-4 md:my-0">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">3</div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:hidden"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Try SuperDoc AI assistant with voice capabilities today and transform how you access your documents and knowledge.
          </p>
          <Link to="/chat" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors inline-block">
            Start Using Now
          </Link>
        </div>
      </section>
    </div>
  );
}