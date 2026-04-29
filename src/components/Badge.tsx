import React from "react";
import { C, S } from "./styles";

type HealthStatus = "Healthy"|"Warning"|"At Risk";
type Tier = "Enterprise"|"Growth"|"Starter";
type Priority = "High"|"Medium"|"Low";
type TicketStatus = "Open"|"Resolved"|"Pending";

export function HealthBadge({ status }: { status: HealthStatus }) {
  const map: Record<HealthStatus,[string,string]> = {
    Healthy:  [C.greenBg, C.greenTx],
    Warning:  [C.amberBg, C.amberTx],
    "At Risk":[C.redBg,   C.redTx],
  };
  return <span style={S.badge(map[status][0], map[status][1])}>{status}</span>;
}

export function TierBadge({ tier }: { tier: Tier }) {
  const map: Record<Tier,[string,string]> = {
    Enterprise: [C.violetBg, C.violetTx],
    Growth:     [C.blueBg,   C.blueTx],
    Starter:    [C.borderLight, C.textSub],
  };
  return <span style={S.badge(map[tier][0], map[tier][1])}>{tier}</span>;
}

export function PriBadge({ p }: { p: Priority }) {
  const map: Record<Priority,[string,string]> = {
    High:   [C.redBg,   C.redTx],
    Medium: [C.amberBg, C.amberTx],
    Low:    [C.borderLight, C.textSub],
  };
  return <span style={S.badge(map[p][0], map[p][1])}>{p}</span>;
}

export function StatusBadge({ s }: { s: TicketStatus }) {
  const map: Record<TicketStatus,[string,string]> = {
    Open:     [C.blueBg,  C.blueTx],
    Resolved: [C.greenBg, C.greenTx],
    Pending:  [C.amberBg, C.amberTx],
  };
  return <span style={S.badge(map[s][0], map[s][1])}>{s}</span>;
}

export function CsatStars({ score }: { score: number|null }) {
  if (!score) return <span style={{ color: C.textMuted, fontSize:12 }}>—</span>;
  return (
    <span style={{ color:"#f59e0b", fontSize:13, letterSpacing:-1 }}>
      {"★".repeat(score)}{"☆".repeat(5-score)}
    </span>
  );
}
