import React from "react";
import { C } from "./styles";

type Color = "default"|"danger"|"warning"|"success";
type Props = { label: string; value: string|number; sub?: string; color?: Color };

const valColor: Record<Color,string> = {
  default: C.text,
  danger:  C.red,
  warning: C.amber,
  success: C.green,
};

export default function KpiCard({ label, value, sub, color="default" }: Props) {
  return (
    <div style={{
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "14px 16px",
    }}>
      <p style={{ fontSize:11, fontWeight:600, color: C.textMuted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>
        {label}
      </p>
      <p style={{ fontSize:24, fontWeight:600, color: valColor[color], letterSpacing:"-0.5px", lineHeight:1 }}>
        {value}
      </p>
      {sub && <p style={{ fontSize:11, color: C.textMuted, marginTop:4 }}>{sub}</p>}
    </div>
  );
}
