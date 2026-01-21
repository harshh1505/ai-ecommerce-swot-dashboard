import React from 'react';
import { TrendingUp, Activity, Sparkles, AlertTriangle, TrendingDown } from 'lucide-react';

const PredictionsView = ({ predictions, insights }) => {
  const riskColors = {
    Low: { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-400/40', text: 'text-green-300', glow: 'shadow-green-500/20' },
    Medium: { bg: 'from-yellow-500/20 to-amber-500/20', border: 'border-yellow-400/40', text: 'text-yellow-300', glow: 'shadow-yellow-500/20' },
    High: { bg: 'from-red-500/20 to-rose-500/20', border: 'border-red-400/40', text: 'text-red-300', glow: 'shadow-red-500/20' }
  };

  const riskWidth = {
    Low: 'w-1/3',
    Medium: 'w-2/3',
    High: 'w-full'
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Main Stats Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Forecast Card */}
        <div className="group relative bg-gradient-to-br from-blue-600/20 via-cyan-600/20 to-blue-700/20 rounded-2xl p-6 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 overflow-hidden">
          {/* Animated Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/10 to-blue-500/0 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-5 h-5 text-blue-300" />
                </div>
                Forecast & Growth
              </h3>
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            
            <div className="space-y-5">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <p className="text-blue-200 text-sm mb-2 font-medium">Next Month Revenue</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-black text-white tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    ${predictions.forecast.toFixed(0)}
                  </p>
                  <span className="text-blue-300 text-sm animate-pulse">projected</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-500/10 rounded-xl p-4 backdrop-blur-sm border border-blue-400/20 hover:bg-blue-500/20 transition-colors duration-300">
                  <p className="text-blue-200 text-xs mb-2 uppercase tracking-wide font-semibold">Growth Rate</p>
                  <div className="flex items-center gap-1">
                    {predictions.growthRate >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <p className={`text-2xl font-bold ${predictions.growthRate >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                      {predictions.growthRate >= 0 ? '+' : ''}{predictions.growthRate.toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-500/10 rounded-xl p-4 backdrop-blur-sm border border-blue-400/20 hover:bg-blue-500/20 transition-colors duration-300">
                  <p className="text-blue-200 text-xs mb-2 uppercase tracking-wide font-semibold">Volatility</p>
                  <p className="text-2xl font-bold text-white">{predictions.volatility}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Assessment Card */}
        <div className={`group relative bg-gradient-to-br ${riskColors[predictions.riskLevel].bg} rounded-2xl p-6 border ${riskColors[predictions.riskLevel].border} hover:border-opacity-60 transition-all duration-500 hover:shadow-2xl ${riskColors[predictions.riskLevel].glow} hover:-translate-y-1 overflow-hidden`}>
          {/* Animated Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/10 to-purple-500/0 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <div className="p-2 bg-purple-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-5 h-5 text-purple-300" />
                </div>
                Risk Assessment
              </h3>
              {predictions.riskLevel === 'High' && (
                <AlertTriangle className="w-5 h-5 text-red-400 animate-bounce" />
              )}
            </div>
            
            <div className="space-y-5">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <p className="text-purple-200 text-sm mb-2 font-medium">Risk Level</p>
                <div className="flex items-center gap-3">
                  <p className={`text-3xl font-black ${riskColors[predictions.riskLevel].text}`}>
                    {predictions.riskLevel}
                  </p>
                  <div className="flex-1">
                    <div className="w-full bg-purple-900/50 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                      <div 
                        className={`h-3 rounded-full ${
                          predictions.riskLevel === 'Low' ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 
                          predictions.riskLevel === 'Medium' ? 'bg-gradient-to-r from-yellow-500 to-amber-400' : 
                          'bg-gradient-to-r from-red-500 to-rose-400'
                        } ${riskWidth[predictions.riskLevel]} transition-all duration-1000 ease-out animate-in slide-in-from-left`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-500/10 rounded-xl p-4 backdrop-blur-sm border border-purple-400/20 hover:bg-purple-500/20 transition-colors duration-300">
                <p className="text-purple-200 text-xs mb-2 uppercase tracking-wide font-semibold">Seasonal Pattern</p>
                <p className="text-xl font-bold text-white">{predictions.seasonalPattern}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Card */}
      <div className="group relative bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-indigo-400/30 hover:border-indigo-300/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 overflow-hidden">
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-indigo-300" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Predictive Insights</h3>
            <div className="flex-1"></div>
            <span className="text-xs text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
              AI Generated
            </span>
          </div>
          <p className="text-purple-100 leading-relaxed text-base">{insights}</p>
        </div>
      </div>
    </div>
  );
};

export default PredictionsView;