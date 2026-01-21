import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.06
    }
  }
};

const SWOTCard = ({ title, items, color, description }) => {
  const colorConfig = {
    green: {
      border: 'rgba(16, 185, 129, 0.2)',
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconColor: 'rgb(110, 231, 183)',
      titleColor: 'rgb(110, 231, 183)',
      dotBg: 'rgb(52, 211, 153)',
      impactLevel: 4
    },
    red: {
      border: 'rgba(239, 68, 68, 0.2)',
      iconBg: 'rgba(239, 68, 68, 0.1)',
      iconColor: 'rgb(252, 165, 165)',
      titleColor: 'rgb(252, 165, 165)',
      dotBg: 'rgb(248, 113, 113)',
      impactLevel: 3
    },
    blue: {
      border: 'rgba(59, 130, 246, 0.2)',
      iconBg: 'rgba(59, 130, 246, 0.1)',
      iconColor: 'rgb(147, 197, 253)',
      titleColor: 'rgb(147, 197, 253)',
      dotBg: 'rgb(96, 165, 250)',
      impactLevel: 5
    },
    orange: {
      border: 'rgba(251, 146, 60, 0.2)',
      iconBg: 'rgba(251, 146, 60, 0.1)',
      iconColor: 'rgb(253, 186, 116)',
      titleColor: 'rgb(253, 186, 116)',
      dotBg: 'rgb(251, 146, 60)',
      impactLevel: 2
    }
  };

  const config = colorConfig[color] || colorConfig.green;

  const Icon =
    color === 'green'
      ? CheckCircle
      : color === 'red'
      ? XCircle
      : color === 'blue'
      ? Info
      : AlertTriangle;

  const cardStyle = {
    borderRadius: '16px',
    border: `1px solid ${config.border}`,
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)'
  };

  const headerStyle = {
    padding: '24px 24px 16px 24px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  };

  const headerContentStyle = {
    display: 'flex',
    gap: '12px'
  };

  const iconWrapperStyle = {
    padding: '8px',
    borderRadius: '8px',
    background: config.iconBg
  };

  const iconStyle = {
    width: '20px',
    height: '20px',
    color: config.iconColor
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: config.titleColor,
    margin: 0
  };

  const descriptionStyle = {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.6)',
    margin: '4px 0 0 0'
  };

  const badgeStyle = {
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '9999px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.6)'
  };

  const listStyle = {
    padding: '0 24px 24px 24px',
    margin: 0,
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const itemStyle = {
    display: 'flex',
    gap: '16px',
    borderRadius: '12px',
    background: 'rgba(0, 0, 0, 0.2)',
    padding: '16px',
    transition: 'background 0.2s ease'
  };

  const itemHoverStyle = {
    background: 'rgba(0, 0, 0, 0.3)'
  };

  const numberStyle = {
    width: '28px',
    height: '28px',
    minWidth: '28px',
    borderRadius: '50%',
    background: config.dotBg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
    color: '#000'
  };

  const textStyle = {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: '1.6',
    margin: 0
  };

  const footerStyle = {
    padding: '16px 24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '12px'
  };

  const footerLabelStyle = {
    color: 'rgba(255, 255, 255, 0.5)'
  };

  const impactContainerStyle = {
    display: 'flex',
    gap: '4px'
  };

  const dotStyle = (isActive) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: isActive ? config.dotBg : 'rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease'
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      style={cardStyle}
    >
      {/* Header */}
      <div style={headerStyle}>
        <div style={headerContentStyle}>
          <div style={iconWrapperStyle}>
            <Icon style={iconStyle} />
          </div>

          <div>
            <h3 style={titleStyle}>
              {title}
            </h3>
            <p style={descriptionStyle}>
              {description}
            </p>
          </div>
        </div>

        <span style={badgeStyle}>
          {items.length}
        </span>
      </div>

      {/* Items */}
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={listStyle}
      >
        {items.map((text, i) => (
          <motion.li
            key={i}
            variants={itemVariants}
            style={itemStyle}
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          >
            <div style={numberStyle}>
              {i + 1}
            </div>

            <p style={textStyle}>
              {text}
            </p>
          </motion.li>
        ))}
      </motion.ul>

      {/* Footer */}
      <div style={footerStyle}>
        <span style={footerLabelStyle}>Impact Level</span>

        <div style={impactContainerStyle}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={dotStyle(i < config.impactLevel)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SWOTCard;