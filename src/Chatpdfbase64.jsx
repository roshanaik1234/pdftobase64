import React, { useState, useRef } from "react";
import "./Chatpdfbase64.css";

const PdfToBase64 = () => {
  const [base64, setBase64] = useState("");
  const [fileName, setFileName] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const pdfToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      try {
        setFileName(file.name);
        const base64String = await pdfToBase64(file);
        setBase64(base64String);
        setCopied(false);
      } catch (error) {
        console.error("Error converting PDF to Base64", error);
      }
    } else {
      console.error("Please select a valid PDF file.");
      setFileName("");
      setBase64("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleViewPDF = () => {
    if (base64) {
      const newTab = window.open();
      newTab.document.write(`<iframe src="${base64}" width="100%" height="100%"></iframe>`);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="pdf-container">
      <h2>PDF to Base64 Converter</h2>
      
      <input 
        type="file" 
        ref={fileInputRef}
        accept="application/pdf" 
        onChange={handleFileChange} 
      />
      
      <button 
        className="file-upload-btn" 
        onClick={triggerFileInput}
      >
        Choose PDF File
      </button>
      
      {fileName && (
        <div className="file-name">
          Selected: {fileName}
        </div>
      )}
      
      {base64 && (
        <div className="base64-output">
          <p>Base64 Output:</p>
          <textarea value={base64} readOnly rows={5} />
          
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>

          <button className="view-btn" onClick={handleViewPDF}>
            View PDF
          </button>

          {copied && (
            <div className="success-msg">
              Base64 string copied to clipboard!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PdfToBase64;
