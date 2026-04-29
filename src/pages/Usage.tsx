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

const top8 = [...usage]
  .sort((a, b) => b.drivers - a.drivers)
  .slice(0, 8)
  .map(u => ({
    name: customers.find(c => c.id === u.cid)?.name ?? "",
    drivers: u.drivers,
  }));

const chartCard = (title: string, children: React.ReactNode) => (
  <div style={{ ...S.card }}>
    <p style={{ ...S.sectionLabel }}>{title}</p>
    {children}
  </div>
);

export default function UsagePage() {
  const totalIns = usage.reduce((s, u) => s + u.inspections, 0);
  const avgDrv = Math.round(usage.reduce((s, u) => s + u.drivers, 0) / usage.length);
  const avgDmg = (usage.reduce((s, u) => s + u.damage, 0) / usage.length).toFixed(1);
  const totalApi = usage.reduce((s, u) => s + u.api, 0);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
        <KpiCard label="Inspections (Apr)" value={`${(totalIns / 1000).toFixed(1)}k`} sub="across all customers" />
        <KpiCard label="Avg Active Drivers" value={avgDrv} sub="per customer" color="success" />
        <KpiCard label="Avg Damage Rate" value={`${avgDmg}%`} sub="+0.4pp MoM" color="warning" />
        <KpiCard label="Total API Calls" value={`${(totalApi / 1000).toFixed(0)}k`} sub="this month" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        
        {chartCard("Monthly Inspections",
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: C.textMuted }} />
              <YAxis tickFormatter={(v: any) => `${((v ?? 0) / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any) => [`${v ?? 0}`, "Inspections"]} />
              <Line type="monotone" dataKey="inspections" stroke={C.brand} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}

        {chartCard("Damage Rate %",
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v: any) => `${v ?? 0}%`} />
              <Tooltip formatter={(v: any) => [`${v ?? 0}%`, "Damage Rate"]} />
              <Line type="monotone" dataKey="damageRate" stroke={C.amber} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}

        {chartCard("Active Drivers",
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={top8}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="drivers" fill={C.blue} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartCard("API Usage",
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v: any) => [`${v ?? 0}k`, "API Calls"]} />
              <Bar dataKey="apiCalls" fill={C.green} />
            </BarChart>
          </ResponsiveContainer>
        )}

      </div>

      <p style={{ ...S.sectionLabel }}>Customer Usage Detail</p>

      <Table data={usage} columns={[
        {
          header: "Customer",
          cell: (u: any) => customers.find(c => c.id === u.cid)?.name
        },
        {
          header: "Drivers",
          cell: (u: any) => u.drivers
        }
      ]} />
    </div>
  );
}