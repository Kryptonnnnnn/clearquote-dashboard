import React, { ReactNode } from "react";
import { C } from "./styles";

type Col<T> = { header: string; cell: (row: T) => ReactNode; width?: string; };

export default function Table<T>({ columns, data, empty="No results" }: { columns: Col<T>[]; data: T[]; empty?: string }) {
  return (
    <div style={{ background: C.surface, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", tableLayout:"fixed" }}>
        <thead>
          <tr style={{ borderBottom:`1px solid ${C.border}` }}>
            {columns.map((c,i) => (
              <th key={i} style={{
                textAlign:"left",
                fontSize:11, fontWeight:600,
                color: C.textMuted,
                textTransform:"uppercase",
                letterSpacing:"0.07em",
                padding:"10px 14px",
                width: c.width,
              }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length===0
            ? <tr><td colSpan={columns.length} style={{ textAlign:"center", padding:32, color: C.textMuted, fontSize:13 }}>{empty}</td></tr>
            : data.map((row,ri) => (
              <tr key={ri} style={{ borderBottom:`1px solid ${C.borderLight}` }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background="#fafafa"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background="transparent"}
              >
                {columns.map((c,ci) => (
                  <td key={ci} style={{ padding:"10px 14px", fontSize:13, color: C.text, verticalAlign:"middle", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {c.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
