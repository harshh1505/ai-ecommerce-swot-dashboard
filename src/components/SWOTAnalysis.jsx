import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Lightbulb,
  AlertCircle,
  Target,
  Zap,
  Shield,
} from 'lucide-react';
import { motion } from 'framer-motion';
import SWOTCard from './SWOTCard';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const SWOTAnalysis = ({ swotData }) => {
  const swotSections = [
    {
      title: 'Strengths',
      items: swotData.strengths,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'green',
      description: 'Internal advantages and competitive edges',
    },
    {
      title: 'Weaknesses',
      items: swotData.weaknesses,
      icon: <TrendingDown className="w-5 h-5" />,
      color: 'red',
      description: 'Internal areas needing improvement',
    },
    {
      title: 'Opportunities',
      items: swotData.opportunities,
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'blue',
      description: 'External factors for potential growth',
    },
    {
      title: 'Threats',
      items: swotData.threats,
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'orange',
      description: 'External challenges and risks',
    },
  ];

  return (
    <motion.div
      className="space-y-12"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {/* Executive Summary */}
      <motion.section
        variants={fadeUp}
        className="rounded-2xl bg-gradient-to-br from-purple-600/15 to-blue-600/10 p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Lightbulb className="w-5 h-5 text-purple-300" />
          </div>
          <h3 className="text-xl font-semibold text-white">
            Executive Summary
          </h3>
        </div>

        <p className="text-purple-100/90 leading-relaxed text-base md:text-lg">
          {swotData.keyInsights}
        </p>
      </motion.section>

      {/* SWOT Matrix */}
      <motion.section variants={fadeUp}>
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-5 h-5 text-purple-400" />
          <h2 className="text-2xl font-semibold text-white">
            SWOT Analysis
          </h2>
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={stagger}
        >
          {swotSections.map((section) => (
            <motion.div key={section.title} variants={fadeUp}>
              <SWOTCard {...section} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Recommendations */}
      <motion.section
        variants={fadeUp}
        className="rounded-2xl bg-slate-900/60 p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Zap className="w-5 h-5 text-blue-300" />
          </div>
          <h3 className="text-xl font-semibold text-white">
            Strategic Recommendations
          </h3>
        </div>

        <motion.div className="space-y-4" variants={stagger}>
          {swotData.recommendations.map((rec, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex gap-4 rounded-xl bg-white/5 p-4 hover:bg-white/10"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-500/15 text-blue-300 font-semibold">
                {i + 1}
              </div>

              <div className="flex-1">
                <p className="text-white leading-relaxed">{rec}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-blue-300">
                  <Shield className="w-4 h-4" />
                  <span>
                    Priority:{' '}
                    {i === 0 ? 'High' : i === 1 ? 'Medium' : 'Low'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default SWOTAnalysis;
