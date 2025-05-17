import React, { useState } from 'react';

export function IngestPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage('Please select files to upload');
      return;
    }

    setUploading(true);
    setMessage('Uploading documents...');

    // Simulated upload - in a real application this would connect to your backend
    setTimeout(() => {
      setMessage(`Successfully processed ${files.length} document(s)`);
      setFiles([]);
      setUploading(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Document Ingestion</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
        <p className="mb-4 text-gray-600">
          Upload documents to be processed and added to the knowledge base. Supported formats: PDF, DOCX, TXT.
        </p>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">Select Files</label>
          <input 
            type="file" 
            multiple 
            onChange={handleFileChange}
            className="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2"
            disabled={uploading}
          />
        </div>
        
        {files.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">Selected Files ({files.length})</h3>
            <ul className="bg-gray-50 rounded-md p-2">
              {files.map((file, index) => (
                <li key={index} className="text-sm py-1">
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <button 
          onClick={handleUpload}
          disabled={uploading || files.length === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-blue-300"
        >
          {uploading ? 'Processing...' : 'Upload and Process'}
        </button>
        
        {message && (
          <div className={`mt-4 p-3 rounded-md ${message.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
            {message}
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Knowledge Base Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-3xl font-bold text-blue-600">120</div>
            <div className="text-gray-600">Documents</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-3xl font-bold text-blue-600">5,432</div>
            <div className="text-gray-600">Chunks</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-3xl font-bold text-blue-600">24.5 MB</div>
            <div className="text-gray-600">Total Size</div>
          </div>
        </div>
      </div>
    </div>
  );
} 