
import { LucideIcon } from "lucide-react";

export interface DataPoint {
  name: string;
  value: number;
  total: number;
  devices: number;
  hvac: number;
  [key: string]: any;
}

export interface Device {
  id: string;
  name: string;
  icon: LucideIcon;
  isOn: boolean;
  powerUsage: number;
  location?: string;
  status: "normal" | "high" | "low" | "idle";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "warning" | "info" | "alert" | "success";
  isRead: boolean;
}
