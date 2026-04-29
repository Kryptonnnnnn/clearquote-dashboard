import React from "react";
import { C } from "./styles";

type Opt = { value: string; label: string };
type Sel = { value: string; onChange: (v: string) => void; options: Opt[] };

const inputStyle: React.CSSProperties = {
  height: 34, padding:"0 12px",
  border:`1px solid ${C.border}`,
  borderRadius:8, background: C.surface,
  fontSize:13, color: C.text,
  outline:"none", fontFamily:"inherit",
};

export default function FilterBar({
  search, setSearch, selects=[], placeholder="Search..."
}: {
  search: string; setSearch: (v:string)=>void; selects?: Sel[]; placeholder?: string;
}) {
  return (
    <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
      <input value={search} onChange={e=>setSearch(e.target.value)}
        placeholder={placeholder}
        style={{ ...inputStyle, flex:1, minWidth:180 }}
        onFocus={e=>(e.target as HTMLElement).style.borderColor=C.brand}
        onBlur={e=>(e.target as HTMLElement).style.borderColor=C.border}
      />
      {selects.map((s,i) => (
        <select key={i} value={s.value} onChange={e=>s.onChange(e.target.value)}
          style={{
            ...inputStyle, padding:"0 28px 0 10px",
            appearance:"none",
            backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23888' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat:"no-repeat",
            backgroundPosition:"right 8px center",
            cursor:"pointer",
          }}
        >
          {s.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ))}
    </div>
  );
}
