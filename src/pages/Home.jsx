import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowRight, Play, Network, Search, BrainCircuit,
  Shield, Workflow, BarChart3, Layers, Zap, Lock,
  Globe, ShieldCheck, Fingerprint, Server, FileKey,
  Mail, Menu, X, Building2, Users, CheckCircle2, ChevronDown
} from 'lucide-react';

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Products', href: '#products' },
    { label: 'Features', href: '#features' },
    { label: 'Platform', href: '#platform' },
    { label: 'Security', href: '#security' },
    { label: 'Contact', href: '#cta' },
  ];

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#060810]/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-500 rounded-lg rotate-45 opacity-80" />
                <div className="absolute inset-1 bg-[#060810] rounded-md rotate-45" />
                <div className="absolute inset-2 bg-blue-400/60 rounded-sm rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-tight leading-none">NEXUS</span>
                <span className="text-white/30 text-[9px] tracking-[0.2em] uppercase leading-none mt-0.5 font-mono">World Industries</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {links.map((link) => (
                <button key={link.label} onClick={() => scrollTo(link.href)}
                  className="text-sm text-white/50 hover:text-white transition-colors font-medium">
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Button variant="ghost" className="text-sm text-white/50 hover:text-white" onClick={() => scrollTo('#cta')}>Sign In</Button>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-5" onClick={() => scrollTo('#cta')}>Request Demo</Button>
            </div>

            <button className="lg:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#060810]/95 backdrop-blur-xl pt-20">
            <div className="flex flex-col items-center gap-6 p-8">
              {links.map((link) => (
                <button key={link.label} onClick={() => scrollTo(link.href)} className="text-lg text-white font-medium">{link.label}</button>
              ))}
              <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
                <Button variant="outline" className="w-full border-white/10 text-white" onClick={() => scrollTo('#cta')}>Sign In</Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white" onClick={() => scrollTo('#cta')}>Request Demo</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />

      <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 right-20 w-64 h-64 border border-blue-500/10 rounded-full hidden lg:block" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-32 left-16 w-48 h-48 border border-cyan-500/10 rounded-full hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">Enterprise Intelligence Platform</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            <span className="text-white">See What Others</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Cannot See
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-2xl mx-auto mb-10">
            NEXUS maps hidden relationships, automates complex investigations,
            and delivers AI-driven insights — transforming raw data into
            operational intelligence at scale.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 gap-2 group" onClick={() => scrollTo('#cta')}>
              Request a Demo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 px-8 h-12 gap-2" onClick={() => scrollTo('#platform')}>
              <Play className="w-4 h-4" />
              Explore Platform
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 pt-8 border-t border-white/5">
            <p className="text-xs font-mono text-white/20 tracking-wider uppercase mb-6">Trusted by leading organizations worldwide</p>
            <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap">
              {['DEFENSE', 'FINANCE', 'INTELLIGENCE', 'ENERGY', 'AEROSPACE'].map((sector, i) => (
                <motion.span key={sector} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-xs font-mono text-white/20 tracking-[0.25em] hover:text-blue-400/60 transition-colors cursor-default">
                  {sector}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060810] to-transparent" />
    </section>
  );
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
const wiProducts = [
  {
    emoji: '🎯',
    name: 'ARES-OS',
    domain: 'FPV / Ground Ops',
    status: 'OPERATIONAL',
    statusColor: 'text-green-400 border-green-400/30 bg-green-400/5',
    desc: 'Ground Operations Platform for FPV Drone Teams. Real-time mission intelligence, telemetry fusion, and operator-first UX built for contested environments.',
    tags: ['AIR', 'GROUND'],
  },
  {
    emoji: '⚓',
    name: 'POSEIDON-OS',
    domain: 'Naval / ISR',
    status: 'POC RELEASED',
    statusColor: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
    desc: 'Maritime Port Intelligence Platform. Integrates AIS, Sentinel-2 satellite imagery, and radar data for persistent maritime situational awareness.',
    tags: ['NAVAL', 'MARITIME'],
  },
  {
    emoji: '🛰️',
    name: 'SAM HUNTER',
    domain: 'ISTAR / Counter-SAM',
    status: 'POC RELEASED',
    statusColor: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
    desc: 'Air Defense Target Acquisition System. YOLOv8-powered detection of SAM launchers and radar systems from SAR and optical imagery.',
    tags: ['AIR', 'NAVAL'],
  },
  {
    emoji: '🚀',
    name: 'COUNTER-DRONE',
    domain: 'Counter-UAS / Air Defense',
    status: 'POC RELEASED',
    statusColor: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
    desc: 'Interceptor Fleet Command & Control. Manages multi-vector drone interception with automated threat prioritization and engagement sequencing.',
    tags: ['AIR'],
  },
  {
    emoji: '🦏',
    name: 'RHINO-OS',
    domain: 'UGV / Ground Ops',
    status: 'POC RELEASED',
    statusColor: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
    desc: 'UGV Fleet Command & Control Platform. Autonomous ground vehicle coordination with real-time path planning and obstacle intelligence.',
    tags: ['GROUND'],
  },
  {
    emoji: '🌊',
    name: 'TRITON-OS',
    domain: 'USV/UUV / Maritime Ops',
    status: 'POC RELEASED',
    statusColor: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
    desc: 'Mission Intelligence Platform for USV/UUV operations. Subsurface and surface fleet orchestration with multi-domain sensor fusion.',
    tags: ['MARITIME', 'UNDERWATER'],
  },
];

const domainColors = {
  AIR: 'text-cyan-400/80 bg-cyan-400/5 border-cyan-400/15',
  GROUND: 'text-orange-400/80 bg-orange-400/5 border-orange-400/15',
  NAVAL: 'text-blue-400/80 bg-blue-400/5 border-blue-400/15',
  MARITIME: 'text-teal-400/80 bg-teal-400/5 border-teal-400/15',
  UNDERWATER: 'text-indigo-400/80 bg-indigo-400/5 border-indigo-400/15',
};

function ProductsSection() {
  return (
    <section id="products" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/[0.025] to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-4">World Industries Platforms</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">Six Platforms. One Mission.</h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed">
              From FPV drone ops to maritime port monitoring and subsurface intelligence — open-source, field-ready, built for operators.
            </p>
            <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
              {['Air', 'Ground', 'Naval', 'Maritime', 'Underwater'].map(d => (
                <span key={d} className="text-xs font-mono text-white/25 tracking-widest">· {d}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {wiProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group relative rounded-2xl bg-white/3 border border-white/5 p-7 hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-500 flex flex-col"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div className="text-3xl">{product.emoji}</div>
                <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border tracking-wider ${product.statusColor}`}>
                  {product.status}
                </span>
              </div>

              {/* Name + domain */}
              <div className="mb-3">
                <h3 className="text-lg font-bold text-white tracking-tight">{product.name}</h3>
                <p className="text-xs font-mono text-white/35 mt-0.5 tracking-wider">{product.domain}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-white/45 leading-relaxed mb-5 flex-1">{product.desc}</p>

              {/* Domain tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {product.tags.map(tag => (
                  <span key={tag} className={`text-[10px] font-mono px-2 py-0.5 rounded border tracking-widest ${domainColors[tag]}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Multi-domain coverage bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-2xl border border-white/5 bg-white/3 p-6"
        >
          <p className="text-xs font-mono text-white/25 uppercase tracking-widest text-center mb-5">Multi-Domain Coverage</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { domain: 'AIR', platforms: 'ARES-OS · Counter-Drone', color: 'text-cyan-400' },
              { domain: 'GROUND', platforms: 'ARES-OS · RHINO-OS', color: 'text-orange-400' },
              { domain: 'NAVAL', platforms: 'POSEIDON-OS · SAM Hunter', color: 'text-blue-400' },
              { domain: 'MARITIME', platforms: 'POSEIDON-OS · TRITON-OS', color: 'text-teal-400' },
              { domain: 'UNDERWATER', platforms: 'TRITON-OS', color: 'text-indigo-400' },
            ].map(item => (
              <div key={item.domain} className="text-center">
                <p className={`text-xs font-bold font-mono tracking-widest ${item.color}`}>{item.domain}</p>
                <p className="text-[10px] text-white/25 mt-1 leading-relaxed">{item.platforms}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────
const features = [
  { icon: Network, title: 'Relational Mapping', description: 'Automatically discover and visualize hidden connections across entities, transactions, and communications. Transform disparate data into actionable relationship graphs.' },
  { icon: Search, title: 'Investigation Workflows', description: 'Streamline complex investigations with configurable workflows, automated evidence collection, and collaborative case management built for enterprise scale.' },
  { icon: BrainCircuit, title: 'AI-Powered Analysis', description: 'Advanced machine learning models identify anomalies, predict patterns, and surface critical insights that human analysts would take weeks to uncover.' },
  { icon: Shield, title: 'Threat Detection', description: 'Real-time monitoring across data streams with intelligent alerting. Detect emerging threats before they materialize into operational risks.' },
  { icon: Workflow, title: 'Automated Pipelines', description: 'Build end-to-end data pipelines that ingest, normalize, and enrich information from hundreds of sources — without writing a single line of code.' },
  { icon: BarChart3, title: 'Executive Intelligence', description: 'Transform complex analytical outputs into clear, actionable briefings. Decision-grade intelligence delivered to stakeholders in real time.' },
];

function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/3 rounded-full blur-[150px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-4">Capabilities</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">Intelligence at Every Layer</h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed">
              A unified platform that connects the dots across your entire data ecosystem — from raw signals to strategic decisions.
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-2xl bg-white/3 border border-white/5 p-8 hover:border-blue-500/20 hover:bg-white/5 transition-all duration-500">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 mb-6 group-hover:bg-blue-500/10 transition-colors">
                <feature.icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PLATFORM ─────────────────────────────────────────────────────────────────
const stats = [
  { value: '10B+', label: 'Data Points Processed', icon: Layers },
  { value: '<50ms', label: 'Query Response Time', icon: Zap },
  { value: 'SOC 2', label: 'Security Certified', icon: Lock },
  { value: '40+', label: 'Countries Deployed', icon: Globe },
];

function PlatformSection() {
  return (
    <section id="platform" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-4">The Platform</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Built for the World's Most Complex Problems
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              NEXUS is engineered from the ground up to handle the scale, complexity, and sensitivity that enterprise intelligence demands.
              Our platform integrates seamlessly with existing infrastructure while providing capabilities that were previously impossible.
            </p>
            <div className="space-y-4">
              {[
                'Ontology-driven data model adapts to any domain',
                'Petabyte-scale processing with real-time responsiveness',
                'Air-gapped deployment options for sovereign operations',
                'Full audit trail and granular access controls',
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border border-blue-500/40 flex items-center justify-center mt-0.5 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  </div>
                  <span className="text-sm text-white/50">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="rounded-2xl border border-white/5 bg-white/3 backdrop-blur-sm p-8" style={{ boxShadow: '0 0 40px rgba(59,130,246,0.08)' }}>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                    <div className="w-3 h-3 rounded-full bg-green-500/40" />
                  </div>
                  <span className="text-[10px] font-mono text-white/20">nexus://intelligence/dashboard</span>
                </div>
                <div className="relative h-48 flex items-center justify-center">
                  <div className="absolute w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center z-10">
                    <div className="w-4 h-4 rounded-full bg-blue-400/60" />
                  </div>
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                    const r = 80;
                    const x = Math.cos((deg * Math.PI) / 180) * r;
                    const y = Math.sin((deg * Math.PI) / 180) * r;
                    return (
                      <motion.div key={i} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                        className="absolute w-6 h-6 rounded-full border border-blue-500/20 bg-white/5 flex items-center justify-center"
                        style={{ transform: `translate(${x}px, ${y}px)` }}>
                        <div className="w-2 h-2 rounded-full bg-blue-400/40" />
                      </motion.div>
                    );
                  })}
                  <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                    {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                      const r = 80;
                      const x = 50 + Math.cos((deg * Math.PI) / 180) * (r / 1.9);
                      const y = 50 + Math.sin((deg * Math.PI) / 180) * (r / 1.9);
                      return <line key={i} x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`} stroke="rgba(59,130,246,0.12)" strokeWidth="1" />;
                    })}
                  </svg>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                  <div className="bg-white/3 rounded-lg p-3">
                    <span className="text-[10px] font-mono text-white/25 block">ENTITIES</span>
                    <span className="text-lg font-semibold text-white">2,847</span>
                  </div>
                  <div className="bg-white/3 rounded-lg p-3">
                    <span className="text-[10px] font-mono text-white/25 block">CONNECTIONS</span>
                    <span className="text-lg font-semibold text-blue-400">14,209</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }} className="rounded-xl bg-white/3 border border-white/5 p-4 text-center">
                  <stat.icon className="w-4 h-4 text-blue-400/60 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] font-mono text-white/30 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SECURITY ─────────────────────────────────────────────────────────────────
const securityItems = [
  { icon: ShieldCheck, title: 'Zero-Trust Architecture', desc: 'Every request is verified, every access is audited. No implicit trust, anywhere in the stack.' },
  { icon: Fingerprint, title: 'End-to-End Encryption', desc: 'Military-grade encryption in transit and at rest. Your data remains exclusively yours.' },
  { icon: Server, title: 'Sovereign Deployment', desc: 'Deploy on-premise, in your cloud, or in air-gapped environments. Full operational sovereignty.' },
  { icon: FileKey, title: 'Compliance Ready', desc: 'SOC 2 Type II, ISO 27001, GDPR, and ITAR compliant. Built for regulated industries.' },
];

function SecuritySection() {
  return (
    <section id="security" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/[0.02] to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-4">Security & Compliance</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">Security Without Compromise</h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed">
              Purpose-built for organizations where data security is not optional — it's mission-critical.
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityItems.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group text-center p-6 rounded-2xl border border-white/5 bg-white/3 hover:border-blue-500/20 transition-all duration-500">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 mb-5 group-hover:bg-blue-500/10 transition-colors">
                <item.icon className="w-5 h-5 text-blue-400/70" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT / DEMO REQUEST ───────────────────────────────────────────────────
const companySizes = ['1–50', '51–200', '201–1,000', '1,001–5,000', '5,000+'];
const useCases = ['Threat Intelligence', 'Financial Investigation', 'Fraud Detection', 'Compliance & Audit', 'Competitive Intelligence', 'Other'];

function CTASection() {
  const [form, setForm] = useState({ name: '', email: '', company: '', size: '', useCase: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <section id="cta" className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/4 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-4">Contact Us</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Request a Demo
            </h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed">
              Speak with our team and see how NEXUS can transform your intelligence operations. We'll tailor the demo to your specific use case.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* What to expect */}
            <div>
              <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-5">What to expect</h3>
              <div className="space-y-5">
                {[
                  { icon: Users, title: 'Personalized walkthrough', desc: 'A live demo tailored to your industry and intelligence requirements.' },
                  { icon: Building2, title: 'Architecture review', desc: 'We discuss deployment options — cloud, on-premise, or air-gapped.' },
                  { icon: CheckCircle2, title: 'Proof of concept', desc: 'We can run a rapid PoC on your own data within 2 weeks.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-white/40 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response time badge */}
            <div className="rounded-xl border border-white/5 bg-white/3 p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-green-400/80 tracking-wider uppercase">Response time</span>
              </div>
              <p className="text-white font-semibold">Within 24 hours</p>
              <p className="text-xs text-white/30 mt-1">Our enterprise team responds to all inquiries within one business day.</p>
            </div>

            {/* Direct contact */}
            <div>
              <p className="text-xs font-mono text-white/25 uppercase tracking-widest mb-3">Direct contact</p>
              <a href="mailto:enterprise@nexus-wi.com" className="flex items-center gap-2 text-sm text-white/50 hover:text-blue-400 transition-colors">
                <Mail className="w-4 h-4" />
                enterprise@nexus-wi.com
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="relative rounded-2xl border border-white/5 bg-white/3 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center px-8 py-20">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-blue-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">Request received</h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                    Our enterprise team will reach out to <span className="text-blue-400">{form.email}</span> within 24 hours to schedule your personalized demo.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/30 uppercase tracking-wider">Full name *</label>
                      <Input
                        required
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={e => handleChange('name', e.target.value)}
                        className="bg-white/5 border-white/8 text-white placeholder:text-white/20 focus:border-blue-500/40 h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/30 uppercase tracking-wider">Work email *</label>
                      <Input
                        required
                        type="email"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={e => handleChange('email', e.target.value)}
                        className="bg-white/5 border-white/8 text-white placeholder:text-white/20 focus:border-blue-500/40 h-11"
                      />
                    </div>
                  </div>

                  {/* Company + Size */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/30 uppercase tracking-wider">Organization *</label>
                      <Input
                        required
                        placeholder="World Industries Ltd."
                        value={form.company}
                        onChange={e => handleChange('company', e.target.value)}
                        className="bg-white/5 border-white/8 text-white placeholder:text-white/20 focus:border-blue-500/40 h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/30 uppercase tracking-wider">Company size</label>
                      <div className="relative">
                        <select
                          value={form.size}
                          onChange={e => handleChange('size', e.target.value)}
                          className="w-full h-11 bg-white/5 border border-white/8 text-white/70 rounded-md px-3 text-sm appearance-none focus:outline-none focus:border-blue-500/40 cursor-pointer"
                        >
                          <option value="" className="bg-[#060810]">Select range</option>
                          {companySizes.map(s => <option key={s} value={s} className="bg-[#060810]">{s} employees</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Use case */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/30 uppercase tracking-wider">Primary use case</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {useCases.map(uc => (
                        <button
                          type="button"
                          key={uc}
                          onClick={() => handleChange('useCase', uc)}
                          className={`text-xs px-3 py-2.5 rounded-lg border transition-all duration-200 text-left ${
                            form.useCase === uc
                              ? 'border-blue-500/50 bg-blue-500/10 text-blue-300'
                              : 'border-white/5 bg-white/3 text-white/40 hover:border-white/15 hover:text-white/60'
                          }`}
                        >
                          {uc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/30 uppercase tracking-wider">Tell us about your challenge</label>
                    <Textarea
                      placeholder="Describe your current data challenges, scale, or what you're hoping NEXUS can solve..."
                      value={form.message}
                      onChange={e => handleChange('message', e.target.value)}
                      className="bg-white/5 border-white/8 text-white placeholder:text-white/20 focus:border-blue-500/40 min-h-[100px] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-semibold gap-2 group transition-all"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending request...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Request Your Demo
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-white/20 text-center font-mono">
                    By submitting, you agree to our Privacy Policy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500 rounded-md rotate-45 opacity-80" />
              <div className="absolute inset-0.5 bg-[#060810] rounded-sm rotate-45" />
              <div className="absolute inset-1.5 bg-blue-400/60 rounded-sm rotate-45" />
            </div>
            <span className="text-sm font-semibold text-white">NEXUS</span>
            <span className="text-xs text-white/20 font-mono">by World Industries</span>
          </div>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Security', 'Status'].map((link) => (
              <button key={link} className="text-xs text-white/20 hover:text-white/50 transition-colors">{link}</button>
            ))}
          </div>
          <p className="text-xs text-white/15 font-mono">© {new Date().getFullYear()} World Industries. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-[#060810] text-white">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
      <PlatformSection />
      <SecuritySection />
      <CTASection />
      <Footer />
    </div>
  );
}