import React from 'react';
import { Upload, Package } from 'lucide-react';
import { parseMultipleCSV } from '../services/csvParserService';

const FileUploader = ({ onFileUpload, onDownloadSample, files }) => {
  const handleFileChange = async (e) => {
    const uploadedFiles = Array.from(e.target.files);
    if (!uploadedFiles.length) return;
    
    try {
      const fileObjects = uploadedFiles.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        file: file
      }));
      
      const parsedFiles = await parseMultipleCSV(fileObjects);
      onFileUpload(parsedFiles);
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  return (
    <div className="card backdrop-blur mb-6">
      <div className="flex flex-col items-center gap-4">
        <Upload style={{ width: '48px', height: '48px', color: '#c4b5fd' }} />
        <h2 className="text-xl font-semibold text-white">Upload CSV Data</h2>
        
        <div className="flex gap-3 flex-wrap justify-center">
          <label className="btn btn-primary file-label">
            <input 
              type="file" 
              accept=".csv" 
              multiple 
              onChange={handleFileChange} 
              className="file-input" 
            />
            Choose Files
          </label>
          <button 
            onClick={onDownloadSample}
            className="btn btn-secondary"
          >
            Download Sample
          </button>
        </div>

        {files.length > 0 && (
          <div className="text-center">
            <p className="text-green-300 flex items-center justify-center gap-2 mb-2">
              <Package style={{ width: '16px', height: '16px' }} /> 
              {files.length} file(s) loaded
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {files.map(f => (
                <span 
                  key={f.id} 
                  className="bg-white-10 px-2 py-1 rounded text-xs text-purple-200"
                >
                  {f.name} ({f.data?.length || 0} rows)
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;