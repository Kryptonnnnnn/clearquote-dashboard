export type HealthStatus = "Healthy" | "Warning" | "At Risk";
export type Tier = "Enterprise" | "Growth" | "Starter";
export type Trend = "up" | "down" | "flat";
export type Priority = "High" | "Medium" | "Low";
export type TicketStatus = "Open" | "Resolved" | "Pending";
export type Channel = "Email" | "Slack" | "Phone" | "In-app";
export type VehicleType = "Van" | "Truck" | "Mixed";

export interface Customer {
  id: number;
  name: string;
  tier: Tier;
  mrr: number;
  csm: string;
  state: string;
  city: string;
  lat: number;
  lng: number;
  health: HealthStatus;
}

export interface Usage {
  cid: number;
  inspections: number;
  drivers: number;
  damage: number;
  api: number;
  trend: Trend;
}

export interface MonthlyUsage {
  month: string;
  inspections: number;
  damageRate: number;
  apiCalls: number;
}

export interface Ticket {
  id: string;
  cid: number;
  customer: string;
  issue: string;
  priority: Priority;
  channel: Channel;
  status: TicketStatus;
  age: number;
  csat: number | null;
}

export interface Fleet {
  cid: number;
  vehicles: number;
  vtype: VehicleType;
  age: number;
  telem: string;
  fms: string;
  ev: number;
}