
import React, { useEffect, useState } from "react";
import { FootprintData } from "@/components/FootprintCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, InfoIcon, PlaneTakeoff } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FlightsTabProps {
  data: FootprintData;
  updateData: (data: Partial<FootprintData>) => void;
}

// Sample airports for demonstration (would be a larger list in production)
const airports = [
  { code: "JFK", name: "New York JFK" },
  { code: "LAX", name: "Los Angeles" },
  { code: "ORD", name: "Chicago O'Hare" },
  { code: "LHR", name: "London Heathrow" },
  { code: "CDG", name: "Paris Charles de Gaulle" },
  { code: "FRA", name: "Frankfurt" },
  { code: "HND", name: "Tokyo Haneda" },
  { code: "SYD", name: "Sydney" }
];

// Cabin class emission multipliers
const classMultipliers = {
  economy: 1.0,
  premiumEconomy: 1.6,
  business: 2.9,
  first: 4.0
};

// Simplified emission calculation function (in production would use distance calculations)
const calculateFlightEmission = (from: string, to: string, isReturn: boolean, classType: string, trips: number) => {
  // This is a simplified model - in production you would use actual distances between airports
  const baseEmission = 0.2; // kg CO2e per km for economy
  
  // Get airport codes for calculation
  const fromCode = from.split(" - ")[0].trim();
  const toCode = to.split(" - ")[0].trim();
  
  // Dummy distance calculation (would use geospatial data in production)
  let distance = 0;
  if ((fromCode === "JFK" && toCode === "LHR") || (fromCode === "LHR" && toCode === "JFK")) {
    distance = 5500; // Approximate distance JFK-LHR in km
  } else if ((fromCode === "LAX" && toCode === "SYD") || (fromCode === "SYD" && toCode === "LAX")) {
    distance = 12000; // Approximate distance LAX-SYD in km
  } else {
    // Random distance for other routes
    distance = Math.floor(Math.random() * 8000) + 1000;
  }
  
  // Apply class multiplier
  let multiplier = classMultipliers.economy;
  if (classType === "premium economy") multiplier = classMultipliers.premiumEconomy;
  if (classType === "business") multiplier = classMultipliers.business;
  if (classType === "first") multiplier = classMultipliers.first;
  
  // Calculate emission
  let emission = distance * baseEmission * multiplier * trips;
  
  // Double for return trips
  if (isReturn) emission *= 2;
  
  // Convert to metric tons
  return emission / 1000;
};

