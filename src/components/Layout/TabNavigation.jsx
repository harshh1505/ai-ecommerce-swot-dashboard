import React, { useState } from 'react';
import { BarChart3, TrendingUp, Activity, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const TabNavigation = ({ activeTab, onTabChange, hasComparison, onExport }) => {
  const [hoveredTab, setHoveredTab] = useState(null);

  const tabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: BarChart3,
      gradient: 'from-blue-500 to-cyan-500',
      hoverGlow: 'shadow-blue-500/50'
    },
    { 
      id: 'predictions', 
      label: 'Predictions', 
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
      hoverGlow: 'shadow-purple-500/50'
    },
    { 
      id: 'charts', 
      label: 'Charts', 
      icon: Activity,
      gradient: 'from-emerald-500 to-teal-500',
      hoverGlow: 'shadow-emerald-500/50'
    },
  ];

  if (hasComparison) {
    tabs.push({ 
      id: 'comparison', 
      label: 'Comparison', 
      icon: Users,
      gradient: 'from-orange-500 to-red-500',
      hoverGlow: 'shadow-orange-500/50'
    });
  }

  const containerStyle = {
    position: 'sticky',
    top: '16px',
    zIndex: 10,
    background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.3) 0%, rgba(15, 23, 42, 0.3) 100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(168, 85, 247, 0.1)',
    marginBottom: '32px'
  };

  const flexContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px'
  };

  const tabsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    position: 'relative'
  };

  const getTabStyle = (tab, isActive, isHovered) => ({
    position: 'relative',
    padding: '12px 24px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: isActive 
      ? `linear-gradient(135deg, ${tab.gradient.includes('blue') ? '#3b82f6, #06b6d4' : tab.gradient.includes('purple') ? '#a855f7, #ec4899' : tab.gradient.includes('emerald') ? '#10b981, #14b8a6' : '#f97316, #ef4444'})`
      : isHovered 
        ? 'rgba(255, 255, 255, 0.15)' 
        : 'transparent',
    color: isActive ? '#ffffff' : isHovered ? '#ffffff' : 'rgba(216, 180, 254, 0.9)',
    boxShadow: isActive 
      ? `0 8px 32px ${tab.hoverGlow.replace('shadow-', 'rgba(').replace('/50', ', 0.4)')}, 0 0 0 1px rgba(255, 255, 255, 0.1) inset`
      : 'none',
    transform: isActive ? 'translateY(-2px) scale(1.02)' : isHovered ? 'translateY(-1px)' : 'translateY(0)',
    outline: 'none'
  });

  const iconStyle = (isActive, isHovered) => ({
    width: '18px',
    height: '18px',
    transition: 'all 0.3s ease',
    transform: isActive || isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0deg) scale(1)',
    filter: isActive ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' : 'none'
  });

  const indicatorStyle = {
    position: 'absolute',
    bottom: '-4px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '40%',
    height: '3px',
    borderRadius: '10px',
    background: 'linear-gradient(90deg, transparent, white, transparent)',
    boxShadow: '0 0 12px rgba(255, 255, 255, 0.8)'
  };

  const particleStyle = (delay) => ({
    position: 'absolute',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.6)',
    animation: `float ${2 + delay}s infinite ease-in-out`,
    animationDelay: `${delay}s`
  });

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.6); }
        }
      `}</style>

      <div style={flexContainerStyle}>
        <div style={tabsContainerStyle}>
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            const isHovered = hoveredTab === tab.id;
            const Icon = tab.icon;

            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                style={getTabStyle(tab, isActive, isHovered)}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                {/* Animated background particles for active tab */}
                {isActive && (
                  <>
                    <div style={{ ...particleStyle(0), top: '10%', left: '20%' }} />
                    <div style={{ ...particleStyle(0.5), top: '30%', right: '15%' }} />
                    <div style={{ ...particleStyle(1), bottom: '20%', left: '30%' }} />
                  </>
                )}

                <Icon style={iconStyle(isActive, isHovered)} />
                <span style={{ 
                  letterSpacing: '0.3px',
                  textShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none'
                }}>
                  {tab.label}
                </span>

                {/* Active indicator line */}
                {isActive && (
                  <motion.div
                    style={indicatorStyle}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Hover glow effect */}
                {isHovered && !isActive && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '16px',
                    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1), transparent)',
                    pointerEvents: 'none'
                  }} />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Export Button */}
        <motion.button
          onClick={onExport}
          style={{
            padding: '12px 24px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 8px 30px rgba(99, 102, 241, 0.6)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export
        </motion.button>
      </div>
    </div>
  );
};

export default TabNavigation;