import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  HelpCircle, Lightbulb, ImageIcon, BookOpen,
  Plus, X, ArrowUp, Pin, ChevronRight, Upload
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'qa',
    label: 'Q&A / Come fare per...',
    description: 'Chiedi aiuto su configurazione agenti, connessione database, e tutto ciò che non ti torna.',
    icon: HelpCircle,
    color: 'blue',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/8',
    iconColor: 'text-blue-400',
    badgeBg: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
  },
  {
    id: 'ideas',
    label: 'Idee & Suggerimenti SaaS',
    description: 'Proponi nuove funzionalità, modelli di business, integrazioni o miglioramenti che vorresti vedere.',
    icon: Lightbulb,
    color: 'yellow',
    border: 'border-yellow-500/20',
    bg: 'bg-yellow-500/8',
    iconColor: 'text-yellow-400',
    badgeBg: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
  },
  {
    id: 'showcase',
    label: 'Showcase / Condividi i tuoi risultati',
    description: 'Incolla screenshot di grafici o analisi di intelligence che NEXUS ha generato sui tuoi dati.',
    icon: ImageIcon,
    color: 'purple',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/8',
    iconColor: 'text-purple-400',
    badgeBg: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
  },
];

function getCat(id) {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
}

// ── New Post Modal ────────────────────────────────────────────────────────────
function NewPostModal({ defaultCategory, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: defaultCategory || 'qa',
    author_name: '',
    image_url: '',
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm(f => ({ ...f, image_url: file_url }));
    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    onSubmit(form);
  };

  const cat = getCat(form.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-white font-semibold text-sm">Nuovo post</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Category picker */}
          <div>
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-2">Categoria</label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(c => (
                <button key={c.id} type="button" onClick={() => setForm(f => ({ ...f, category: c.id }))}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                    form.category === c.id ? c.badgeBg : 'border-white/8 text-white/30 hover:text-white/60'
                  }`}>
                  <c.icon className="w-3 h-3" />
                  {c.label.split('/')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Author */}
          <div>
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-1.5">Il tuo nome (opzionale)</label>
            <Input value={form.author_name} onChange={e => setForm(f => ({ ...f, author_name: e.target.value }))}
              placeholder="Anonimo" className="bg-white/5 border-white/8 text-white placeholder:text-white/20 h-9 text-sm" />
          </div>

          {/* Title */}
          <div>
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-1.5">Titolo *</label>
            <Input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Descrivi brevemente..." className="bg-white/5 border-white/8 text-white placeholder:text-white/20 h-9 text-sm" />
          </div>

          {/* Content */}
          <div>
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-1.5">Messaggio *</label>
            <Textarea required value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              placeholder="Scrivi qui..." className="bg-white/5 border-white/8 text-white placeholder:text-white/20 min-h-[100px] text-sm resize-none" />
          </div>

          {/* Image upload (showcase only) */}
          {form.category === 'showcase' && (
            <div>
              <label className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-1.5">Screenshot (opzionale)</label>
              {form.image_url ? (
                <div className="relative rounded-lg overflow-hidden border border-purple-500/20">
                  <img src={form.image_url} alt="preview" className="w-full max-h-40 object-cover" />
                  <button type="button" onClick={() => setForm(f => ({ ...f, image_url: '' }))}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white/70">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label className={`flex items-center gap-2 px-4 py-3 rounded-lg border border-dashed border-purple-500/20 bg-purple-500/5 cursor-pointer hover:bg-purple-500/10 transition-colors ${uploading ? 'opacity-50' : ''}`}>
                  <Upload className="w-4 h-4 text-purple-400/60" />
                  <span className="text-xs text-purple-400/60">{uploading ? 'Uploading...' : 'Carica immagine'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onClose} className="text-white/40 hover:text-white text-xs h-9">Annulla</Button>
            <Button type="submit" className={`flex-1 h-9 text-xs text-white ${cat.color === 'blue' ? 'bg-blue-600 hover:bg-blue-500' : cat.color === 'yellow' ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-purple-600 hover:bg-purple-500'}`}>
              Pubblica post
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ── Post Card ─────────────────────────────────────────────────────────────────
function PostCard({ post, onUpvote }) {
  const cat = getCat(post.category);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border ${cat.border} bg-white/2 hover:bg-white/4 transition-all p-5`}>
      <div className="flex items-start gap-3">
        {/* Upvote */}
        <button onClick={() => onUpvote(post)}
          className="flex flex-col items-center gap-0.5 pt-0.5 text-white/20 hover:text-blue-400 transition-colors shrink-0">
          <ArrowUp className="w-4 h-4" />
          <span className="text-[10px] font-mono">{post.upvotes || 0}</span>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {post.pinned && <Pin className="w-3 h-3 text-yellow-400/60" />}
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${cat.badgeBg}`}>
              <cat.icon className="w-2.5 h-2.5 inline mr-1" />
              {cat.label.split('/')[0].trim()}
            </span>
            <span className="text-[10px] text-white/20 font-mono">{post.author_name || 'Anonimo'}</span>
          </div>
          <h3 className="text-white/85 text-sm font-semibold leading-snug mb-1">{post.title}</h3>
          <p className="text-white/40 text-xs leading-relaxed line-clamp-3">{post.content}</p>
          {post.image_url && (
            <div className="mt-3 rounded-lg overflow-hidden border border-white/8 max-h-48">
              <img src={post.image_url} alt="showcase" className="w-full object-cover max-h-48" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Community() {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalCategory, setModalCategory] = useState('qa');

  useEffect(() => {
    loadPosts();
  }, [activeCategory]);

  const loadPosts = async () => {
    const filter = activeCategory ? { category: activeCategory } : {};
    const result = await base44.entities.CommunityPost.filter(filter, '-upvotes', 50);
    setPosts(result);
  };

  const handleNewPost = (categoryId) => {
    setModalCategory(categoryId);
    setShowModal(true);
  };

  const handleSubmit = async (form) => {
    await base44.entities.CommunityPost.create({ ...form, upvotes: 0 });
    setShowModal(false);
    loadPosts();
  };

  const handleUpvote = async (post) => {
    await base44.entities.CommunityPost.update(post.id, { upvotes: (post.upvotes || 0) + 1 });
    loadPosts();
  };

  const filteredPosts = activeCategory ? posts.filter(p => p.category === activeCategory) : posts;

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
            <span className="text-white font-bold text-base tracking-tight">NEXUS</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-white/40 hover:text-white text-xs h-8">Dashboard</Button>
            </Link>
            <Link to="/quick-start">
              <Button variant="ghost" className="text-white/40 hover:text-white gap-1.5 text-xs h-8">
                <BookOpen className="w-3.5 h-3.5" /> Quick Start
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Community Alpha</h1>
          <p className="text-white/40 text-sm">Spazio riservato ai tester. Fai domande, condividi idee, mostra i tuoi risultati.</p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {CATEGORIES.map((cat) => {
            const count = posts.filter(p => p.category === cat.id).length;
            const isActive = activeCategory === cat.id;
            return (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl border p-5 cursor-pointer transition-all ${
                  isActive ? `${cat.border} ${cat.bg}` : 'border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10'
                }`}
                onClick={() => setActiveCategory(isActive ? null : cat.id)}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${cat.bg} border ${cat.border}`}>
                    <cat.icon className={`w-4 h-4 ${cat.iconColor}`} />
                  </div>
                  <span className="text-[10px] font-mono text-white/20">{count} post</span>
                </div>
                <h3 className="text-white/80 text-sm font-semibold mb-1 leading-snug">{cat.label}</h3>
                <p className="text-white/30 text-[11px] leading-relaxed">{cat.description}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNewPost(cat.id); }}
                  className={`mt-4 flex items-center gap-1.5 text-[11px] font-medium ${cat.iconColor} hover:opacity-80 transition-opacity`}>
                  <Plus className="w-3 h-3" /> Nuovo post
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            {activeCategory && (
              <button onClick={() => setActiveCategory(null)}
                className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors">
                <X className="w-3 h-3" /> Tutti
              </button>
            )}
            <span className="text-xs font-mono text-white/20">
              {filteredPosts.length} post {activeCategory ? `in "${getCat(activeCategory).label.split('/')[0].trim()}"` : 'totali'}
            </span>
          </div>
          <Button onClick={() => { setModalCategory(activeCategory || 'qa'); setShowModal(true); }}
            className="bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white gap-1.5 text-xs h-8">
            <Plus className="w-3.5 h-3.5" /> Nuovo post
          </Button>
        </div>

        {/* Posts */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 text-white/20">
                <p className="text-sm">Nessun post ancora.</p>
                <p className="text-xs mt-1 font-mono">Sii il primo a scrivere!</p>
              </div>
            ) : (
              filteredPosts.map(post => (
                <PostCard key={post.id} post={post} onUpvote={handleUpvote} />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <NewPostModal defaultCategory={modalCategory} onClose={() => setShowModal(false)} onSubmit={handleSubmit} />
        )}
      </AnimatePresence>
    </div>
  );
}