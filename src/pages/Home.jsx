import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowRight, Play, Network, Search, BrainCircuit,
  Shield, Workflow, BarChart3, Layers, Zap, Lock,
  Globe, ShieldCheck, Fingerprint, Server, FileKey,
  Mail, Menu, X
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

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="cta" className="relative py-24 lg:py-32">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative rounded-3xl border border-white/5 bg-white/3 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="px-8 py-16 md:px-16 md:py-20 text-center">
            <span className="inline-block text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-4">Get Started</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 max-w-2xl mx-auto leading-[1.1]">
              Ready to Transform Your Intelligence Operations?
            </h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
              Join the organizations that have already revolutionized how they discover, analyze, and act on critical information.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 gap-2 group">
                <Mail className="w-4 h-4" />
                Request a Demo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 px-8 h-12">
                Access Platform
              </Button>
            </div>
            <p className="mt-8 text-xs text-white/20 font-mono">
              No credit card required · Enterprise-grade security · Deploy in days
            </p>
          </div>
        </motion.div>
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
      <FeaturesSection />
      <PlatformSection />
      <SecuritySection />
      <CTASection />
      <Footer />
    </div>
  );
}