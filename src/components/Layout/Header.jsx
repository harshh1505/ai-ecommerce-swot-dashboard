import React from 'react';
import { BarChart3, Brain } from 'lucide-react';

const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-3">
        <BarChart3 style={{ width: '40px', height: '40px', color: '#a78bfa' }} />
        <h1 className="text-3xl font-bold text-white">AI eCommerce SWOT Analyzer</h1>
      </div>
      <p className="text-purple-200">Advanced Analytics • Predictions • Competitive Intelligence</p>
    </div>
  );
};

export default Header;