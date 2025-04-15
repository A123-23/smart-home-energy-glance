
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "./DashboardHeader";
import { OverviewTabContent } from "./OverviewTabContent";
import { DevicesTabContent } from "./DevicesTabContent";
import { InsightsTabContent } from "./InsightsTabContent";
import { SettingsPage } from "./SettingsPage";
import { energyStats, usageData, devices, notifications } from "./mockData";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSettings, setShowSettings] = useState(false);
  
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

  if (showSettings) {
    return <SettingsPage onBack={() => setShowSettings(false)} />;
  }

  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto p-4 sm:p-6 space-y-6">
      <DashboardHeader 
        notifications={notifications}
        onShowSettings={() => setShowSettings(true)}
        markNotificationAsRead={markNotificationAsRead}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <OverviewTabContent 
            stats={energyStats}
            usageData={usageData}
            devices={devices}
            toggleDevice={toggleDevice}
            viewDeviceDetails={viewDeviceDetails}
          />
        </TabsContent>
        
        <TabsContent value="devices">
          <DevicesTabContent 
            devices={devices}
            toggleDevice={toggleDevice}
            viewDeviceDetails={viewDeviceDetails}
          />
        </TabsContent>
        
        <TabsContent value="insights">
          <InsightsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
