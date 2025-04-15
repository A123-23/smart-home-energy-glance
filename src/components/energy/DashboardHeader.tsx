
import { useState } from "react";
import { BellRing, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationItem } from "./NotificationItem";

interface DashboardHeaderProps {
  notifications: {
    id: string;
    title: string;
    message: string;
    time: string;
    type: "warning" | "info" | "alert" | "success";
    isRead: boolean;
  }[];
  onShowSettings: () => void;
  markNotificationAsRead: (id: string) => void;
}

export function DashboardHeader({ 
  notifications, 
  onShowSettings, 
  markNotificationAsRead 
}: DashboardHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
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
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9"
          onClick={onShowSettings}
        >
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
  );
}
