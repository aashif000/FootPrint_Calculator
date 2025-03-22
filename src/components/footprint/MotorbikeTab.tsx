
import React, { useEffect } from "react";
import { FootprintData } from "@/components/FootprintCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoIcon } from "lucide-react";

interface MotorbikeTabProps {
  data: FootprintData;
  updateData: (data: Partial<FootprintData>) => void;
}

// Sample motorcycle types
const motorcycleTypes = [
  { name: "Small motorcycle (up to 125cc)", mpg: 85 },
  { name: "Medium motorcycle (125-500cc)", mpg: 65 },
  { name: "Large motorcycle (over 500cc)", mpg: 45 },
  { name: "Scooter", mpg: 95 },
  { name: "Sport motorcycle", mpg: 40 },
  { name: "Electric motorcycle", mpg: 150 }, // MPGe equivalent
];

// Emission factor for gasoline (kg CO2e per gallon)
const GASOLINE_EMISSION_FACTOR = 8.89;

// For electric motorcycles (kg CO2e per kWh)
const ELECTRICITY_EMISSION_FACTOR = 0.3937;

const MotorbikeTab: React.FC<MotorbikeTabProps> = ({ data, updateData }) => {
  // Selected motorcycle type
  const [selectedMotorcycleType, setSelectedMotorcycleType] = React.useState<string>("");
  const [isCustomEfficiency, setIsCustomEfficiency] = React.useState<boolean>(false);
  
  // Calculate motorcycle footprint when mileage or efficiency changes
  useEffect(() => {
    if (data.motorbikeMileage && data.motorbikeEfficiency) {
      let motorbikeFootprint = 0;
      
      // If it's an electric motorcycle
      if (selectedMotorcycleType === "Electric motorcycle") {
        // Convert MPGe to kWh per mile: 33.7 kWh per gallon equivalent
        const kwhPerMile = 33.7 / data.motorbikeEfficiency;
        motorbikeFootprint = (data.motorbikeMileage * kwhPerMile * ELECTRICITY_EMISSION_FACTOR) / 1000;
      } else {
        // For gas motorcycles: miles ÷ mpg = gallons, then multiply by emission factor
        const gallons = data.motorbikeMileage / data.motorbikeEfficiency;
        motorbikeFootprint = (gallons * GASOLINE_EMISSION_FACTOR) / 1000;
      }
      
      updateData({ motorbikeFootprint });
    }
  }, [data.motorbikeMileage, data.motorbikeEfficiency, selectedMotorcycleType, updateData]);
  
  // Handle motorcycle type selection
  const handleMotorcycleTypeChange = (value: string) => {
    setSelectedMotorcycleType(value);
    
    if (value === "custom") {
      setIsCustomEfficiency(true);
    } else {
      setIsCustomEfficiency(false);
      // Find the selected motorcycle type and update the efficiency
      const type = motorcycleTypes.find(motorcycle => motorcycle.name === value);
      if (type) {
        updateData({ motorbikeEfficiency: type.mpg });
      }
    }
  };

  // Helper function to navigate to another tab
  const navigateToTab = (tabValue: string) => {
    const tabElement = document.querySelector(`[data-value="${tabValue}"]`) as HTMLElement;
    if (tabElement) tabElement.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Calculate the carbon footprint for your motorbike</CardTitle>
        <CardDescription>
          Enter your motorbike's annual mileage and efficiency to calculate its carbon footprint.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="motorbike-mileage">Enter your annual mileage (miles)</Label>
            <Input
              id="motorbike-mileage"
              type="number"
              min="0"
              value={data.motorbikeMileage || ''}
              onChange={(e) => updateData({ motorbikeMileage: parseFloat(e.target.value) || 0 })}
              className="max-w-md"
            />
            <p className="text-xs text-muted-foreground">
              If your calculation period is not one year, please adjust the mileage accordingly.
            </p>
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="motorbike-type">Select your motorbike type</Label>
            <Select
              value={selectedMotorcycleType}
              onValueChange={handleMotorcycleTypeChange}
            >
              <SelectTrigger id="motorbike-type" className="max-w-md">
                <SelectValue placeholder="Select your motorbike type" />
              </SelectTrigger>
              <SelectContent>
                {motorcycleTypes.map((motorcycle) => (
                  <SelectItem key={motorcycle.name} value={motorcycle.name}>
                    {motorcycle.name} (~{motorcycle.mpg} mpg)
                  </SelectItem>
                ))}
                <SelectItem value="custom">Enter custom efficiency</SelectItem>
              </SelectContent>
            </Select>
            
            {isCustomEfficiency && (
              <div className="space-y-2">
                <Label htmlFor="motorbike-efficiency">Enter your motorbike's efficiency (mpg)</Label>
                <Input
                  id="motorbike-efficiency"
                  type="number"
                  min="1"
                  value={data.motorbikeEfficiency || ''}
                  onChange={(e) => updateData({ motorbikeEfficiency: parseFloat(e.target.value) || 0 })}
                  className="max-w-md"
                />
                <p className="text-xs text-muted-foreground">
                  Miles per gallon (MPG) or MPGe for electric motorbikes.
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Total Motorbike Footprint</h3>
            <p className="text-3xl font-bold">
              {data.motorbikeFootprint.toFixed(2)} <span className="text-base font-normal">metric tons CO₂e</span>
            </p>
            <div className="flex items-start mt-2">
              <InfoIcon className="h-4 w-4 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Motorcycles generally emit less CO₂e than cars due to their higher fuel efficiency.
                Riding 5,000 miles on a motorcycle that gets 60 mpg produces about 0.74 metric tons of CO₂e.
              </p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigateToTab("car")}
            >
              Previous: Car
            </Button>
            <Button 
              type="button"
              onClick={() => navigateToTab("publictransport")}
            >
              Next: Bus & Rail
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotorbikeTab;
