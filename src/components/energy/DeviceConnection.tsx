
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, LinkIcon, Settings2, Wifi, ServerOff } from "lucide-react";

// Types for connection options
export type ConnectionMethod = "api" | "mqtt" | "homeassistant" | "zigbee";

export interface ConnectionConfig {
  method: ConnectionMethod;
  host: string;
  port: string;
  apiKey?: string;
  username?: string;
  password?: string;
  useSSL: boolean;
  autoReconnect: boolean;
}

// Initial config values
const defaultConfig: ConnectionConfig = {
  method: "api",
  host: "localhost",
  port: "8123",
  apiKey: "",
  username: "",
  password: "",
  useSSL: false,
  autoReconnect: true
};

export interface DeviceConnectionProps {
  onConnect?: (config: ConnectionConfig) => Promise<boolean>;
  onDisconnect?: () => void;
  isConnected?: boolean;
}

export function DeviceConnection({ 
  onConnect, 
  onDisconnect,
  isConnected = false
}: DeviceConnectionProps) {
  const [config, setConfig] = useState<ConnectionConfig>(defaultConfig);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      // In a real implementation, this would attempt to connect to the actual devices
      if (onConnect) {
        const success = await onConnect(config);
        if (success) {
          toast.success("Successfully connected to devices");
        } else {
          toast.error("Failed to connect to devices");
        }
      } else {
        // Simulate connection for demo purposes
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success("Connected to devices successfully");
      }
    } catch (error) {
      console.error("Connection error:", error);
      toast.error("Error connecting to devices");
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = () => {
    if (onDisconnect) {
      onDisconnect();
    } else {
      // Simulate disconnection for demo purposes
      toast.success("Disconnected from devices");
    }
  };

  const handleConfigChange = (key: keyof ConnectionConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Device Connection</CardTitle>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <div className="flex items-center text-energy-green">
                <Wifi className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Connected</span>
              </div>
            ) : (
              <div className="flex items-center text-muted-foreground">
                <ServerOff className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Disconnected</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="connection-method">Connection Method</Label>
            <Select 
              value={config.method} 
              onValueChange={(value: ConnectionMethod) => handleConfigChange("method", value)}
            >
              <SelectTrigger id="connection-method">
                <SelectValue placeholder="Select connection method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="api">REST API</SelectItem>
                <SelectItem value="mqtt">MQTT Broker</SelectItem>
                <SelectItem value="homeassistant">Home Assistant</SelectItem>
                <SelectItem value="zigbee">Zigbee Gateway</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="host">Host</Label>
              <Input 
                id="host" 
                value={config.host} 
                onChange={(e) => handleConfigChange("host", e.target.value)} 
                placeholder="Host address"
              />
            </div>
            <div>
              <Label htmlFor="port">Port</Label>
              <Input 
                id="port" 
                value={config.port} 
                onChange={(e) => handleConfigChange("port", e.target.value)} 
                placeholder="Port"
              />
            </div>
          </div>

          {config.method === "api" && (
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input 
                id="apiKey" 
                value={config.apiKey || ""} 
                onChange={(e) => handleConfigChange("apiKey", e.target.value)} 
                type="password"
                placeholder="API Key"
              />
            </div>
          )}

          {(config.method === "mqtt" || config.method === "homeassistant") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={config.username || ""} 
                  onChange={(e) => handleConfigChange("username", e.target.value)} 
                  placeholder="Username"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  value={config.password || ""} 
                  type="password"
                  onChange={(e) => handleConfigChange("password", e.target.value)} 
                  placeholder="Password"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="useSSL" className="cursor-pointer">Use SSL/TLS</Label>
              <Switch 
                id="useSSL" 
                checked={config.useSSL} 
                onCheckedChange={(checked) => handleConfigChange("useSSL", checked)} 
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoReconnect" className="cursor-pointer">Auto Reconnect</Label>
              <Switch 
                id="autoReconnect" 
                checked={config.autoReconnect} 
                onCheckedChange={(checked) => handleConfigChange("autoReconnect", checked)} 
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          {isConnected ? (
            <Button variant="destructive" onClick={handleDisconnect}>
              Disconnect
            </Button>
          ) : (
            <Button onClick={handleConnect} disabled={connecting}>
              {connecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Connect
                </>
              )}
            </Button>
          )}
          <Button variant="outline">
            <Settings2 className="mr-2 h-4 w-4" />
            Advanced
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
