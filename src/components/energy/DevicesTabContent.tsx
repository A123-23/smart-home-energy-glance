
import { Button } from "@/components/ui/button";
import { DeviceCard } from "./DeviceCard";
import { Device } from "./types";

interface DevicesTabContentProps {
  devices: Device[];
  toggleDevice: (id: string, newState: boolean) => void;
  viewDeviceDetails: (id: string) => void;
}

export function DevicesTabContent({
  devices,
  toggleDevice,
  viewDeviceDetails
}: DevicesTabContentProps) {
  return (
    <div className="space-y-6 mt-6">
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
    </div>
  );
}
