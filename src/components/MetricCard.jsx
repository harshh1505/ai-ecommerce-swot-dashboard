import React from 'react';

const MetricCard = ({ icon, label, value, color, description }) => {
  const colorConfigs = {
    green: {
      bgFrom: 'from-emerald-600/20',
      bgTo: 'to-green-600/20',
      border: 'border-emerald-500/30',
      text: 'text-emerald-300',
      valueColor: 'text-emerald-300'
    },
    blue: {
      bgFrom: 'from-blue-600/20',
      bgTo: 'to-cyan-600/20',
      border: 'border-blue-500/30',
      text: 'text-blue-300',
      valueColor: 'text-blue-300'
    },
    purple: {
      bgFrom: 'from-purple-600/20',
      bgTo: 'to-violet-600/20',
      border: 'border-purple-500/30',
      text: 'text-purple-300',
      valueColor: 'text-purple-300'
    },
    orange: {
      bgFrom: 'from-orange-600/20',
      bgTo: 'to-amber-600/20',
      border: 'border-orange-500/30',
      text: 'text-orange-300',
      valueColor: 'text-orange-300'
    },
    red: {
      bgFrom: 'from-red-600/20',
      bgTo: 'to-rose-600/20',
      border: 'border-red-500/30',
      text: 'text-red-300',
      valueColor: 'text-red-300'
    },
    cyan: {
      bgFrom: 'from-cyan-600/20',
      bgTo: 'to-teal-600/20',
      border: 'border-cyan-500/30',
      text: 'text-cyan-300',
      valueColor: 'text-cyan-300'
    },
    indigo: {
      bgFrom: 'from-indigo-600/20',
      bgTo: 'to-purple-600/20',
      border: 'border-indigo-500/30',
      text: 'text-indigo-300',
      valueColor: 'text-indigo-300'
    }
  };

  const config = colorConfigs[color] || colorConfigs.green;

  return (
    <div className={`bg-gradient-to-br ${config.bgFrom} ${config.bgTo} rounded-xl p-4 border ${config.border} backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-2 rounded-lg bg-black/20`}>
          {React.cloneElement(icon, { className: `w-4 h-4 ${config.text}` })}
        </div>
        <div>
          <div className="text-sm font-medium text-white/90">{label}</div>
          {description && (
            <div className="text-xs text-white/60">{description}</div>
          )}
        </div>
      </div>
      
      <div className={`text-2xl font-bold ${config.valueColor} mb-1`}>{value}</div>
      
      <div className="h-1 w-full bg-black/20 rounded-full overflow-hidden">
        <div 
          className={`h-full ${config.bgFrom.split('/')[0].replace('from-', 'bg-')}`}
          style={{ 
            width: color === 'green' ? '85%' : 
                   color === 'blue' ? '75%' : 
                   color === 'purple' ? '90%' : 
                   color === 'orange' ? '60%' : 
                   color === 'red' ? '40%' : 
                   color === 'cyan' ? '70%' : '80%' 
          }}
        />
      </div>
    </div>
  );
};

export default MetricCard;