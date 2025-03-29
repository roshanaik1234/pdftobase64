import React, { useState } from 'react';
import "./Pdfbase64.css"
const PDFToBase64Converter = () => {
  const [base64String, setBase64String] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Check if file is a PDF
    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file');
      setBase64String('');
      setFileName('');
      setFileSize(0);
      return;
    }

    setError('');
    setFileName(file.name);
    setFileSize(file.size);
    setIsLoading(true);
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      // Get the result as a base64 string
      // The result looks like "data:application/pdf;base64,XXXX..."
      // We need to remove the prefix to get only the base64 part
      const base64WithPrefix = e.target.result;
      const base64 = base64WithPrefix.split(',')[1];
      setBase64String(base64);
      setIsLoading(false);
    };
    
    reader.onerror = () => {
      setError('Error reading the file');
      setIsLoading(false);
    };
    
    reader.readAsDataURL(file);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(base64String)
      .then(() => {
        alert('Base64 string copied to clipboard!');
      })
      .catch(err => {
        alert('Failed to copy text');
      });
  };
  
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  const truncateBase64 = (str, maxLength = 100) => {
    if (!str) return '';
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">PDF to Base64 Converter</h1>
      
      <div className="mb-6">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mb-2 text-sm text-blue-500">
                <span className="font-semibold">Click to upload a PDF</span> or drag and drop
              </p>
              <p className="text-xs text-blue-500">PDF files only</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="application/pdf" 
              onChange={handleFileChange} 
            />
          </label>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      
      {isLoading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {fileName && !isLoading && !error && (
        <div className="mb-4">
          <div className="p-4 bg-blue-50 rounded-md">
            <p><span className="font-medium">File:</span> {fileName}</p>
            <p><span className="font-medium">Size:</span> {formatFileSize(fileSize)}</p>
          </div>
        </div>
      )}
      
      {base64String && !isLoading && !error && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Base64 Result:</label>
          <div className="relative">
            <div className="w-full p-3 border border-gray-300 rounded-md h-32 bg-gray-50 overflow-auto text-xs font-mono">
              {truncateBase64(base64String, 1000)}
            </div>
            <button 
              className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            The base64 string is {base64String.length.toLocaleString()} characters long.
          </p>
        </div>
      )}
      
      <div className="text-sm text-gray-600 mt-6">
        <h2 className="font-medium mb-2">About PDF to Base64 Conversion</h2>
        <p>
          This tool converts PDF files to base64 encoded strings, which are useful for:
        </p>
        <ul className="list-disc pl-5 mt-1">
          <li>Including PDFs in JSON API requests</li>
          <li>Storing PDFs in databases that support text</li>
          <li>Embedding PDFs directly in HTML or CSS</li>
          <li>Sending PDFs via APIs that don't support file attachments</li>
        </ul>
        <p className="mt-2 text-xs">
          Note: Base64 encoding increases the file size by approximately 33%.
        </p>
      </div>
    </div>
  );
};

export default PDFToBase64Converter;