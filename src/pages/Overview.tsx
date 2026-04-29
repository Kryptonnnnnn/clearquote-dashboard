import React, { useState, useMemo } from "react";
import customersRaw from "../data/customers.json";
import usageRaw from "../data/usage.json";
import ticketsRaw from "../data/tickets.json";
import KpiCard from "../components/KpiCard";
import { HealthBadge, TierBadge } from "../components/Badge";
import FilterBar from "../components/FilterBar";
import Table from "../components/Table";
import USMap from "../components/USMap";
import { C, S } from "../components/styles";
import { initials, formatMrr } from "../utils/dataHelpers"; // ✅ FIXED

const customers: any[] = customersRaw;
const usage: any[] = usageRaw;
const tickets: any[] = ticketsRaw;
const HEALTH_ORD: any = { Healthy:0, Warning:1, "At Risk":2 };

export default function Overview() {
  const [search, setSearch] = useState("");
  const [fHealth, setFHealth] = useState("");
  const [fTier, setFTier] = useState("");
  const [fCsm, setFCsm] = useState("");
  const [sort, setSort] = useState("mrr-desc");

  const atRisk = customers.filter(c=>c.health==="At Risk").length;
  const warning = customers.filter(c=>c.health==="Warning").length;
  const healthy = customers.filter(c=>c.health==="Healthy").length;
  const totalMrr = customers.reduce((s,c)=>s+c.mrr,0);
  const usageDrop = usage.filter(u=>u.trend==="down").length;
  const openHigh = tickets.filter(t=>t.status==="Open"&&t.priority==="High").length;
  const csms = useMemo(()=>Array.from(new Set(customers.map(c=>c.csm))).sort(),[]);

  const filtered = useMemo(()=>{
    let d = customers.filter(c=>{
      const q=search.toLowerCase();
      return (!q||c.name.toLowerCase().includes(q)||c.city.toLowerCase().includes(q))
        &&(!fHealth||c.health===fHealth)&&(!fTier||c.tier===fTier)&&(!fCsm||c.csm===fCsm);
    });
    if(sort==="mrr-desc") d.sort((a,b)=>b.mrr-a.mrr);
    else if(sort==="mrr-asc") d.sort((a,b)=>a.mrr-b.mrr);
    else if(sort==="name") d.sort((a,b)=>a.name.localeCompare(b.name));
    else d.sort((a,b)=>HEALTH_ORD[a.health]-HEALTH_ORD[b.health]);
    return d;
  },[search,fHealth,fTier,fCsm,sort]);

  return (
    <div>
      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10, marginBottom:16 }}>
        <KpiCard label="Customers" value={customers.length} sub="across 18 states"/>
        <KpiCard label="Total MRR" value={`$${(totalMrr/1000).toFixed(0)}k`} sub="+8% vs last month" color="success"/>
        <KpiCard label="At Risk" value={atRisk} sub="need attention" color="danger"/>
        <KpiCard label="Warning" value={warning} sub="monitor closely" color="warning"/>
        <KpiCard label="Healthy" value={healthy} sub="on track" color="success"/>
        <KpiCard label="Avg CSAT" value="4.1" sub="out of 5"/>
      </div>

      {/* Alert chips */}
      <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
        {[
          { dot: C.red,   text:`${atRisk} at-risk customers` },
          { dot: C.amber, text:`${openHigh} high-priority tickets` },
          { dot: C.blue,  text:`${usageDrop} usage drops this month` },
        ].map((a,i)=>(
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:7,
            background: C.surface, border:`1px solid ${C.border}`,
            borderRadius:8, padding:"6px 12px",
            fontSize:12, fontWeight:500, color: C.textSub,
          }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:a.dot }} />
            {a.text}
          </div>
        ))}
      </div>

      {/* Map */}
      <div style={{ ...S.card, marginBottom:16 }}>
        <p style={{ ...S.sectionLabel }}>Customer Locations</p>
        <USMap customers={customers}/>
      </div>

      {/* Filters */}
      <FilterBar
        search={search}
        setSearch={setSearch}
        placeholder="Search customers..."
        selects={[
          { value:fHealth, onChange:setFHealth, options:[
            {value:"",label:"All Health"},
            {value:"Healthy",label:"Healthy"},
            {value:"Warning",label:"Warning"},
            {value:"At Risk",label:"At Risk"}
          ]},
          { value:fTier, onChange:setFTier, options:[
            {value:"",label:"All Tiers"},
            {value:"Enterprise",label:"Enterprise"},
            {value:"Growth",label:"Growth"},
            {value:"Starter",label:"Starter"}
          ]},
          { value:fCsm, onChange:setFCsm, options:[
            {value:"",label:"All CSMs"},
            ...csms.map(c=>({value:c,label:c}))
          ]},
          { value:sort, onChange:setSort, options:[
            {value:"mrr-desc",label:"MRR High→Low"},
            {value:"mrr-asc",label:"MRR Low→High"},
            {value:"name",label:"Name A→Z"},
            {value:"health",label:"Health"}
          ]},
        ]}
      />

      {/* Table */}
      <Table
        data={filtered}
        empty="No customers match filters"
        columns={[
          {
            header:"Customer",
            width:"22%",
            cell:(c:any)=>(
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{
                  width:30,height:30,borderRadius:"50%",
                  background: C.brandBg, color: C.brand,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:11,fontWeight:600
                }}>
                  {initials(c.name)}
                </div>
                <div>
                  <div style={{ fontWeight:500 }}>{c.name}</div>
                  <div style={{ fontSize:11, color: C.textMuted }}>
                    {c.city}, {c.state}
                  </div>
                </div>
              </div>
            )
          },
          { header:"Tier", width:"12%", cell:(c:any)=><TierBadge tier={c.tier}/> },
          {
            header:"MRR",
            width:"10%",
            cell:(c:any)=>(
              <span style={{ fontFamily:"monospace" }}>
                {formatMrr(c.mrr)} {/* ✅ FIXED */}
              </span>
            )
          },
          { header:"CSM", width:"12%", cell:(c:any)=><span>{c.csm}</span> },
          { header:"Location", width:"18%", cell:(c:any)=><span>{c.city}, {c.state}</span> },
          { header:"Health", width:"12%", cell:(c:any)=><HealthBadge status={c.health}/> },
        ]}
      />
    </div>
  );
}