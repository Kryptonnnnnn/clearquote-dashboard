ClearQuote CS Dashboard

Internal Customer Success Dashboard — ClearQuote Product Analyst

Show Image Show Image Show Image Show Image

📋 Overview
A browser-based internal dashboard for the ClearQuote Customer Success team. Replaces disconnected spreadsheets with a single, unified view of customer health, product usage, support activity, and fleet data — across 30 fictional last-mile delivery fleets in the US.

🚀 Quick Start
Prerequisites

Node.js v18 or higher
npm v8 or higher

Installation
bash# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/clearquote-dashboard.git

# 2. Navigate into the project
cd clearquote-dashboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
Then open http://localhost:5173 in your browser.
Build for Production
bashnpm run build
npm run preview

🗂️ Folder Structure
clearquote-dashboard/
│
├── index.html                  # App entry point
├── package.json
├── vite.config.ts
├── tsconfig.json
│
└── src/
    ├── main.tsx                # React root
    ├── App.tsx                 # Tab routing
    ├── types.ts                # TypeScript interfaces
    │
    ├── components/
    │   ├── styles.ts           # Design tokens (colors, shared styles)
    │   ├── Navbar.tsx          # Top navigation bar
    │   ├── KpiCard.tsx         # Summary metric cards
    │   ├── Badge.tsx           # Health / Tier / Priority / Status badges
    │   ├── FilterBar.tsx       # Search + dropdown filters
    │   ├── Table.tsx           # Reusable data table
    │   └── USMap.tsx           # D3 + TopoJSON interactive US map
    │
    ├── data/
    │   ├── customers.json      # 30 customer records
    │   ├── usage.json          # Per-customer usage metrics
    │   ├── monthly.json        # 15 months of aggregate trends
    │   ├── tickets.json        # 20 support tickets
    │   └── fleet.json          # Fleet composition per customer
    │
    ├── pages/
    │   ├── Overview.tsx        # Tab 1 — Customer overview + map
    │   ├── Usage.tsx           # Tab 2 — Usage metrics + charts
    │   ├── Support.tsx         # Tab 3 — Support tickets + CSAT
    │   └── Fleet.tsx           # Tab 4 — Fleet distribution
    │
    └── utils/
        └── helpers.ts          # Shared utility functions

📌 Features
Tab 1 · Customer Overview

KPI strip — total customers, MRR, at-risk count, health breakdown
Interactive US map with color-coded customer pins (hover for details)
Filterable customer table — search by name, filter by health / tier / CSM, sort by MRR or status
Health badges — Healthy / Warning / At Risk

Tab 2 · Usage Metrics

15-month monthly inspections line chart
Damage rate % trend line
Active drivers bar chart (top 8 customers)
API usage trend
Per-customer usage detail table with trend arrows

Tab 3 · Support & Comms

Full ticket list with ID, issue, priority, channel, status, age, CSAT
Age highlighted red when overdue (> 7 days)
Star rating CSAT display
Filter by priority / status / channel

Tab 4 · Fleet Distribution

Vehicle type donut chart (Van / Truck / Mixed)
Telematics provider breakdown with progress bars
FMS platform breakdown
Fleet age distribution bar chart
Per-customer fleet table with EV adoption % bar


🛠️ Tech Stack
LayerTechnologyFrameworkReact 18 + TypeScriptBuild toolVite 5ChartsRechartsMapD3 v7 + TopoJSONStylingInline styles with shared design tokens (styles.ts)DataStatic JSON (no backend required)

Why inline styles instead of Tailwind?
Tailwind requires a PostCSS compilation step. If that step fails silently (common in Vite setups), all styling disappears and you get raw unstyled HTML. Inline styles with a shared design token file guarantee correct rendering regardless of build config — and are equally maintainable at this codebase size.


📊 Data Model
All data lives in src/data/ as typed JSON. Tables are joined in the browser using customer_id as the foreign key.
customers.json  ──┬──► usage.json    (cid → id)
                  ├──► tickets.json  (cid → id)
                  └──► fleet.json    (cid → id)

monthly.json  (aggregate — no join needed)
FileRecordsPurposecustomers.json30Master customer list with health, tier, MRR, CSM, lat/lngusage.json30Per-customer inspection, driver, damage, API metricsmonthly.json15Aggregate monthly trend data (Feb 2025 – Apr 2026)tickets.json20Support tickets with priority, channel, status, CSATfleet.json30Vehicle type, telematics provider, FMS platform, EV %

🏥 Health Score Logic
Customer health is computed deterministically in the browser:
Base score: 100

Usage trend is "down"   →  −30 points
Open tickets > 3        →  −25 points
CSAT score < 3.0        →  −20 points

Score > 70  →  🟢 Healthy
Score 41–70 →  🟡 Warning
Score ≤ 40  →  🔴 At Risk

📁 Deliverables
FileDescriptionclearquote-dashboard-v2.zipFull source code (this repo)ClearQuote_CS_Dashboard_PRD.pdfProduct Requirements Document

📄 PRD Summary
The PRD (ClearQuote_CS_Dashboard_PRD.pdf) covers:

Problem statement and current-state analysis
Three user personas (CSM, CS Lead, Product Analyst)
MoSCoW prioritisation of all features
Data modelling decisions
Six explicit trade-offs with rationale
v2 roadmap
Success metrics


🗺️ Roadmap (v2)

 Google SSO — restrict access to @clearquote.io domain
 Real data integration — connect to CRM / product analytics APIs
 Customer drill-down modal — full account profile on click
 Slack / email alerts — notify CSM when health threshold crossed
 Export to CSV / PDF — one-click account health report
