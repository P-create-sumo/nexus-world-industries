import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import SearchForm from '@/components/intel/SearchForm';
import IntelResultCard from '@/components/intel/IntelResultCard';
import { Clock, ChevronRight, Shield, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const records = await base44.entities.IntelSearch.list('-created_date', 10);
    setHistory(records.filter(r => r.status === 'completed'));
  };

  const handleSearch = async (entityName, entityType) => {
    setLoading(true);
    setError(null);
    setCurrentResult(null);

    // Create pending record
    const record = await base44.entities.IntelSearch.create({
      entity_name: entityName,
      entity_type: entityType,
      status: 'pending'
    });

    const response = await base44.functions.invoke('entityIntelSearch', {
      entity_name: entityName,
      entity_type: entityType
    });

    const data = response.data;

    if (data.success) {
      await base44.entities.IntelSearch.update(record.id, {
        ...data.data,
        status: 'completed'
      });
      setCurrentResult({ ...record, ...data.data, entity_name: entityName, entity_type: entityType });
      loadHistory();
    } else {
      setError('Analysis failed. Please try again.');
      await base44.entities.IntelSearch.update(record.id, { status: 'error' });
    }

    setLoading(false);
  };

  const loadHistoryItem = async (item) => {
    setCurrentResult(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#060810] text-white">
      {/* Top Bar */}
      <div className="border-b border-white/5 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500 rounded-lg rotate-45 opacity-80" />
              <div className="absolute inset-1 bg-[#060810] rounded-md rotate-45" />
              <div className="absolute inset-1.5 bg-blue-400/60 rounded-sm rotate-45" />
            </div>
            <div>
              <span className="text-white font-bold text-base tracking-tight">NEXUS</span>
              <span className="text-white/20 text-[9px] font-mono ml-2">INTELLIGENCE PLATFORM</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/community">
              <Button variant="ghost" className="text-white/40 hover:text-white gap-2 text-xs h-8">
                Community
              </Button>
            </Link>
            <Link to="/quick-start">
              <Button variant="ghost" className="text-white/40 hover:text-white gap-2 text-xs h-8">
                <BookOpen className="w-3.5 h-3.5" /> Quick Start
              </Button>
            </Link>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/8 border border-blue-500/15">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] font-mono text-blue-400/80">ALPHA v0.1</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/3 mb-6">
            <Shield className="w-3.5 h-3.5 text-blue-400/60" />
            <span className="text-xs font-mono text-white/30">ENTITY INTELLIGENCE SEARCH</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Who are you looking for?</h1>
          <p className="text-white/40 text-base">Enter a person, organization, or domain to generate an intelligence profile.</p>
        </motion.div>

        {/* Search */}
        <SearchForm onSearch={handleSearch} loading={loading} />

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mt-10 flex flex-col items-center gap-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full" />
                <div className="absolute inset-0 border-2 border-transparent border-t-blue-500 rounded-full animate-spin" />
                <div className="absolute inset-3 border border-blue-400/20 rounded-full" />
              </div>
              <div className="text-center">
                <p className="text-white/60 text-sm font-semibold">NEXUS is analyzing...</p>
                <p className="text-white/25 text-xs font-mono mt-1">Querying OSINT sources · Building profile · Scoring risk</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {error && (
          <div className="mt-8 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-center">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Result */}
        <AnimatePresence>
          {currentResult && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
              <IntelResultCard result={currentResult} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* History */}
        {history.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-16">
            <div className="flex items-center gap-2 mb-5">
              <Clock className="w-4 h-4 text-white/20" />
              <span className="text-xs font-mono text-white/25 uppercase tracking-wider">Recent Searches</span>
            </div>
            <div className="space-y-2">
              {history.map((item) => {
                const risk = { LOW: 'text-green-400', MEDIUM: 'text-yellow-400', HIGH: 'text-orange-400', CRITICAL: 'text-red-400' };
                return (
                  <button key={item.id} onClick={() => loadHistoryItem(item)}
                    className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="text-left">
                        <p className="text-white/70 text-sm font-semibold">{item.entity_name}</p>
                        <p className="text-white/25 text-[10px] font-mono">{item.entity_type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-bold font-mono ${risk[item.risk_level] || 'text-white/30'}`}>{item.risk_score}</span>
                      <span className={`text-[10px] font-mono ${risk[item.risk_level] || 'text-white/30'}`}>{item.risk_level}</span>
                      <ChevronRight className="w-4 h-4 text-white/15" />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}