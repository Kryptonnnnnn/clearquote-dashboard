import React from "react";
import usageRaw from "../data/usage.json";
import monthlyRaw from "../data/monthly.json";
import customersRaw from "../data/customers.json";
import KpiCard from "../components/KpiCard";
import Table from "../components/Table";
import { C, S } from "../components/styles";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const usage: any[] = usageRaw;
const monthly: any[] = monthlyRaw;
const customers: any[] = customersRaw;

const top8 = [...usage].sort((a,b)=>b.drivers-a.drivers).slice(0,8).map(u=>({
  name: customers.find(c=>c.id===u.cid)?.name ?? "",
  drivers: u.drivers,
}));

const chartCard = (title: string, children: React.ReactNode) => (
  <div style={{ ...S.card }}>
    <p style={{ ...S.sectionLabel }}>{title}</p>
    {children}
  </div>
);

export default function UsagePage() {
  const totalIns = usage.reduce((s,u)=>s+u.inspections,0);
  const avgDrv   = Math.round(usage.reduce((s,u)=>s+u.drivers,0)/usage.length);
  const avgDmg   = (usage.reduce((s,u)=>s+u.damage,0)/usage.length).toFixed(1);
  const totalApi = usage.reduce((s,u)=>s+u.api,0);

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:16 }}>
        <KpiCard label="Inspections (Apr)" value={`${(totalIns/1000).toFixed(1)}k`} sub="across all customers"/>
        <KpiCard label="Avg Active Drivers" value={avgDrv} sub="per customer" color="success"/>
        <KpiCard label="Avg Damage Rate" value={`${avgDmg}%`} sub="+0.4pp MoM" color="warning"/>
        <KpiCard label="Total API Calls" value={`${(totalApi/1000).toFixed(0)}k`} sub="this month"/>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
        {chartCard("Monthly Inspections",
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight}/>
              <XAxis dataKey="month" tick={{ fontSize:10, fill: C.textMuted }} interval={2}/>
              <YAxis tick={{ fontSize:10, fill: C.textMuted }} tickFormatter={v=>`${(v/1000).toFixed(0)}k`}/>
              <Tooltip formatter={(v:number)=>[v.toLocaleString(),"Inspections"]}/>
              <Line type="monotone" dataKey="inspections" stroke={C.brand} strokeWidth={2} dot={{ r:3, fill: C.brand }} activeDot={{ r:5 }}/>
            </LineChart>
          </ResponsiveContainer>
        )}
        {chartCard("Damage Rate %",
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight}/>
              <XAxis dataKey="month" tick={{ fontSize:10, fill: C.textMuted }} interval={2}/>
              <YAxis tick={{ fontSize:10, fill: C.textMuted }} tickFormatter={v=>`${v}%`} domain={[2,4.5]}/>
              <Tooltip formatter={(v:number)=>[`${v}%`,"Damage Rate"]}/>
              <Line type="monotone" dataKey="damageRate" stroke={C.amber} strokeWidth={2} dot={{ r:3, fill: C.amber }} activeDot={{ r:5 }}/>
            </LineChart>
          </ResponsiveContainer>
        )}
        {chartCard("Active Drivers Per Customer",
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={top8}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight}/>
              <XAxis dataKey="name" tick={{ fontSize:9, fill: C.textMuted }} angle={-20} textAnchor="end" height={40}/>
              <YAxis tick={{ fontSize:10, fill: C.textMuted }}/>
              <Tooltip/>
              <Bar dataKey="drivers" fill={C.blue} fillOpacity={0.75} radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        )}
        {chartCard("API Usage Trend",
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight}/>
              <XAxis dataKey="month" tick={{ fontSize:10, fill: C.textMuted }} interval={2}/>
              <YAxis tick={{ fontSize:10, fill: C.textMuted }} tickFormatter={v=>`${v}k`}/>
              <Tooltip formatter={(v:number)=>[`${v}k`,"API Calls"]}/>
              <Bar dataKey="apiCalls" fill={C.green} fillOpacity={0.75} radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <p style={{ ...S.sectionLabel }}>Customer Usage Detail</p>
      <Table data={usage} columns={[
        { header:"Customer",      width:"18%", cell:(u:any)=><span style={{ fontWeight:500 }}>{customers.find(c=>c.id===u.cid)?.name}</span> },
        { header:"Inspections/mo",width:"15%", cell:(u:any)=><span style={{ fontFamily:"monospace" }}>{u.inspections.toLocaleString()}</span> },
        { header:"Active Drivers",width:"14%", cell:(u:any)=><span style={{ fontFamily:"monospace" }}>{u.drivers}</span> },
        { header:"Damage Rate",   width:"12%", cell:(u:any)=><span style={{ fontFamily:"monospace", color:u.damage>4?C.red:u.damage>3.5?C.amber:C.text }}>{u.damage.toFixed(1)}%</span> },
        { header:"API Calls",     width:"12%", cell:(u:any)=><span style={{ fontFamily:"monospace" }}>{(u.api/1000).toFixed(0)}k</span> },
        { header:"Trend",         width:"10%", cell:(u:any)=><span style={{ fontSize:16, color:u.trend==="up"?C.green:u.trend==="down"?C.red:C.textMuted }}>{u.trend==="up"?"↑":u.trend==="down"?"↓":"→"}</span> },
      ]}/>
    </div>
  );
}
