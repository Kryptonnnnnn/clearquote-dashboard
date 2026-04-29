# 🚀 ClearQuote CS Dashboard

Internal Customer Success Dashboard — Product Analyst Assignment

---

## 📋 Overview

A browser-based internal dashboard for the **ClearQuote Customer Success team**.

This project replaces disconnected spreadsheets with a **single unified interface** to monitor:

* Customer health
* Product usage
* Support activity
* Fleet distribution

Built using **30 fictional last-mile delivery fleets across the US**.

---

## ⚡ Live Demo

👉 https://clearquote-dashboard-r3m3.vercel.app/

---

## 🚀 Quick Start

### Prerequisites

* Node.js (v18+)
* npm (v8+)

### Installation

```bash
# Clone the repo
git clone https://github.com/kryptonnnnnn/clearquote-dashboard.git

# Navigate into project
cd clearquote-dashboard

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open 👉 http://localhost:5173

---

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

---

## 🗂️ Project Structure

```
clearquote-dashboard/
│
├── index.html
├── package.json
├── tsconfig.json
│
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── types.ts
    │
    ├── components/
    │   ├── styles.ts
    │   ├── Navbar.tsx
    │   ├── KpiCard.tsx
    │   ├── Badge.tsx
    │   ├── FilterBar.tsx
    │   ├── Table.tsx
    │   └── USMap.tsx
    │
    ├── data/
    │   ├── customers.json
    │   ├── usage.json
    │   ├── monthly.json
    │   ├── tickets.json
    │   └── fleet.json
    │
    ├── pages/
    │   ├── Overview.tsx
    │   ├── Usage.tsx
    │   ├── Support.tsx
    │   └── Fleet.tsx
    │
    └── utils/
        └── dataHelpers.ts
```

---

## 📊 Features

### 🧩 1. Customer Overview

* KPI metrics (MRR, customers, risk)
* Health classification (Healthy / Warning / At Risk)
* Search + filterable table
* Interactive US map (D3 + TopoJSON)

---

### 📈 2. Usage Metrics

* Monthly inspections trend
* Damage rate %
* Active drivers chart
* API usage trend

---

### 🎧 3. Support Dashboard

* Ticket table with:

  * Priority
  * Status
  * Channel
  * CSAT
* Aging alerts (>7 days highlighted)

---

### 🚚 4. Fleet Analytics

* Vehicle type distribution (Pie chart)
* Telematics providers
* Fleet age breakdown
* EV adoption %

---

## 🛠️ Tech Stack

| Layer      | Tech                     |
| ---------- | ------------------------ |
| Frontend   | React + TypeScript       |
| Build Tool | Vite                     |
| Charts     | Recharts                 |
| Map        | D3 + TopoJSON            |
| Styling    | Tailwind / Inline styles |
| Data       | Static JSON              |

---

## 📦 Data Model

All data is stored locally in `/src/data`

```
customers.json  ──┬──► usage.json
                  ├──► tickets.json
                  └──► fleet.json
```

* Joined using `customer_id`
* Fully client-side (no backend)

---

## 🧠 Health Score Logic

```text
Base score = 100

↓ Usage trend        → -30
> 3 open tickets     → -25
CSAT < 3             → -20
```

| Score Range | Status     |
| ----------- | ---------- |
| > 70        | 🟢 Healthy |
| 41–70       | 🟡 Warning |
| ≤ 40        | 🔴 At Risk |

---

## 📁 Deliverables

* Source code (this repo)
* PRD Document (included PDF)

---

## 🗺️ Future Improvements

* Google SSO authentication
* Real backend integration
* Customer drill-down modal
* Slack/email alerts
* Export to CSV/PDF

---

## ⚠️ Notes

* Designed for **Product Analyst assignment**
* Focus on **data clarity + usability**
* No backend required

---
