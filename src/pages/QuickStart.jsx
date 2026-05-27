import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Download, ChevronDown, ChevronUp, Shield, Zap, AlertTriangle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testDataset = {
  persons: [
    { name: "Alexei Volkov", type: "Person", scenario: "Mid-level executive, suspected shell company ties", expected: "MEDIUM-HIGH risk" },
    { name: "Sarah Chen", type: "Person", scenario: "Tech startup founder, clean profile", expected: "LOW risk" },
    { name: "Marco Delgado", type: "Person", scenario: "Political figure, offshore accounts reported", expected: "HIGH risk" }
  ],
  organizations: [
    { name: "Meridian Capital Partners", type: "Organization", scenario: "Investment fund, multiple jurisdictions", expected: "MEDIUM risk" },
    { name: "Solaris Dynamics Ltd", type: "Organization", scenario: "Defense contractor, sanctioned country exposure", expected: "CRITICAL risk" },
    { name: "GreenPath Foundation", type: "Organization", scenario: "NGO, transparent structure", expected: "LOW risk" }
  ],
  domains: [
    { name: "meridian-cap.io", type: "Domain", scenario: "Recently registered, privacy-protected WHOIS", expected: "MEDIUM-HIGH risk" },
    { name: "solarisdyn.com", type: "Domain", scenario: "Associated with flagged organization", expected: "HIGH risk" },
    { name: "greenpath.org", type: "Domain", scenario: "Long-standing domain, clean history", expected: "LOW risk" }
  ]
};

function Section({ title, icon: Icon, color, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-white/8 rounded-xl overflow-hidden mb-4">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 bg-white/3 hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-sm">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
      </button>
      {open && <div className="p-5 border-t border-white/5">{children}</div>}
    </div>
  );
}

function DatasetTable({ items }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/5">
          <span className="text-xs font-mono text-blue-400 w-4 mt-0.5">{i + 1}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white text-sm font-semibold">{item.name}</span>
              <span className="text-[10px] font-mono text-white/30 border border-white/10 rounded px-1.5 py-0.5">{item.type}</span>
            </div>
            <p className="text-xs text-white/40">{item.scenario}</p>
          </div>
          <span className="text-[10px] font-mono text-blue-300/70 bg-blue-500/10 border border-blue-500/15 rounded px-2 py-1 shrink-0">{item.expected}</span>
        </div>
      ))}
    </div>
  );
}

