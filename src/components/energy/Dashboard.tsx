
import { useState } from "react";
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
  ChevronDown,
  ChevronUp,
  BellRing,
  Settings,
  AlertTriangle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { EnergyStatCard } from "./EnergyStatCard";
import { EnergyUsageChart } from "./EnergyUsageChart";
import { DeviceCard } from "./DeviceCard";
import { NotificationItem } from "./NotificationItem";

// Mock data for energy usage chart
const usageData = [
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
const devices = [
  {
    id: "1",
    name: "Living Room Lights",
    icon: Lightbulb,
    isOn: true,
    powerUsage: 60,
    location: "Living Room",
    status: "normal" as const,
  },
  {
    id: "2",
    name: "Smart TV",
    icon: Tv,
    isOn: false,
    powerUsage: 120,
    location: "Living Room",
    status: "idle" as const,
  },
  {
    id: "3",
    name: "HVAC System",
    icon: Wind,
    isOn: true,
    powerUsage: 850,
    location: "Whole House",
    status: "high" as const,
  },
  {
    id: "4",
    name: "Refrigerator",
    icon: Refrigerator,
    isOn: true,
    powerUsage: 150,
    location: "Kitchen",
    status: "normal" as const,
  },
  {
    id: "5",
    name: "WiFi Router",
    icon: Wifi,
    isOn: true,
    powerUsage: 15,
    location: "Home Office",
    status: "low" as const,
  },
  {
    id: "6",
    name: "Water Heater",
    icon: Droplets,
    isOn: true,
    powerUsage: 350,
    location: "Utility Room",
    status: "normal" as const,
  },
];

// Mock data for notifications
const notifications = [
  {
    id: "1",
    title: "High Energy Consumption",
    message: "Your HVAC system is consuming more energy than usual.",
    time: "15 min ago",
    type: "warning" as const,
    isRead: false
  },
  {
    id: "2",
    title: "Energy Saving Tip",
    message: "Consider lowering your thermostat by 2°F to save up to 5% on heating costs.",
    time: "2 hours ago",
    type: "info" as const,
    isRead: false
  },
  {
    id: "3",
    title: "Device Offline",
    message: "Your Smart Thermostat is offline. Please check the connection.",
    time: "Yesterday",
    type: "alert" as const,
    isRead: true
  },
  {
    id: "4",
    title: "Energy Goal Achieved",
    message: "Congratulations! You've reached your weekly energy saving goal.",
    time: "2 days ago",
    type: "success" as const,
    isRead: true
  },
];

export function Dashboard() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAllDevices, setShowAllDevices] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const displayedDevices = showAllDevices ? devices : devices.slice(0, 3);
  
  const toggleDevice = (id: string, newState: boolean) => {
    console.log(`Device ${id} toggled to ${newState ? 'ON' : 'OFF'}`);
    // In a real app, this would update state and possibly call an API
  };
  
  const viewDeviceDetails = (id: string) => {
    console.log(`View details for device ${id}`);
    // In a real app, this would navigate to a device details page
  };
  
  const markNotificationAsRead = (id: string) => {
    console.log(`Mark notification ${id} as read`);
    // In a real app, this would update the notification state
  };

  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Energy Dashboard</h1>
          <p className="text-muted-foreground">Monitor and optimize your home energy usage</p>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="relative"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <BellRing className="h-4 w-4 mr-2" />
            Notifications
            <Badge className="ml-1 bg-energy-blue text-white">{notifications.filter(n => !n.isRead).length}</Badge>
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Settings className="h-4 w-4" />
          </Button>
          
          {notificationsOpen && (
            <div className="absolute right-4 sm:right-6 top-[120px] sm:top-[85px] z-50 bg-background border rounded-lg shadow-lg w-[95%] sm:w-[380px] overflow-hidden">
              <div className="p-3 border-b flex justify-between items-center">
                <h3 className="font-medium">Notifications</h3>
                <Button variant="ghost" size="sm">Mark all as read</Button>
              </div>
              <ScrollArea className="h-[350px]">
                {notifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    {...notification}
                    onMarkAsRead={markNotificationAsRead}
                  />
                ))}
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <EnergyStatCard 
              title="Today's Usage" 
              value="8.3 kWh" 
              description="21% less than yesterday"
              icon={Gauge}
              trend="down"
              trendValue="21%"
            />
            <EnergyStatCard 
              title="Current Draw" 
              value="1.2 kW" 
              description="From 6 active devices"
              icon={BarChart4}
              trend="neutral"
              trendValue="Active"
            />
            <EnergyStatCard 
              title="Est. Daily Cost" 
              value="$2.41" 
              description="Based on your current usage"
              icon={Home}
              trend="down"
              trendValue="$0.45"
            />
            <EnergyStatCard 
              title="Carbon Footprint" 
              value="3.2 kg" 
              description="CO₂ emissions today"
              icon={PersonStanding}
              trend="down"
              trendValue="15%"
            />
          </div>
          
          <EnergyUsageChart 
            title="Today's Energy Consumption"
            data={usageData}
            lines={[
              { dataKey: "total", stroke: "#2563EB", fill: "#60A5FA" },
              { dataKey: "devices", stroke: "#059669", fill: "#34D399" },
              { dataKey: "hvac", stroke: "#D97706", fill: "#FBBF24" }
            ]}
            timeRange="day"
          />
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Active Devices</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAllDevices(!showAllDevices)}
              >
                {showAllDevices ? "Show Less" : "Show All"}
                {showAllDevices ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedDevices.map(device => (
                <DeviceCard
                  key={device.id}
                  {...device}
                  onToggle={toggleDevice}
                  onViewDetails={viewDeviceDetails}
                />
              ))}
            </div>
          </div>
          
          <div className="energy-card p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-energy-yellow-light/30">
                <AlertTriangle className="h-4 w-4 text-energy-yellow" />
              </div>
              <div>
                <h4 className="font-medium">Energy Saving Recommendation</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Your HVAC system is running at high consumption. Consider increasing the temperature
                  by 2°F to save approximately $15.40 this month.
                </p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="bg-energy-green hover:bg-energy-green-dark">Apply Now</Button>
                  <Button size="sm" variant="outline">Remind Later</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="devices" className="space-y-6 mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">All Devices</h3>
              <Button size="sm">Add Device</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {devices.map(device => (
                <DeviceCard
                  key={device.id}
                  {...device}
                  onToggle={toggleDevice}
                  onViewDetails={viewDeviceDetails}
                />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-6 mt-6">
          <div className="energy-card p-6">
            <h3 className="text-lg font-semibold mb-4">Energy Insights</h3>
            <p className="text-muted-foreground mb-6">
              Analyze your energy consumption patterns and discover opportunities to save.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Peak Usage Times</h4>
                <p className="text-sm text-muted-foreground">
                  Your energy consumption peaks between 6-8 PM daily. Consider scheduling high-consumption
                  activities outside these hours to save on energy costs.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Biggest Energy Consumers</h4>
                <p className="text-sm text-muted-foreground">
                  Your HVAC system and refrigerator consume 60% of your total energy. Consider
                  upgrading to more energy-efficient models or optimizing their usage.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Savings Opportunities</h4>
                <ul className="space-y-2 mt-3">
                  <li className="flex items-start gap-2">
                    <div className="p-1 rounded-full bg-energy-green-light mt-0.5">
                      <ChevronDown className="h-3 w-3 text-energy-green" />
                    </div>
                    <p className="text-sm">Lower thermostat by 2°F (saves ~$15/month)</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="p-1 rounded-full bg-energy-green-light mt-0.5">
                      <ChevronDown className="h-3 w-3 text-energy-green" />
                    </div>
                    <p className="text-sm">Switch to LED bulbs in living room (saves ~$5/month)</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="p-1 rounded-full bg-energy-green-light mt-0.5">
                      <ChevronDown className="h-3 w-3 text-energy-green" />
                    </div>
                    <p className="text-sm">Use smart power strips for electronics (saves ~$8/month)</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
