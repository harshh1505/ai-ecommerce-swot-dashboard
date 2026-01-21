import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorAlert = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-medium">Error</p>
        <p className="text-sm opacity-90">{error}</p>
      </div>
    </div>
  );
};

export default ErrorAlert;