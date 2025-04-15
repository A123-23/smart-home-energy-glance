
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeviceConnection, ConnectionConfig } from "./DeviceConnection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState("connection");

  const handleConnect = async (config: ConnectionConfig) => {
    console.log("Connecting with config:", config);
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsConnected(true);
    return true;
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-[400px]">
          <TabsTrigger value="connection">Connection</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connection" className="space-y-6 mt-6">
          <DeviceConnection 
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            isConnected={isConnected}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Connection Presets</CardTitle>
              <CardDescription>
                Quick configurations for common smart home systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col">
                  <span className="text-sm font-medium">Home Assistant</span>
                  <span className="text-xs text-muted-foreground mt-1">localhost:8123</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col">
                  <span className="text-sm font-medium">Smart Things</span>
                  <span className="text-xs text-muted-foreground mt-1">API Connection</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col">
                  <span className="text-sm font-medium">Philips Hue Bridge</span>
                  <span className="text-xs text-muted-foreground mt-1">Device Discovery</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="devices" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Device Management</CardTitle>
              <CardDescription>
                Add, remove, and configure your connected devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                {isConnected ? (
                  <p>Your devices will appear here after connecting.</p>
                ) : (
                  <p>Please connect to your smart home system first.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Preferences</CardTitle>
              <CardDescription>
                Customize your dashboard experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Preference settings will be available in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
