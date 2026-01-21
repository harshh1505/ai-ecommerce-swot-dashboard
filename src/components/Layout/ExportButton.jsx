import React from 'react';
import { Download } from 'lucide-react';

const ExportButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="export-button"
    >
      <Download className="export-icon" />
      <span className="export-text">Export Report</span>
    </button>
  );
};

export default ExportButton;