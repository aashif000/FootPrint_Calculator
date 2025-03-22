import React, { useEffect } from "react";
import { FootprintData } from "@/components/FootprintCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HouseTabProps {
  data: FootprintData;
  updateData: (data: Partial<FootprintData>) => void;
}

// Emission factors for house calculations (kg CO2e per unit)
const EMISSION_FACTORS = {
  electricity: 0.3937, // kg CO2e per kWh
  naturalGas: 0.2, // kg CO2e per kWh
  heatingOil: 10.15, // kg CO2e per US gallon
  coal: 0.36, // kg CO2e per kWh
  lpg: 1.51, // kg CO2e per therm
  propane: 5.74, // kg CO2e per US gallon
  woodenPellets: 165 // kg CO2e per metric ton
};

const HouseTab: React.FC<HouseTabProps> = ({ data, updateData }) => {
  // Calculate house footprint whenever energy inputs change
  useEffect(() => {
    const houseFootprint = (
      (data.electricity * EMISSION_FACTORS.electricity) +
      (data.naturalGas * EMISSION_FACTORS.naturalGas) +
      (data.heatingOil * EMISSION_FACTORS.heatingOil) +
      (data.coal * EMISSION_FACTORS.coal) +
      (data.lpg * EMISSION_FACTORS.lpg) +
      (data.propane * EMISSION_FACTORS.propane) +
      (data.woodenPellets * EMISSION_FACTORS.woodenPellets)
    ) / 1000; // Convert kg to metric tons

    updateData({ houseFootprint });
  }, [
    data.electricity, 
    data.naturalGas, 
    data.heatingOil, 
    data.coal, 
    data.lpg, 
    data.propane, 
    data.woodenPellets,
    updateData
  ]);

  // Helper function to navigate to another tab
  const navigateToTab = (tabValue: string) => {
    const tabElement = document.querySelector(`[data-value="${tabValue}"]`) as HTMLElement;
    if (tabElement) tabElement.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Calculate the carbon footprint for your home</CardTitle>
        <CardDescription>
          Enter your household energy consumption details to calculate your home's carbon footprint.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="household-size">How many people are in your household?</Label>
            <Input
              id="household-size"
              type="number"
              min="1"
              value={data.householdSize || ''}
              onChange={(e) => updateData({ householdSize: parseInt(e.target.value) || 1 })}
              className="max-w-xs"
            />
            <p className="text-xs text-muted-foreground">
              This helps us calculate per-person emissions for your household.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Energy Consumption</h3>
            <p className="text-sm text-muted-foreground">
              Enter your energy consumption for the period you specified. If you don't know exact values, you can leave these fields at zero.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="electricity">Electricity (kWh)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          You can find your electricity usage on your utility bills. We use a factor of {EMISSION_FACTORS.electricity} kg CO₂e per kWh.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="electricity"
                  type="number"
                  min="0"
                  value={data.electricity || ''}
                  onChange={(e) => updateData({ electricity: parseFloat(e.target.value) || 0 })}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="natural-gas">Natural Gas (kWh)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Natural gas usage from your utility bills. We use a factor of {EMISSION_FACTORS.naturalGas} kg CO₂e per kWh.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="natural-gas"
                  type="number"
                  min="0"
                  value={data.naturalGas || ''}
                  onChange={(e) => updateData({ naturalGas: parseFloat(e.target.value) || 0 })}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="heating-oil">Heating Oil (US gallons)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Total heating oil used. We use a factor of {EMISSION_FACTORS.heatingOil} kg CO₂e per US gallon.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="heating-oil"
                  type="number"
                  min="0"
                  value={data.heatingOil || ''}
                  onChange={(e) => updateData({ heatingOil: parseFloat(e.target.value) || 0 })}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="coal">Coal (kWh)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Coal energy equivalent in kWh. We use a factor of {EMISSION_FACTORS.coal} kg CO₂e per kWh.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="coal"
                  type="number"
                  min="0"
                  value={data.coal || ''}
                  onChange={(e) => updateData({ coal: parseFloat(e.target.value) || 0 })}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="lpg">LPG (therms)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Liquid Petroleum Gas usage in therms. We use a factor of {EMISSION_FACTORS.lpg} kg CO₂e per therm.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="lpg"
                  type="number"
                  min="0"
                  value={data.lpg || ''}
                  onChange={(e) => updateData({ lpg: parseFloat(e.target.value) || 0 })}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="propane">Propane (US gallons)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Propane usage in US gallons. We use a factor of {EMISSION_FACTORS.propane} kg CO₂e per US gallon.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="propane"
                  type="number"
                  min="0"
                  value={data.propane || ''}
                  onChange={(e) => updateData({ propane: parseFloat(e.target.value) || 0 })}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="wooden-pellets">Wooden Pellets (metric tons)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Wooden pellets used in metric tons. We use a factor of {EMISSION_FACTORS.woodenPellets} kg CO₂e per metric ton.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="wooden-pellets"
                  type="number"
                  min="0"
                  value={data.woodenPellets || ''}
                  onChange={(e) => updateData({ woodenPellets: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Total House Footprint</h3>
            <p className="text-3xl font-bold">
              {data.houseFootprint.toFixed(2)} <span className="text-base font-normal">metric tons CO₂e</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              This is the total carbon footprint from your home energy use.
              The average household in the United States produces about 5.5 metric tons of CO₂e per year.
            </p>
          </div>
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigateToTab("welcome")}
            >
              Previous: Welcome
            </Button>
            <Button 
              type="button"
              onClick={() => navigateToTab("flights")}
            >
              Next: Flights
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HouseTab;
