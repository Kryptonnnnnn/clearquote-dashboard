import React from "react";
import { C } from "./styles";

type Tab = "overview"|"usage"|"support"|"fleet";
type Props = { activeTab: Tab; setTab: (t: Tab) => void };
const TABS: Tab[] = ["overview","usage","support","fleet"];

export default function Navbar({ activeTab, setTab }: Props) {
  return (
    <header style={{
      position:"sticky", top:0, zIndex:100,
      background: C.surface,
      borderBottom: `1px solid ${C.border}`,
      height: 52,
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"0 24px",
    }}>
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <div style={{
          width:28, height:28, borderRadius:7,
          background: C.brand,
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <svg viewBox="0 0 14 14" fill="none" width={14} height={14}>
            <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5"/>
            <path d="M5 7l1.5 1.5L9 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{ fontSize:15, fontWeight:600, color: C.text, letterSpacing:"-0.3px" }}>
          ClearQuote CS
        </span>
      </div>

      {/* Tabs */}
      <nav style={{ display:"flex", gap:4 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding:"6px 14px",
            borderRadius:8,
            border:"none",
            cursor:"pointer",
            fontSize:13,
            fontWeight:500,
            fontFamily:"inherit",
            textTransform:"capitalize",
            background: activeTab===t ? C.brand : "transparent",
            color: activeTab===t ? "#fff" : C.textSub,
            transition:"all 0.15s",
          }}
          onMouseEnter={e => { if(activeTab!==t)(e.target as HTMLElement).style.background="#f3f4f6"; }}
          onMouseLeave={e => { if(activeTab!==t)(e.target as HTMLElement).style.background="transparent"; }}
          >
            {t}
          </button>
        ))}
      </nav>

      <span style={{ fontSize:12, color: C.textMuted, fontFamily:"'DM Mono', monospace" }}>
        Apr 28, 2026
      </span>
    </header>
  );
}
