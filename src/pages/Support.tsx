import React, { useState, useMemo } from "react";
import ticketsRaw from "../data/tickets.json";
import KpiCard from "../components/KpiCard";
import FilterBar from "../components/FilterBar";
import Table from "../components/Table";
import { PriBadge, StatusBadge, CsatStars } from "../components/Badge";
import { C } from "../components/styles";

const tickets: any[] = ticketsRaw;

export default function Support() {
  const [search, setSearch] = useState("");
  const [fPri,  setFPri]  = useState("");
  const [fStat, setFStat] = useState("");
  const [fChan, setFChan] = useState("");

  const openTickets = tickets.filter(t=>t.status==="Open").length;
  const highPri     = tickets.filter(t=>t.priority==="High").length;
  const avgAge      = (tickets.reduce((s,t)=>s+t.age,0)/tickets.length).toFixed(1);
  const withCsat    = tickets.filter(t=>t.csat!==null);
  const avgCsat     = withCsat.length ? (withCsat.reduce((s,t)=>s+(t.csat??0),0)/withCsat.length).toFixed(1) : "—";

  const filtered = useMemo(()=>tickets.filter(t=>{
    const q=search.toLowerCase();
    return (!q||t.customer.toLowerCase().includes(q)||t.issue.toLowerCase().includes(q)||t.id.toLowerCase().includes(q))
      &&(!fPri||t.priority===fPri)&&(!fStat||t.status===fStat)&&(!fChan||t.channel===fChan);
  }),[search,fPri,fStat,fChan]);

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:16 }}>
        <KpiCard label="Open Tickets"   value={openTickets} sub="across all customers" color="danger"/>
        <KpiCard label="High Priority"  value={highPri}     sub="need immediate action" color="warning"/>
        <KpiCard label="Avg Resolution" value={`${avgAge}d`} sub="days open"/>
        <KpiCard label="Avg CSAT"       value={avgCsat}     sub="out of 5" color="success"/>
      </div>

      <FilterBar search={search} setSearch={setSearch} placeholder="Search tickets, customers..."
        selects={[
          { value:fPri,  onChange:setFPri,  options:[{value:"",label:"All Priorities"},{value:"High",label:"High"},{value:"Medium",label:"Medium"},{value:"Low",label:"Low"}] },
          { value:fStat, onChange:setFStat, options:[{value:"",label:"All Status"},{value:"Open",label:"Open"},{value:"Resolved",label:"Resolved"},{value:"Pending",label:"Pending"}] },
          { value:fChan, onChange:setFChan, options:[{value:"",label:"All Channels"},{value:"Email",label:"Email"},{value:"Slack",label:"Slack"},{value:"Phone",label:"Phone"},{value:"In-app",label:"In-app"}] },
        ]}
      />

      <Table data={filtered} empty="No tickets match filters" columns={[
        { header:"ID",       width:"8%",  cell:(t:any)=><span style={{ fontFamily:"monospace", fontSize:12, color: C.textMuted }}>{t.id}</span> },
        { header:"Customer", width:"14%", cell:(t:any)=><span style={{ fontWeight:500 }}>{t.customer}</span> },
        { header:"Issue",    width:"24%", cell:(t:any)=><span style={{ color: C.textSub, whiteSpace:"normal" }}>{t.issue}</span> },
        { header:"Priority", width:"10%", cell:(t:any)=><PriBadge p={t.priority}/> },
        { header:"Channel",  width:"9%",  cell:(t:any)=><span style={{ color: C.textSub, fontSize:12 }}>{t.channel}</span> },
        { header:"Status",   width:"10%", cell:(t:any)=><StatusBadge s={t.status}/> },
        { header:"Age",      width:"7%",  cell:(t:any)=><span style={{ fontFamily:"monospace", fontSize:12, color:t.age>7?C.red:C.textSub, fontWeight:t.age>7?600:400 }}>{t.age}d</span> },
        { header:"CSAT",     width:"10%", cell:(t:any)=><CsatStars score={t.csat}/> },
      ]}/>
    </div>
  );
}
