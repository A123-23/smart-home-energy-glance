import { useState } from "react";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnergyStatCard } from "./EnergyStatCard";
import { EnergyUsageChart } from "./EnergyUsageChart";
import { DeviceCard } from "./DeviceCard";
import { DataPoint, Device, EnergyStat } from "./types";

interface OverviewTabContentProps {
  stats: EnergyStat[];
  usageData: DataPoint[];
  devices: Device[];
  toggleDevice: (id: string, newState: boolean) => void;
  viewDeviceDetails: (id: string) => void;
}

export function OverviewTabContent({
  stats,
  usageData,
  devices,
  toggleDevice,
  viewDeviceDetails
}: OverviewTabContentProps) {
  const [showAllDevices, setShowAllDevices] = useState(false);
  const displayedDevices = showAllDevices ? devices : devices.slice(0, 3);

  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <EnergyStatCard 
            key={index}
            title={stat.title} 
            value={stat.value} 
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
            trendValue={stat.trendValue}
          />
        ))}
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
    </div>
  );
}
