# NEXUS — Enterprise Intelligence Platform

> **Transform raw data into operational intelligence at scale.**

NEXUS is an AI-powered entity intelligence platform built for organizations that need to map hidden relationships, automate complex investigations, and surface risk indicators from public sources — fast.

---

## 🖥️ Live Preview

> _Screenshots below reflect the current Alpha build (v0.1)_

| Dashboard | Intelligence Report | Community |
|---|---|---|
| ![Dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80) | ![Report](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80) | ![Community](https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80) |

---

## ✨ Features

### 🔍 Entity Intelligence Search
- Analyze any **Person**, **Organization**, or **Domain**
- AI-driven OSINT analysis powered by LLM + live web data
- Structured output in < 30 seconds

### 📊 Risk Scoring
- Automated risk score **0–100**
- 4-tier classification: `LOW` · `MEDIUM` · `HIGH` · `CRITICAL`
- Red flags, key connections, and source attribution included

### 🗂️ Search History
- Every analysis is saved and retrievable from the dashboard
- Filter by entity type, risk level, and date

### 💬 Community (Alpha)
- **Q&A** — troubleshooting and how-to questions
- **Ideas & SaaS Suggestions** — product feedback
- **Showcase** — share your results with the team

### 📖 Quick Start Guide
- Built-in tester guide at `/quick-start`
- Standardized test dataset (9 entities) for consistent UAT

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion |
| **UI Components** | shadcn/ui, Radix UI |
| **Backend / BaaS** | Base44 (entities, auth, backend functions) |
| **AI / LLM** | Base44 InvokeLLM (GPT-4o-mini + web search) |
| **State Management** | TanStack Query (React Query) |
| **Routing** | React Router v6 |

---

## 📁 Project Structure

```
nexus/
├── pages/
│   ├── Home.jsx          # Landing page & demo request form
│   ├── Dashboard.jsx     # Main intelligence search interface
│   ├── QuickStart.jsx    # Alpha tester guide
│   └── Community.jsx     # Community forum (Q&A / Ideas / Showcase)
├── components/
│   ├── intel/
│   │   ├── SearchForm.jsx        # Entity search input
│   │   └── IntelResultCard.jsx   # Intelligence report card
│   └── ui/               # shadcn/ui component library
├── functions/
│   └── entityIntelSearch.js  # Backend OSINT analysis function
├── entities/
│   ├── IntelSearch.json      # Search record schema
│   └── CommunityPost.json    # Community post schema
├── docs/
│   ├── QUICK_START_TESTER.md # UAT guide for alpha testers
│   ├── TEST_DATASET_v1.json  # Standard test dataset
│   └── TEST_DATASET_v1.csv   # Test dataset in CSV format
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Base44](https://base44.com) account (for BaaS features)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/nexus-platform.git
cd nexus-platform

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Environment

This project runs on the **Base44** platform. Authentication, database, and backend functions are managed by Base44's infrastructure — no additional environment variables are required for local development beyond the Base44 app configuration embedded in `src/lib/app-params.js`.

---

## 🧪 Testing (Alpha)

Use the standardized test dataset in `docs/TEST_DATASET_v1.json` for consistent UAT:

| Entity | Type | Expected Risk |
|---|---|---|
| Alexei Volkov | Person | HIGH |
| Sarah Chen | Person | LOW |
| Marco Delgado | Person | HIGH |
| Meridian Capital Partners | Organization | MEDIUM |
| Solaris Dynamics Ltd | Organization | CRITICAL |
| GreenPath Foundation | Organization | LOW |
| meridian-cap.io | Domain | MEDIUM |
| solarisdyn.com | Domain | HIGH |
| greenpath.org | Domain | LOW |

Full tester guide: [`docs/QUICK_START_TESTER.md`](./docs/QUICK_START_TESTER.md)

---

## 🔐 Security & Confidentiality

- This repository is **CONFIDENTIAL** — Alpha Program only
- Do not share access or results publicly
- All OSINT analysis is based on **publicly available data only**
- Risk scores are indicative and not certified for operational decisions

---

## 🗺️ Roadmap

- [ ] Visual relationship graph (D3.js / Three.js)
- [ ] Continuous monitoring & alerting
- [ ] Multi-user workspaces / team collaboration
- [ ] PDF report export
- [ ] API access for enterprise integrations
- [ ] Proprietary data source connectors

---

## 📬 Contact

**Enterprise:** enterprise@nexus-wi.com  
**Program:** NEXUS Alpha — World Industries

---

*© 2025 World Industries. All rights reserved. CONFIDENTIAL.*