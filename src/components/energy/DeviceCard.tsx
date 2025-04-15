
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, Power, Info, BarChart4 } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface DeviceCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  isOn: boolean;
  powerUsage: number; // in watts
  location?: string;
  status?: "normal" | "high" | "low" | "idle";
  onToggle?: (id: string, newState: boolean) => void;
  onViewDetails?: (id: string) => void;
  className?: string;
}

export function DeviceCard({
  id,
  name,
  icon: Icon,
  isOn,
  powerUsage,
  location,
  status = "normal",
  onToggle,
  onViewDetails,
  className,
}: DeviceCardProps) {
  const [isPowered, setIsPowered] = useState(isOn);

  const handleToggle = () => {
    const newState = !isPowered;
    setIsPowered(newState);
    if (onToggle) {
      onToggle(id, newState);
    }
  };

  const statusColors = {
    normal: "bg-energy-blue text-white",
    high: "bg-energy-red text-white",
    low: "bg-energy-green text-white",
    idle: "bg-gray-300 text-gray-700",
  };

  return (
    <Card className={cn("energy-card overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between py-4 px-5">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-full", 
            isPowered ? "bg-energy-green-light" : "bg-gray-200"
          )}>
            <Icon 
              className={cn(
                "h-5 w-5", 
                isPowered ? "text-energy-green-dark" : "text-gray-500"
              )} 
            />
          </div>
          <div>
            <CardTitle className="text-base font-medium">{name}</CardTitle>
            {location && (
              <p className="text-xs text-muted-foreground">{location}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Switch 
            checked={isPowered} 
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-energy-green"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails?.(id)}>
                <BarChart4 className="mr-2 h-4 w-4" />
                View Usage History
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewDetails?.(id)}>
                <Power className="mr-2 h-4 w-4" />
                Device Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-4 px-5 flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <p className="text-sm font-semibold">
              {isPowered ? `${powerUsage}W` : "0W"}
            </p>
            <Badge 
              variant="secondary" 
              className={cn("ml-2 text-xs", statusColors[status])}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {isPowered 
              ? `Active since 8:30 AM` 
              : "Currently switched off"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
