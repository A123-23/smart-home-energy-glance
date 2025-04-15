
import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface DataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

interface EnergyUsageChartProps {
  title: string;
  data: DataPoint[];
  lines: {
    dataKey: string;
    stroke: string;
    fill: string;
  }[];
  timeRange: "day" | "week" | "month" | "year";
  yAxisLabel?: string;
  xAxisLabel?: string;
  className?: string;
}

export function EnergyUsageChart({
  title,
  data,
  lines,
  timeRange,
  yAxisLabel = "kWh",
  xAxisLabel = "Time",
  className,
}: EnergyUsageChartProps) {
  const isMobile = useIsMobile();

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 0,
                left: isMobile ? 0 : 10,
                bottom: 5,
              }}
            >
              <defs>
                {lines.map((line, index) => (
                  <linearGradient
                    key={`gradient-${line.dataKey}`}
                    id={`color-${line.dataKey}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={line.fill} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={line.fill} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                tickFormatter={(value) => `${value}${yAxisLabel}`}
                width={isMobile ? 35 : 45}
              />
              <Tooltip 
                formatter={(value) => [`${value} ${yAxisLabel}`, '']}
                labelFormatter={(label) => `${xAxisLabel}: ${label}`}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '0.5rem',
                  borderColor: '#E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
              {lines.map((line, index) => (
                <Area
                  key={`area-${line.dataKey}`}
                  type="monotone"
                  dataKey={line.dataKey}
                  stroke={line.stroke}
                  fill={`url(#color-${line.dataKey})`}
                  strokeWidth={2}
                  activeDot={{ r: 6, strokeWidth: 1 }}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