export default function QuickStart() {
  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(testDataset, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nexus_test_dataset_v1.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCSV = () => {
    const all = [...testDataset.persons, ...testDataset.organizations, ...testDataset.domains];
    const csv = ['name,type,scenario,expected_risk\n', ...all.map(r => `"${r.name}","${r.type}","${r.scenario}","${r.expected}"\n`)].join('');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nexus_test_dataset_v1.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#060810] text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500 rounded-lg rotate-45 opacity-80" />
              <div className="absolute inset-1 bg-[#060810] rounded-md rotate-45" />
              <div className="absolute inset-2 bg-blue-400/60 rounded-sm rotate-45" />
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-tight">NEXUS</span>
              <span className="text-white/30 text-xs font-mono ml-2">// QUICK START GUIDE v0.1-alpha</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Tester Quick Start</h1>
          <p className="text-white/50 text-base leading-relaxed">
            Guida di 1 pagina per i tester Alpha. Leggi prima di iniziare.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/5">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-xs font-mono text-yellow-400 tracking-wider">ALPHA BUILD — NOT FOR PUBLIC DISTRIBUTION</span>
          </div>
        </motion.div>

        {/* COSA FA */}
        <Section title="Cosa fa NEXUS (v0.1 Alpha)" icon={CheckCircle2} color="bg-green-500/20" defaultOpen={true}>
          <div className="space-y-3">
            {[
              { label: 'Entity Intelligence Search', desc: 'Inserisci un nome (persona, organizzazione, dominio) e ottieni un profilo intelligence strutturato con risk score, connessioni chiave e red flag.' },
              { label: 'Risk Scoring automatico', desc: 'NEXUS assegna un punteggio di rischio 0-100 e una classificazione (LOW / MEDIUM / HIGH / CRITICAL) basata su fonti pubbliche.' },
              { label: 'Relationship Mapping (base)', desc: 'Identifica le connessioni principali dell\'entità analizzata.' },
              { label: 'Source Attribution', desc: 'Ogni profilo include i tipi di fonti pubbliche consultate.' },
              { label: 'Search History', desc: 'Le ricerche vengono salvate per sessione, consultabili nella dashboard.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-white text-sm font-semibold">{item.label}</span>
                  <p className="text-white/40 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* COSA NON FA */}
        <Section title="Cosa NON fa ancora (fuori perimetro)" icon={XCircle} color="bg-red-500/20" defaultOpen={true}>
          <div className="space-y-3">
            {[
              'Upload di file propri (CSV, PDF, database) — non ancora supportato',
              'Grafi visivi delle relazioni — in roadmap, non disponibile in v0.1',
              'Alert e monitoraggio continuo — solo ricerca on-demand',
              'Accesso a database proprietari o fonti riservate — solo OSINT pubblico',
              'Multi-utente / team workspace — sessione singola per ora',
              'Export PDF / report formattati — in roadmap',
              'Integrazione API esterna — non disponibile in alpha',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-400/70 mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* COME TESTARE */}
        <Section title="Come testare — 5 passi" icon={Zap} color="bg-blue-500/20" defaultOpen={true}>
          <ol className="space-y-4">
            {[
              { step: '01', title: 'Vai alla Dashboard', desc: 'Clicca su "Launch Intelligence Platform" dalla home.' },
              { step: '02', title: 'Seleziona il tipo di entità', desc: 'Scegli tra Person, Organization, o Domain.' },
              { step: '03', title: 'Inserisci il nome', desc: 'Usa i soggetti del Dataset di Test standard qui sotto, o prova con nomi noti pubblicamente.' },
              { step: '04', title: 'Analizza i risultati', desc: 'Controlla risk score, red flags, e key connections. Valuta se la risposta è accurata, pertinente, e utile.' },
              { step: '05', title: 'Segnala il feedback', desc: 'Usa il form di feedback (👍/👎) accanto a ogni risultato e aggiungi note testuali. Ogni segnalazione è preziosa.' },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="text-2xl font-bold font-mono text-blue-500/30 w-8 shrink-0">{item.step}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                  <p className="text-white/40 text-xs mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* LIMITI NOTI */}
        <Section title="Limiti noti (bugs attesi)" icon={AlertTriangle} color="bg-yellow-500/20">
          <div className="space-y-2">
            {[
              'I tempi di risposta possono variare da 5 a 30 secondi — è normale in alpha',
              'Per entità molto poco note, il profilo può essere generico o ipotetico',
              'Il risk score è indicativo, non certificato — non usare per decisioni operative reali',
              'In caso di errore, refresha e riprova — i retry automatici non sono ancora implementati',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                <AlertTriangle className="w-3.5 h-3.5 text-yellow-400/70 mt-0.5 shrink-0" />
                <span className="text-white/50 text-xs">{item}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* DATASET */}
        <Section title="Dataset di Test Standard — v1" icon={BookOpen} color="bg-purple-500/20" defaultOpen={true}>
          <p className="text-white/40 text-xs mb-5 leading-relaxed">
            Usa questi 9 soggetti per standardizzare i tuoi test. Coprono i 3 tipi di entità con range di rischio diversi.
            L'"expected risk" è il risultato atteso — se NEXUS diverge significativamente, segnalalo.
          </p>

          <h4 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">Persons</h4>
          <DatasetTable items={testDataset.persons} />

          <h4 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3 mt-5">Organizations</h4>
          <DatasetTable items={testDataset.organizations} />

          <h4 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3 mt-5">Domains</h4>
          <DatasetTable items={testDataset.domains} />

          <div className="flex gap-3 mt-6 pt-5 border-t border-white/5">
            <Button onClick={handleDownloadJSON} className="bg-blue-600 hover:bg-blue-500 text-white gap-2 text-xs h-9">
              <Download className="w-3.5 h-3.5" /> Download JSON
            </Button>
            <Button onClick={handleDownloadCSV} variant="outline" className="border-white/10 text-white/70 hover:text-white gap-2 text-xs h-9">
              <Download className="w-3.5 h-3.5" /> Download CSV
            </Button>
          </div>
        </Section>

        {/* CONTACT */}
        <div className="mt-8 p-5 rounded-xl border border-white/5 bg-white/3 text-center">
          <p className="text-white/30 text-xs font-mono">NEXUS Alpha Program · World Industries</p>
          <a href="mailto:enterprise@nexus-wi.com" className="text-blue-400/70 text-xs hover:text-blue-400 transition-colors mt-1 block">
            enterprise@nexus-wi.com
          </a>
          <p className="text-white/15 text-[10px] mt-3 font-mono">CONFIDENTIAL — DO NOT DISTRIBUTE — © {new Date().getFullYear()} World Industries</p>
        </div>
      </div>
    </div>
  );
}