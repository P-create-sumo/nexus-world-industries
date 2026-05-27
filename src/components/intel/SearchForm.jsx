import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User, Building2, Globe } from 'lucide-react';

const entityTypes = [
  { value: 'Person', label: 'Person', icon: User },
  { value: 'Organization', label: 'Organization', icon: Building2 },
  { value: 'Domain', label: 'Domain', icon: Globe },
];

const suggestions = [
  { name: 'Alexei Volkov', type: 'Person' },
  { name: 'Meridian Capital Partners', type: 'Organization' },
  { name: 'Solaris Dynamics Ltd', type: 'Organization' },
  { name: 'meridian-cap.io', type: 'Domain' },
];

export default function SearchForm({ onSearch, loading }) {
  const [query, setQuery] = useState('');
  const [entityType, setEntityType] = useState('Person');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim(), entityType);
  };

  const handleSuggestion = (s) => {
    setQuery(s.name);
    setEntityType(s.type);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Entity Type Selector */}
        <div className="flex gap-2">
          {entityTypes.map(({ value, label, icon: Icon }) => (
            <button key={value} type="button" onClick={() => setEntityType(value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                entityType === value
                  ? 'border-blue-500/50 bg-blue-500/10 text-blue-300'
                  : 'border-white/8 bg-white/3 text-white/40 hover:text-white/70 hover:border-white/15'
              }`}>
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={`Enter ${entityType.toLowerCase()} name...`}
            className="pl-11 h-14 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-blue-500/40 text-base"
          />
          <Button type="submit" disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white h-10 px-5 gap-2">
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {loading ? 'Analyzing...' : 'Analyze'}
          </Button>
        </div>
      </form>

      {/* Quick Suggestions */}
      <div className="mt-4">
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-wider mb-2">Test subjects</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => handleSuggestion(s)}
              className="text-xs px-3 py-1.5 rounded-lg border border-white/8 bg-white/3 text-white/35 hover:text-white/70 hover:border-white/20 transition-all">
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}