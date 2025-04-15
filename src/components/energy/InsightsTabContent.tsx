
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function InsightsTabContent() {
  return (
    <div className="space-y-6 mt-6">
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
    </div>
  );
}
