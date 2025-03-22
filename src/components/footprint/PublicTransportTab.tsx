
import React, { useEffect } from "react";
import { FootprintData } from "@/components/FootprintCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InfoIcon, Bus, Train } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PublicTransportTabProps {
  data: FootprintData;
  updateData: (data: Partial<FootprintData>) => void;
}

// Emission factors for public transport (kg CO2e per passenger mile)
const EMISSION_FACTORS = {
  bus: 0.107, // kg CO2e per passenger mile
  coach: 0.027, // kg CO2e per passenger mile
  localTrain: 0.041, // kg CO2e per passenger mile
  longTrain: 0.033, // kg CO2e per passenger mile
  tram: 0.041, // kg CO2e per passenger mile
  subway: 0.041, // kg CO2e per passenger mile
  taxi: 0.192, // kg CO2e per passenger mile
};

const PublicTransportTab: React.FC<PublicTransportTabProps> = ({ data, updateData }) => {
  // Calculate public transport footprint when mileage inputs change
  useEffect(() => {
    const publicTransportFootprint = (
      (data.busMileage * EMISSION_FACTORS.bus) +
      (data.coachMileage * EMISSION_FACTORS.coach) +
      (data.localTrainMileage * EMISSION_FACTORS.localTrain) +
      (data.longTrainMileage * EMISSION_FACTORS.longTrain) +
      (data.tramMileage * EMISSION_FACTORS.tram) +
      (data.subwayMileage * EMISSION_FACTORS.subway) +
      (data.taxiMileage * EMISSION_FACTORS.taxi)
    ) / 1000; // Convert kg to metric tons

    updateData({ publicTransportFootprint });
  }, [
    data.busMileage,
    data.coachMileage,
    data.localTrainMileage,
    data.longTrainMileage,
    data.tramMileage,
    data.subwayMileage,
    data.taxiMileage,
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
        <CardTitle className="text-2xl">
          Calculate the carbon footprint for public transport
        </CardTitle>
        <CardDescription>
          Enter the distance traveled using different modes of public transport to calculate your carbon footprint.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-sm">
            Please enter your annual mileage for each mode of public transport.
            If you don't use a particular mode, leave it as zero.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-6 border-l-4 border-amber-500 pl-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Bus className="h-5 w-5 mr-2" />
                  Road Transport
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="bus-mileage">Local Bus (miles)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Emissions factor: {EMISSION_FACTORS.bus} kg CO₂e per passenger mile
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="bus-mileage"
                      type="number"
                      min="0"
                      value={data.busMileage || ''}
                      onChange={(e) => updateData({ busMileage: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="coach-mileage">Coach/Intercity Bus (miles)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Emissions factor: {EMISSION_FACTORS.coach} kg CO₂e per passenger mile
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="coach-mileage"
                      type="number"
                      min="0"
                      value={data.coachMileage || ''}
                      onChange={(e) => updateData({ coachMileage: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="taxi-mileage">Taxi/Ride-hailing (miles)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Emissions factor: {EMISSION_FACTORS.taxi} kg CO₂e per passenger mile
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="taxi-mileage"
                      type="number"
                      min="0"
                      value={data.taxiMileage || ''}
                      onChange={(e) => updateData({ taxiMileage: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-medium flex items-center">
                <Train className="h-5 w-5 mr-2" />
                Rail Transport
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="local-train-mileage">Local/Commuter Train (miles)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Emissions factor: {EMISSION_FACTORS.localTrain} kg CO₂e per passenger mile
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="local-train-mileage"
                    type="number"
                    min="0"
                    value={data.localTrainMileage || ''}
                    onChange={(e) => updateData({ localTrainMileage: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="long-train-mileage">Long Distance Train (miles)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Emissions factor: {EMISSION_FACTORS.longTrain} kg CO₂e per passenger mile
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="long-train-mileage"
                    type="number"
                    min="0"
                    value={data.longTrainMileage || ''}
                    onChange={(e) => updateData({ longTrainMileage: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="tram-mileage">Tram/Light Rail (miles)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Emissions factor: {EMISSION_FACTORS.tram} kg CO₂e per passenger mile
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="tram-mileage"
                    type="number"
                    min="0"
                    value={data.tramMileage || ''}
                    onChange={(e) => updateData({ tramMileage: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="subway-mileage">Subway/Metro (miles)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Emissions factor: {EMISSION_FACTORS.subway} kg CO₂e per passenger mile
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="subway-mileage"
                    type="number"
                    min="0"
                    value={data.subwayMileage || ''}
                    onChange={(e) => updateData({ subwayMileage: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Total Public Transport Footprint</h3>
            <p className="text-3xl font-bold">
              {data.publicTransportFootprint.toFixed(2)} <span className="text-base font-normal">metric tons CO₂e</span>
            </p>
            <div className="flex items-start mt-2">
              <InfoIcon className="h-4 w-4 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Public transportation generally has lower emissions per passenger mile than private vehicles.
                For example, traveling 1,000 miles by local train instead of by car can save approximately 0.1 metric tons of CO₂e.
              </p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigateToTab("motorbike")}
            >
              Previous: Motorbike
            </Button>
            <Button 
              type="button"
              onClick={() => navigateToTab("secondary")}
            >
              Next: Secondary
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicTransportTab;
