import React from 'react';

const AnalysisControls = ({ onAnalyze, analyzing }) => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '32px'
    },
    button: {
      position: 'relative',
      background: 'linear-gradient(90deg, rgba(147, 51, 234, 1) 0%, rgba(236, 72, 153, 1) 100%)',
      color: 'white',
      padding: '16px 40px',
      borderRadius: '12px',
      fontSize: '18px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      transform: 'scale(1)'
    },
    buttonHover: {
      background: 'linear-gradient(90deg, rgba(126, 34, 206, 1) 0%, rgba(219, 39, 119, 1) 100%)',
      transform: 'scale(1.05)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    buttonDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      transform: 'scale(1)'
    },
    shimmer: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(192, 132, 252, 0.1) 0%, rgba(251, 113, 133, 0.1) 100%)',
      transform: 'translateY(100%)',
      transition: 'transform 0.5s ease'
    },
    shimmerHover: {
      transform: 'translateY(0)'
    },
    contentWrapper: {
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid white',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    iconContainer: {
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    svg: {
      width: '100%',
      height: '100%'
    }
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const buttonStyle = {
    ...styles.button,
    ...(isHovered && !analyzing ? styles.buttonHover : {}),
    ...(analyzing ? styles.buttonDisabled : {})
  };

  const shimmerStyle = {
    ...styles.shimmer,
    ...(isHovered && !analyzing ? styles.shimmerHover : {})
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <div style={styles.container}>
        <button
          onClick={onAnalyze}
          disabled={analyzing}
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={shimmerStyle}></div>
          
          {analyzing ? (
            <span style={styles.contentWrapper}>
              <div style={styles.spinner}></div>
              <span>Analyzing with AI...</span>
            </span>
          ) : (
            <span style={styles.contentWrapper}>
              <div style={styles.iconContainer}>
                <svg style={styles.svg} viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#f0abfc" />
                    </linearGradient>
                  </defs>
                  <path 
                    fill="none" 
                    stroke="url(#iconGradient)" 
                    strokeWidth="2"
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
              </div>
              <span>Generate AI SWOT Analysis</span>
            </span>
          )}
        </button>
      </div>
    </>
  );
};

export default AnalysisControls;