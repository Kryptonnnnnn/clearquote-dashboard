import React from "react";
import fleetRaw from "../data/fleet.json";
import customersRaw from "../data/customers.json";
import KpiCard from "../components/KpiCard";
import Table from "../components/Table";
import { C, S } from "../components/styles";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const fleet: any[] = fleetRaw;
const customers: any[] = customersRaw;
const COLORS = [C.brand, C.amber, C.blue, C.green, "#7c3aed","#db2777"];

function countBy(arr: any[], key: string) {
  const m: Record<string,number> = {};
  arr.forEach(x=>{ m[x[key]]=(m[x[key]]??0)+1; });
  return Object.entries(m).sort((a,b)=>b[1]-a[1]);
}

function ProvList({ entries }: { entries: [string,number][] }) {
  const total = entries.reduce((s,e)=>s+e[1],0);
  return (
    <div>
      {entries.map(([name,count],i)=>(
        <div key={name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${C.borderLight}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ width:8,height:8,borderRadius:"50%",background:COLORS[i],display:"inline-block",flexShrink:0 }}/>
            <span style={{ fontSize:13, color: C.textSub }}>{name}</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:60, height:6, background: C.borderLight, borderRadius:3, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${(count/total)*100}%`, background: COLORS[i], borderRadius:3 }}/>
            </div>
            <span style={{ fontSize:12, fontFamily:"monospace", color: C.textMuted, minWidth:24 }}>{count}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FleetPage() {
  const totalV = fleet.reduce((s,f)=>s+f.vehicles,0);
  const avgAge = (fleet.reduce((s,f)=>s+f.age,0)/fleet.length).toFixed(1);
  const avgEv  = Math.round(fleet.reduce((s,f)=>s+f.ev,0)/fleet.length);
  const numTel = new Set(fleet.map(f=>f.telem)).size;

  const vtypes  = countBy(fleet,"vtype").map(([name,value])=>({ name, value }));
  const telems  = countBy(fleet,"telem");
  const fmsList = countBy(fleet,"fms");
  const ages = [
    { range:"<2yr",  count:fleet.filter(f=>f.age<2).length },
    { range:"2–4yr", count:fleet.filter(f=>f.age>=2&&f.age<4).length },
    { range:"4–6yr", count:fleet.filter(f=>f.age>=4&&f.age<6).length },
    { range:"6+yr",  count:fleet.filter(f=>f.age>=6).length },
  ];

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:16 }}>
        <KpiCard label="Total Vehicles"      value={`${(totalV/1000).toFixed(1)}k`} sub="across all customers"/>
        <KpiCard label="Avg Fleet Age"        value={`${avgAge} yr`} sub="weighted average"/>
        <KpiCard label="Avg EV Adoption"      value={`${avgEv}%`} sub="+5pp YoY" color="success"/>
        <KpiCard label="Telematics Providers" value={numTel} sub="unique platforms"/>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
        <div style={{ ...S.card }}>
          <p style={{ ...S.sectionLabel }}>Vehicle Type Breakdown</p>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={vtypes} dataKey="value" nameKey="name" cx="40%" cy="50%" outerRadius={85} innerRadius={52} paddingAngle={3}
                label={({ name, percent })=>`${name} ${Math.round(percent*100)}%`} labelLine={false}>
                {vtypes.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ ...S.card }}>
          <p style={{ ...S.sectionLabel }}>Telematics Providers</p>
          <ProvList entries={telems}/>
        </div>
        <div style={{ ...S.card }}>
          <p style={{ ...S.sectionLabel }}>FMS Platforms</p>
          <ProvList entries={fmsList}/>
        </div>
        <div style={{ ...S.card }}>
          <p style={{ ...S.sectionLabel }}>Fleet Age Distribution</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ages}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight}/>
              <XAxis dataKey="range" tick={{ fontSize:11, fill: C.textMuted }}/>
              <YAxis tick={{ fontSize:11, fill: C.textMuted }} allowDecimals={false}/>
              <Tooltip/>
              <Bar dataKey="count" fill={C.brand} fillOpacity={0.7} radius={[4,4,0,0]} name="Customers"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p style={{ ...S.sectionLabel }}>Fleet by Customer</p>
      <Table data={fleet} columns={[
        { header:"Customer",    width:"16%", cell:(f:any)=><span style={{ fontWeight:500 }}>{customers.find(c=>c.id===f.cid)?.name}</span> },
        { header:"Vehicle Type",width:"12%", cell:(f:any)=><span style={{ color: C.textSub }}>{f.vtype}</span> },
        { header:"Fleet Size",  width:"10%", cell:(f:any)=><span style={{ fontFamily:"monospace" }}>{f.vehicles.toLocaleString()}</span> },
        { header:"Avg Age",     width:"9%",  cell:(f:any)=><span style={{ fontFamily:"monospace" }}>{f.age.toFixed(1)} yr</span> },
        { header:"Telematics",  width:"12%", cell:(f:any)=><span style={{ color: C.textSub }}>{f.telem}</span> },
        { header:"FMS",         width:"10%", cell:(f:any)=><span style={{ color: C.textSub }}>{f.fms}</span> },
        { header:"EV %",        width:"16%", cell:(f:any)=>(
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontFamily:"monospace", fontSize:12, minWidth:30, color: C.textSub }}>{f.ev}%</span>
            <div style={{ flex:1, height:6, background: C.borderLight, borderRadius:3, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${f.ev}%`, background:f.ev>25?C.green:C.brand, borderRadius:3 }}/>
            </div>
          </div>
        )},
      ]}/>
    </div>
  );
}
