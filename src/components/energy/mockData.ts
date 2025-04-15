
import {
  BarChart4,
  Lightbulb,
  Home,
  Wind,
  Refrigerator,
  Tv,
  Wifi,
  PersonStanding,
  Gauge,
  Droplets,
} from "lucide-react";
import { DataPoint, Device, Notification } from "./types";

// Mock data for energy usage chart
export const usageData: DataPoint[] = [
  { name: "12 AM", value: 0.2, total: 0.2, devices: 0.2, hvac: 0 },
  { name: "3 AM", value: 0.1, total: 0.1, devices: 0.1, hvac: 0 },
  { name: "6 AM", value: 0.3, total: 0.3, devices: 0.2, hvac: 0.1 },
  { name: "9 AM", value: 1.2, total: 1.2, devices: 0.7, hvac: 0.5 },
  { name: "12 PM", value: 1.5, total: 1.5, devices: 0.9, hvac: 0.6 },
  { name: "3 PM", value: 1.3, total: 1.3, devices: 0.8, hvac: 0.5 },
  { name: "6 PM", value: 2.0, total: 2.0, devices: 1.2, hvac: 0.8 },
  { name: "9 PM", value: 1.7, total: 1.7, devices: 1.2, hvac: 0.5 },
  { name: "Now", value: 1.2, total: 1.2, devices: 0.9, hvac: 0.3 },
];

// Mock data for devices
export const devices: Device[] = [
  {
    id: "1",
    name: "Living Room Lights",
    icon: Lightbulb,
    isOn: true,
    powerUsage: 60,
    location: "Living Room",
    status: "normal",
  },
  {
    id: "2",
    name: "Smart TV",
    icon: Tv,
    isOn: false,
    powerUsage: 120,
    location: "Living Room",
    status: "idle",
  },
  {
    id: "3",
    name: "HVAC System",
    icon: Wind,
    isOn: true,
    powerUsage: 850,
    location: "Whole House",
    status: "high",
  },
  {
    id: "4",
    name: "Refrigerator",
    icon: Refrigerator,
    isOn: true,
    powerUsage: 150,
    location: "Kitchen",
    status: "normal",
  },
  {
    id: "5",
    name: "WiFi Router",
    icon: Wifi,
    isOn: true,
    powerUsage: 15,
    location: "Home Office",
    status: "low",
  },
  {
    id: "6",
    name: "Water Heater",
    icon: Droplets,
    isOn: true,
    powerUsage: 350,
    location: "Utility Room",
    status: "normal",
  },
];

// Mock data for notifications
export const notifications: Notification[] = [
  {
    id: "1",
    title: "High Energy Consumption",
    message: "Your HVAC system is consuming more energy than usual.",
    time: "15 min ago",
    type: "warning",
    isRead: false
  },
  {
    id: "2",
    title: "Energy Saving Tip",
    message: "Consider lowering your thermostat by 2°F to save up to 5% on heating costs.",
    time: "2 hours ago",
    type: "info",
    isRead: false
  },
  {
    id: "3",
    title: "Device Offline",
    message: "Your Smart Thermostat is offline. Please check the connection.",
    time: "Yesterday",
    type: "alert",
    isRead: true
  },
  {
    id: "4",
    title: "Energy Goal Achieved",
    message: "Congratulations! You've reached your weekly energy saving goal.",
    time: "2 days ago",
    type: "success",
    isRead: true
  },
];

// Energy stats for the dashboard
export const energyStats = [
  {
    title: "Today's Usage",
    value: "8.3 kWh",
    description: "21% less than yesterday",
    icon: Gauge,
    trend: "down",
    trendValue: "21%",
  },
  {
    title: "Current Draw",
    value: "1.2 kW",
    description: "From 6 active devices",
    icon: BarChart4,
    trend: "neutral",
    trendValue: "Active",
  },
  {
    title: "Est. Daily Cost",
    value: "$2.41",
    description: "Based on your current usage",
    icon: Home,
    trend: "down",
    trendValue: "$0.45",
  },
  {
    title: "Carbon Footprint",
    value: "3.2 kg",
    description: "CO₂ emissions today",
    icon: PersonStanding,
    trend: "down",
    trendValue: "15%",
  },
];
