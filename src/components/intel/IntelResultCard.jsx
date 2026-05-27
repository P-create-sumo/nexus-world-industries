import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Users, Link, Tag, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from 'lucide-react';

const riskColors = {
  LOW: { bg: 'bg-green-500/10', border: 'border-green-500/25', text: 'text-green-400', bar: 'bg-green-500' },
  MEDIUM: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/25', text: 'text-yellow-400', bar: 'bg-yellow-500' },
  HIGH: { bg: 'bg-orange-500/10', border: 'border-orange-500/25', text: 'text-orange-400', bar: 'bg-orange-500' },
  CRITICAL: { bg: 'bg-red-500/10', border: 'border-red-500/25', text: 'text-red-400', bar: 'bg-red-500' },
};

export default function IntelResultCard({ result, onFeedback }) {
  const [expanded, setExpanded] = useState(true);
  const [feedback, setFeedback] = useState(null);

  const risk = riskColors[result.risk_level] || riskColors.LOW;
  const scoreWidth = `${result.risk_score}%`;

  const handleFeedback = (val) => {
    setFeedback(val);
    if (onFeedback) onFeedback(result, val);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-bold text-white">{result.entity_name}</h3>
              <span className="text-[10px] font-mono border border-white/10 text-white/30 rounded px-1.5 py-0.5">{result.entity_type}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {result.tags?.map((tag, i) => (
                <span key={i} className="text-[10px] font-mono text-blue-400/70 bg-blue-500/8 border border-blue-500/15 rounded px-2 py-0.5">{tag}</span>
              ))}
            </div>
          </div>
          
          {/* Risk Badge */}
          <div className={`text-center px-4 py-2 rounded-xl border ${risk.bg} ${risk.border} min-w-[80px]`}>
            <div className={`text-2xl font-bold font-mono ${risk.text}`}>{result.risk_score}</div>
            <div className={`text-[9px] font-mono ${risk.text} tracking-widest`}>{result.risk_level}</div>
          </div>
        </div>

        {/* Risk Bar */}
        <div className="mt-4">
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: scoreWidth }} transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full rounded-full ${risk.bar}`} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] font-mono text-white/15">0 — CLEAN</span>
            <span className="text-[9px] font-mono text-white/15">100 — CRITICAL</span>
          </div>
        </div>
      </div>

      {/* Toggle body */}
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between px-6 py-3 bg-white/2 hover:bg-white/4 transition-colors">
        <span className="text-xs font-mono text-white/30">INTELLIGENCE REPORT</span>
        {expanded ? <ChevronUp className="w-4 h-4 text-white/20" /> : <ChevronDown className="w-4 h-4 text-white/20" />}
      </button>

      {expanded && (
        <div className="p-6 space-y-6">
          {/* Summary */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-blue-400/60" />
              <span className="text-xs font-mono text-white/30 uppercase tracking-wider">Executive Summary</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">{result.summary}</p>
          </div>

          {/* Red Flags */}
          {result.red_flags?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-orange-400/60" />
                <span className="text-xs font-mono text-white/30 uppercase tracking-wider">Red Flags ({result.red_flags.length})</span>
              </div>
              <div className="space-y-2">
                {result.red_flags.map((flag, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400/60 mt-1.5 shrink-0" />
                    <span className="text-xs text-white/50">{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Connections */}
          {result.key_connections?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-blue-400/60" />
                <span className="text-xs font-mono text-white/30 uppercase tracking-wider">Key Connections</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.key_connections.map((conn, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-lg border border-white/8 bg-white/3 text-white/50">{conn}</span>
                ))}
              </div>
            </div>
          )}

          {/* Sources */}
          {result.sources?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Link className="w-4 h-4 text-white/20" />
                <span className="text-xs font-mono text-white/30 uppercase tracking-wider">Sources Consulted</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.sources.map((src, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-1 rounded border border-white/5 text-white/25">{src}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Feedback */}
      <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/20">Was this report accurate?</span>
        <div className="flex gap-2">
          <button onClick={() => handleFeedback('positive')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all ${
              feedback === 'positive' ? 'border-green-500/40 bg-green-500/10 text-green-400' : 'border-white/8 text-white/25 hover:text-white/60'
            }`}>
            <ThumbsUp className="w-3 h-3" /> Accurate
          </button>
          <button onClick={() => handleFeedback('negative')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all ${
              feedback === 'negative' ? 'border-red-500/40 bg-red-500/10 text-red-400' : 'border-white/8 text-white/25 hover:text-white/60'
            }`}>
            <ThumbsDown className="w-3 h-3" /> Inaccurate
          </button>
        </div>
      </div>
    </motion.div>
  );
}