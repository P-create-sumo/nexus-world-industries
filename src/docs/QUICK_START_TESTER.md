# NEXUS — Quick Start Guide per Tester Alpha
> **CONFIDENTIAL — Alpha Program v0.1 — Non distribuire pubblicamente**

---

## Cos'è NEXUS

NEXUS è una piattaforma di intelligence aziendale che mappa relazioni nascoste, automatizza investigazioni complesse e fornisce insight basati su AI. In questa versione Alpha, il focus è sull'**Entity Intelligence Search**: inserisci un nome e ottieni un profilo di intelligence strutturato.

---

## ✅ Cosa fa NEXUS (v0.1 Alpha)

| Funzionalità | Descrizione |
|---|---|
| **Entity Intelligence Search** | Inserisci un nome (persona, organizzazione, dominio) e ottieni un profilo intelligence strutturato |
| **Risk Scoring automatico** | Punteggio 0–100 + classificazione LOW / MEDIUM / HIGH / CRITICAL |
| **Relationship Mapping (base)** | Identifica le connessioni principali dell'entità analizzata |
| **Source Attribution** | Ogni profilo include i tipi di fonti pubbliche consultate |
| **Search History** | Le ricerche vengono salvate e consultabili nella dashboard |
| **Feedback integrato** | Pollice su/giù su ogni risultato per segnalare accuratezza |

---

## ❌ Cosa NON fa ancora (fuori perimetro v0.1)

- Upload di file propri (CSV, PDF, database)
- Grafi visivi delle relazioni
- Alert e monitoraggio continuo (solo ricerca on-demand)
- Accesso a database proprietari o fonti riservate (solo OSINT pubblico)
- Multi-utente / team workspace
- Export PDF / report formattati
- Integrazione API esterna
- Retry automatici in caso di errore

---

## 🚀 Come testare — 5 passi

**01. Vai alla Dashboard**
Clicca su "Launch Intelligence Platform" dalla home, oppure naviga direttamente su `/dashboard`.

**02. Seleziona il tipo di entità**
Scegli tra **Person**, **Organization**, o **Domain** usando i bottoni nella search bar.

**03. Inserisci il nome**
Usa i soggetti del Dataset di Test Standard (vedi sezione dedicata), oppure prova con nomi noti pubblicamente. Per i domini, inserisci solo il dominio (es. `meridian-cap.io`).

**04. Analizza i risultati**
Controlla:
- **Risk Score** (0–100) e **Risk Level** (LOW/MEDIUM/HIGH/CRITICAL)
- **Executive Summary** — sintesi dell'entità
- **Red Flags** — indicatori di rischio identificati
- **Key Connections** — connessioni chiave note
- **Sources** — tipi di fonti pubbliche consultate

**05. Segnala il feedback**
Usa i bottoni 👍 / 👎 accanto a ogni risultato. Se il risultato è significativamente sbagliato, segnala nella sezione **Community > Q&A**.

---

## ⚠️ Limiti noti (bugs attesi)

- I tempi di risposta variano da **5 a 30 secondi** — normale in alpha
- Per entità molto poco note, il profilo può essere **generico o ipotetico**
- Il risk score è **indicativo**, non certificato — non usare per decisioni operative reali
- In caso di errore, **refresha e riprova** — i retry automatici non sono ancora implementati
- Le analisi si basano su **OSINT pubblico**, non su fonti riservate

---

## 🗂️ Dataset di Test Standard — v1

Usa questi 9 soggetti per standardizzare i test. Coprono i 3 tipi di entità con range di rischio diversi. L'"Expected Risk" è il risultato atteso — se NEXUS diverge significativamente, segnalalo.

### Persons

| Nome | Scenario | Expected Risk |
|---|---|---|
| Alexei Volkov | Mid-level executive, suspected shell company ties | MEDIUM–HIGH |
| Sarah Chen | Tech startup founder, clean profile | LOW |
| Marco Delgado | Political figure, offshore accounts reported | HIGH |

### Organizations

| Nome | Scenario | Expected Risk |
|---|---|---|
| Meridian Capital Partners | Investment fund, multiple jurisdictions | MEDIUM |
| Solaris Dynamics Ltd | Defense contractor, sanctioned country exposure | CRITICAL |
| GreenPath Foundation | NGO, transparent structure | LOW |

### Domains

| Nome | Scenario | Expected Risk |
|---|---|---|
| meridian-cap.io | Recently registered, privacy-protected WHOIS | MEDIUM–HIGH |
| solarisdyn.com | Associated with flagged organization | HIGH |
| greenpath.org | Long-standing domain, clean history | LOW |

---

## 💬 Community Alpha

Per domande, idee e condivisione risultati: naviga su `/community`.

- **Q&A / Come fare per...** — problemi tecnici e configurazione
- **Idee & Suggerimenti SaaS** — nuove funzionalità e modelli di business
- **Showcase / Condividi i tuoi risultati** — screenshot e analisi riuscite

---

## 📬 Contatti

**Email:** enterprise@nexus-wi.com  
**Programma:** NEXUS Alpha — World Industries

---

*© 2025 World Industries. Tutti i diritti riservati. CONFIDENTIAL.*