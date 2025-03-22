
import React, { useEffect } from "react";
import { FootprintData } from "@/components/FootprintCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CarTabProps {
  data: FootprintData;
  updateData: (data: Partial<FootprintData>) => void;
}

// Sample car models for demonstration
const carModels = [
  { name: "Small car (up to 1.4 liter engine)", mpg: 35 },
  { name: "Medium car (1.4-2.0 liter engine)", mpg: 30 },
  { name: "Large car (above 2.0 liter engine)", mpg: 25 },
  { name: "SUV or 4x4", mpg: 20 },
  { name: "Hybrid", mpg: 50 },
  { name: "Electric vehicle", mpg: 120 }, // MPGe equivalent
];

// Emission factor for gasoline (kg CO2e per gallon)
const GASOLINE_EMISSION_FACTOR = 8.89;

// For electric vehicles (kg CO2e per kWh)
const ELECTRICITY_EMISSION_FACTOR = 0.3937;

const CarTab: React.FC<CarTabProps> = ({ data, updateData }) => {
  // Selected car model
  const [selectedCarModel, setSelectedCarModel] = React.useState<string>("");
  const [isCustomEfficiency, setIsCustomEfficiency] = React.useState<boolean>(false);
  
  // Calculate car footprint when mileage or efficiency changes
  useEffect(() => {
    if (data.carMileage && data.carEfficiency) {
      let carFootprint = 0;
      
      // If it's an electric vehicle
      if (selectedCarModel === "Electric vehicle") {
        // Convert MPGe to kWh per mile: 33.7 kWh per gallon equivalent
        const kwhPerMile = 33.7 / data.carEfficiency;
        carFootprint = (data.carMileage * kwhPerMile * ELECTRICITY_EMISSION_FACTOR) / 1000;
      } else {
        // For gas vehicles: miles ÷ mpg = gallons, then multiply by emission factor
        const gallons = data.carMileage / data.carEfficiency;
        carFootprint = (gallons * GASOLINE_EMISSION_FACTOR) / 1000;
      }
      
      updateData({ carFootprint });
    }
  }, [data.carMileage, data.carEfficiency, selectedCarModel, updateData]);
  
  // Handle car model selection
  const handleCarModelChange = (value: string) => {
    setSelectedCarModel(value);
    
    if (value === "custom") {
      setIsCustomEfficiency(true);
    } else {
      setIsCustomEfficiency(false);
      // Find the selected car model and update the efficiency
      const model = carModels.find(car => car.name === value);
      if (model) {
        updateData({ carEfficiency: model.mpg });
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
        <CardTitle className="text-2xl">Calculate the carbon footprint for your car</CardTitle>
        <CardDescription>
          Enter your car's annual mileage and efficiency to calculate its carbon footprint.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="car-mileage">Enter your annual mileage (miles)</Label>
            <Input
              id="car-mileage"
              type="number"
              min="0"
              value={data.carMileage || ''}
              onChange={(e) => updateData({ carMileage: parseFloat(e.target.value) || 0 })}
              className="max-w-md"
            />
            <p className="text-xs text-muted-foreground">
              If your calculation period is not one year, please adjust the mileage accordingly.
            </p>
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="car-model">Select your vehicle</Label>
            <Select
              value={selectedCarModel}
              onValueChange={handleCarModelChange}
            >
              <SelectTrigger id="car-model" className="max-w-md">
                <SelectValue placeholder="Select your car type" />
              </SelectTrigger>
              <SelectContent>
                {carModels.map((car) => (
                  <SelectItem key={car.name} value={car.name}>
                    {car.name} (~{car.mpg} mpg)
                  </SelectItem>
                ))}
                <SelectItem value="custom">Enter custom efficiency</SelectItem>
              </SelectContent>
            </Select>
            
            {isCustomEfficiency && (
              <div className="space-y-2">
                <Label htmlFor="car-efficiency">Enter your car's efficiency (mpg)</Label>
                <Input
                  id="car-efficiency"
                  type="number"
                  min="1"
                  value={data.carEfficiency || ''}
                  onChange={(e) => updateData({ carEfficiency: parseFloat(e.target.value) || 0 })}
                  className="max-w-md"
                />
                <p className="text-xs text-muted-foreground">
                  Miles per gallon (MPG) or MPGe for electric vehicles.
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Total Car Footprint</h3>
            <p className="text-3xl font-bold">
              {data.carFootprint.toFixed(2)} <span className="text-base font-normal">metric tons CO₂e</span>
            </p>
            <div className="flex items-start mt-2">
              <InfoIcon className="h-4 w-4 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                The average car in the US emits about 4.6 metric tons of CO₂e per year.
                Driving 10,000 miles in a car that gets 25 mpg produces about 3.56 metric tons of CO₂e.
              </p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigateToTab("flights")}
            >
              Previous: Flights
            </Button>
            <Button 
              type="button"
              onClick={() => navigateToTab("motorbike")}
            >
              Next: Motorbike
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarTab;