const FlightsTab: React.FC<FlightsTabProps> = ({ data, updateData }) => {
  const [flightEntries, setFlightEntries] = useState(data.flights.length ? data.flights : [
    { type: 'return' as const, from: '', to: '', via: '', class: 'economy', trips: 1, footprint: 0 }
  ]);
  
  // Add a new flight entry
  const addFlightEntry = () => {
    if (flightEntries.length < 3) {
      setFlightEntries([...flightEntries, { 
        type: 'return' as const, 
        from: '', 
        to: '', 
        via: '', 
        class: 'economy', 
        trips: 1,
        footprint: 0
      }]);
    }
  };
  
  // Remove a flight entry
  const removeFlightEntry = (index: number) => {
    const updatedEntries = [...flightEntries];
    updatedEntries.splice(index, 1);
    setFlightEntries(updatedEntries);
  };
  
  // Update a flight entry
  const updateFlightEntry = (index: number, field: string, value: any) => {
    const updatedEntries = [...flightEntries];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };
    
    // Recalculate flight footprint
    if (['type', 'from', 'to', 'class', 'trips'].includes(field)) {
      const entry = updatedEntries[index];
      if (entry.from && entry.to) {
        entry.footprint = calculateFlightEmission(
          entry.from, 
          entry.to, 
          entry.type === 'return', 
          entry.class,
          entry.trips
        );
      }
    }
    
    setFlightEntries(updatedEntries);
  };
  
  // Update the total flights footprint when flight entries change
  useEffect(() => {
    const totalFlightsFootprint = flightEntries.reduce((sum, flight) => sum + flight.footprint, 0);
    updateData({ flights: flightEntries, flightsFootprint: totalFlightsFootprint });
  }, [flightEntries, updateData]);

  // Helper function to navigate to another tab
  const navigateToTab = (tabValue: string) => {
    const tabElement = document.querySelector(`[data-value="${tabValue}"]`) as HTMLElement;
    if (tabElement) tabElement.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Calculate the carbon footprint for your flights</CardTitle>
        <CardDescription>
          Enter details for up to three flight itineraries to calculate their carbon footprint.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {flightEntries.map((flight, index) => (
            <div key={index} className="border p-4 rounded-md space-y-4 relative">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center">
                  <PlaneTakeoff className="h-5 w-5 mr-2" />
                  Flight {index + 1}
                </h3>
                {index > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeFlightEntry(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`flight-type-${index}`}>Flight Type</Label>
                  <Select 
                    value={flight.type} 
                    onValueChange={(value) => updateFlightEntry(index, 'type', value)}
                  >
                    <SelectTrigger id={`flight-type-${index}`}>
                      <SelectValue placeholder="Select flight type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="return">Return Trip</SelectItem>
                      <SelectItem value="oneway">One-way Trip</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`flight-class-${index}`}>Class</Label>
                  <Select 
                    value={flight.class} 
                    onValueChange={(value) => updateFlightEntry(index, 'class', value)}
                  >
                    <SelectTrigger id={`flight-class-${index}`}>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="premium economy">Premium Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`flight-from-${index}`}>From</Label>
                  <Select 
                    value={flight.from} 
                    onValueChange={(value) => updateFlightEntry(index, 'from', value)}
                  >
                    <SelectTrigger id={`flight-from-${index}`}>
                      <SelectValue placeholder="Select departure airport" />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.code} value={`${airport.code} - ${airport.name}`}>
                          {airport.code} - {airport.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`flight-to-${index}`}>To</Label>
                  <Select 
                    value={flight.to} 
                    onValueChange={(value) => updateFlightEntry(index, 'to', value)}
                  >
                    <SelectTrigger id={`flight-to-${index}`}>
                      <SelectValue placeholder="Select arrival airport" />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.code} value={`${airport.code} - ${airport.name}`}>
                          {airport.code} - {airport.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`flight-trips-${index}`}>Number of trips</Label>
                <Input
                  id={`flight-trips-${index}`}
                  type="number"
                  min="1"
                  value={flight.trips || ''}
                  onChange={(e) => updateFlightEntry(index, 'trips', parseInt(e.target.value) || 1)}
                  className="max-w-[200px]"
                />
                <p className="text-xs text-muted-foreground">
                  How many times you took this flight during the calculation period.
                </p>
              </div>
              
              {flight.from && flight.to && (
                <div className="bg-secondary/10 p-3 rounded-md">
                  <p className="text-sm font-medium">
                    Estimated footprint for this flight: {flight.footprint.toFixed(2)} metric tons CO₂e
                  </p>
                </div>
              )}
            </div>
          ))}
          
          {flightEntries.length < 3 && (
            <Button 
              variant="outline" 
              onClick={addFlightEntry}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Flight
            </Button>
          )}
          
          <div className="bg-muted p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Total Flights Footprint</h3>
            <p className="text-3xl font-bold">
              {data.flightsFootprint.toFixed(2)} <span className="text-base font-normal">metric tons CO₂e</span>
            </p>
            <div className="flex items-start mt-2">
              <InfoIcon className="h-4 w-4 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                A return flight from New York to London emits approximately 1.6 metric tons of CO₂e per passenger in economy class.
                Flying business class can increase your footprint by up to 3 times compared to economy.
              </p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigateToTab("house")}
            >
              Previous: House
            </Button>
            <Button 
              type="button"
              onClick={() => navigateToTab("car")}
            >
              Next: Car
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightsTab;
