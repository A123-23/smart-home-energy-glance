
import { cn } from "@/lib/utils";
import { LucideIcon, AlertTriangle, Info, Zap, CheckCircle } from "lucide-react";

interface NotificationItemProps {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "alert" | "info" | "warning" | "success";
  isRead?: boolean;
  icon?: LucideIcon;
  onMarkAsRead?: (id: string) => void;
  className?: string;
}

export function NotificationItem({
  id,
  title,
  message,
  time,
  type,
  isRead = false,
  icon: CustomIcon,
  onMarkAsRead,
  className,
}: NotificationItemProps) {
  const typeConfig = {
    alert: {
      icon: AlertTriangle,
      color: "text-energy-red",
      bgColor: "bg-energy-red-light/30",
    },
    warning: {
      icon: Zap,
      color: "text-energy-yellow",
      bgColor: "bg-energy-yellow-light/30",
    },
    info: {
      icon: Info,
      color: "text-energy-blue",
      bgColor: "bg-energy-blue-light/30",
    },
    success: {
      icon: CheckCircle,
      color: "text-energy-green",
      bgColor: "bg-energy-green-light/30",
    },
  };

  const Icon = CustomIcon || typeConfig[type].icon;

  return (
    <div
      className={cn(
        "p-3 border-b last:border-b-0 cursor-pointer hover:bg-muted/40 transition-colors",
        isRead ? "bg-transparent" : "bg-muted/20",
        className
      )}
      onClick={() => onMarkAsRead?.(id)}
    >
      <div className="flex items-start gap-3">
        <div className={cn("p-2 rounded-full", typeConfig[type].bgColor)}>
          <Icon className={cn("h-4 w-4", typeConfig[type].color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">{title}</h4>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{message}</p>
        </div>
        {!isRead && <div className="w-2 h-2 rounded-full bg-energy-blue mt-1.5"></div>}
      </div>
    </div>
  );
}
