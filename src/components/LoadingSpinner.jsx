import React from 'react';
import { Sparkles, Brain, Zap } from 'lucide-react';

const LoadingSpinner = () => {
  const styles = {
    overlay: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      animation: 'fadeIn 0.3s ease-in-out'
    },
    particleContainer: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none'
    },
    particle1: {
      position: 'absolute',
      top: '25%',
      left: '25%',
      width: '256px',
      height: '256px',
      background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 2s ease-in-out infinite'
    },
    particle2: {
      position: 'absolute',
      bottom: '25%',
      right: '25%',
      width: '256px',
      height: '256px',
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 2s ease-in-out infinite 1s'
    },
    modal: {
      position: 'relative',
      background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.9) 0%, rgba(49, 46, 129, 0.9) 50%, rgba(15, 23, 42, 0.9) 100%)',
      padding: '40px',
      borderRadius: '24px',
      border: '1px solid rgba(168, 85, 247, 0.4)',
      boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.2)',
      animation: 'zoomIn 0.5s ease-out'
    },
    shimmer: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)',
      borderRadius: '24px',
      animation: 'shimmer 3s infinite'
    },
    glow: {
      position: 'absolute',
      inset: '-4px',
      background: 'linear-gradient(90deg, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(147, 51, 234, 0.2) 100%)',
      borderRadius: '24px',
      filter: 'blur(20px)',
      opacity: 0.75,
      animation: 'pulse 2s ease-in-out infinite',
      zIndex: -1
    },
    content: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px'
    },
    spinnerContainer: {
      position: 'relative',
      width: '80px',
      height: '80px'
    },
    outerRing: {
      position: 'absolute',
      inset: 0,
      width: '80px',
      height: '80px',
      border: '4px solid rgba(168, 85, 247, 0.1)',
      borderRadius: '50%'
    },
    middleRing: {
      position: 'absolute',
      inset: 0,
      width: '80px',
      height: '80px',
      border: '4px solid transparent',
      borderTopColor: 'rgba(192, 132, 252, 1)',
      borderRightColor: 'rgba(192, 132, 252, 1)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    innerRing: {
      position: 'absolute',
      inset: '8px',
      width: '64px',
      height: '64px',
      border: '4px solid transparent',
      borderBottomColor: 'rgba(96, 165, 250, 1)',
      borderLeftColor: 'rgba(96, 165, 250, 1)',
      borderRadius: '50%',
      animation: 'spinReverse 1.5s linear infinite'
    },
    centerIcon: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    brainIcon: {
      animation: 'pulse 2s ease-in-out infinite',
      color: 'rgba(216, 180, 254, 1)'
    },
    textContainer: {
      textAlign: 'center',
      marginTop: '48px'
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '12px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '900',
      background: 'linear-gradient(90deg, rgba(233, 213, 255, 1) 0%, rgba(219, 234, 254, 1) 50%, rgba(233, 213, 255, 1) 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      animation: 'pulse 2s ease-in-out infinite'
    },
    subtitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      color: 'rgba(233, 213, 255, 1)',
      fontSize: '14px',
      fontWeight: '500'
    },
    dotsContainer: {
      display: 'flex',
      gap: '8px'
    },
    dot1: {
      width: '12px',
      height: '12px',
      background: 'linear-gradient(135deg, rgba(192, 132, 252, 1) 0%, rgba(96, 165, 250, 1) 100%)',
      borderRadius: '50%',
      boxShadow: '0 4px 6px rgba(192, 132, 252, 0.5)',
      animation: 'bounce 1s ease-in-out infinite'
    },
    dot2: {
      width: '12px',
      height: '12px',
      background: 'linear-gradient(135deg, rgba(96, 165, 250, 1) 0%, rgba(34, 211, 238, 1) 100%)',
      borderRadius: '50%',
      boxShadow: '0 4px 6px rgba(96, 165, 250, 0.5)',
      animation: 'bounce 1s ease-in-out infinite 0.15s'
    },
    dot3: {
      width: '12px',
      height: '12px',
      background: 'linear-gradient(135deg, rgba(34, 211, 238, 1) 0%, rgba(192, 132, 252, 1) 100%)',
      borderRadius: '50%',
      boxShadow: '0 4px 6px rgba(34, 211, 238, 0.5)',
      animation: 'bounce 1s ease-in-out infinite 0.3s'
    },
    progressBar: {
      width: '256px',
      height: '4px',
      backgroundColor: 'rgba(88, 28, 135, 0.5)',
      borderRadius: '9999px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, rgba(192, 132, 252, 1) 0%, rgba(96, 165, 250, 1) 50%, rgba(192, 132, 252, 1) 100%)',
      borderRadius: '9999px',
      animation: 'progress 2s ease-in-out infinite'
    },
    floatingParticle: {
      position: 'absolute',
      borderRadius: '50%',
      opacity: 0.6
    },
    fp1: {
      top: '16px',
      left: '16px',
      width: '8px',
      height: '8px',
      backgroundColor: 'rgba(192, 132, 252, 0.6)',
      animation: 'float 3s ease-in-out infinite'
    },
    fp2: {
      top: '32px',
      right: '24px',
      width: '6px',
      height: '6px',
      backgroundColor: 'rgba(96, 165, 250, 0.6)',
      animation: 'float 3s ease-in-out infinite 0.5s'
    },
    fp3: {
      bottom: '24px',
      left: '32px',
      width: '4px',
      height: '4px',
      backgroundColor: 'rgba(34, 211, 238, 0.6)',
      animation: 'float 3s ease-in-out infinite 1s'
    },
    fp4: {
      bottom: '16px',
      right: '16px',
      width: '8px',
      height: '8px',
      backgroundColor: 'rgba(192, 132, 252, 0.6)',
      animation: 'float 3s ease-in-out infinite 1.5s'
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes zoomIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }
      `}</style>

      <div style={styles.overlay}>
        <div style={styles.particleContainer}>
          <div style={styles.particle1}></div>
          <div style={styles.particle2}></div>
        </div>

        <div style={styles.modal}>
          <div style={styles.shimmer}></div>
          <div style={styles.glow}></div>

          <div style={styles.content}>
            <div style={styles.spinnerContainer}>
              <div style={styles.outerRing}></div>
              <div style={styles.middleRing}></div>
              <div style={styles.innerRing}></div>
              <div style={styles.centerIcon}>
                <Brain size={32} style={styles.brainIcon} />
              </div>
            </div>

            <div style={styles.textContainer}>
              <div style={styles.titleContainer}>
                <Sparkles size={20} color="rgba(251, 191, 36, 1)" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                <h3 style={styles.title}>Analyzing Data</h3>
                <Sparkles size={20} color="rgba(251, 191, 36, 1)" style={{ animation: 'pulse 2s ease-in-out infinite 0.5s' }} />
              </div>
              
              <div style={styles.subtitle}>
                <Zap size={16} color="rgba(251, 191, 36, 1)" />
                <p>AI is generating insights...</p>
              </div>
            </div>

            <div style={styles.dotsContainer}>
              <div style={styles.dot1}></div>
              <div style={styles.dot2}></div>
              <div style={styles.dot3}></div>
            </div>

            <div style={styles.progressBar}>
              <div style={styles.progressFill}></div>
            </div>

            <div style={{ ...styles.floatingParticle, ...styles.fp1 }}></div>
            <div style={{ ...styles.floatingParticle, ...styles.fp2 }}></div>
            <div style={{ ...styles.floatingParticle, ...styles.fp3 }}></div>
            <div style={{ ...styles.floatingParticle, ...styles.fp4 }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;