
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WelcomeTab from "@/components/footprint/WelcomeTab";
import HouseTab from "@/components/footprint/HouseTab";
import FlightsTab from "@/components/footprint/FlightsTab";
import CarTab from "@/components/footprint/CarTab";
import MotorbikeTab from "@/components/footprint/MotorbikeTab";
import PublicTransportTab from "@/components/footprint/PublicTransportTab";
import SecondaryTab from "@/components/footprint/SecondaryTab";
import ResultsTab from "@/components/footprint/ResultsTab";
import { 
  Home, Plane, Car, Bike, Bus, ShoppingBag, 
  PieChart, LayoutDashboard
} from "lucide-react";

// Define the footprint data structure
export interface FootprintData {
  // Welcome tab data
  country: string;
  state: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  
  // House tab data
  householdSize: number;
  electricity: number;
  naturalGas: number;
  heatingOil: number;
  coal: number;
  lpg: number;
  propane: number;
  woodenPellets: number;
  houseFootprint: number;
  
  // Flights tab data
  flights: {
    type: 'return' | 'oneway';
    from: string;
    to: string;
    via?: string;
    class: string;
    trips: number;
    footprint: number;
  }[];
  flightsFootprint: number;
  
  // Car tab data
  carMileage: number;
  carEfficiency: number;
  carFootprint: number;
  
  // Motorbike tab data
  motorbikeMileage: number;
  motorbikeEfficiency: number;
  motorbikeFootprint: number;
  
  // Public transport data
  busMileage: number;
  coachMileage: number;
  localTrainMileage: number;
  longTrainMileage: number;
  tramMileage: number;
  subwayMileage: number;
  taxiMileage: number;
  publicTransportFootprint: number;
  
  // Secondary footprint data
  spending: {
    food: number;
    pharmaceuticals: number;
    clothing: number;
    paperProducts: number;
    computers: number;
    electronics: number;
    vehicles: number;
    furniture: number;
    hospitality: number;
    telecommunications: number;
    banking: number;
    insurance: number;
    education: number;
    recreation: number;
  };
  secondaryFootprint: number;
  
  // Total footprint
  totalFootprint: number;
}

const FootprintCalculator: React.FC = () => {
  // Initialize state with default values
  const [footprintData, setFootprintData] = useState<FootprintData>({
    // Welcome tab data
    country: '',
    state: '',
    startDate: undefined,
    endDate: undefined,
    
    // House tab data
    householdSize: 1,
    electricity: 0,
    naturalGas: 0,
    heatingOil: 0,
    coal: 0,
    lpg: 0,
    propane: 0,
    woodenPellets: 0,
    houseFootprint: 0,
    
    // Flights tab data
    flights: [],
    flightsFootprint: 0,
    
    // Car tab data
    carMileage: 0,
    carEfficiency: 25, // Default MPG
    carFootprint: 0,
    
    // Motorbike tab data
    motorbikeMileage: 0,
    motorbikeEfficiency: 50, // Default MPG
    motorbikeFootprint: 0,
    
    // Public transport data
    busMileage: 0,
    coachMileage: 0,
    localTrainMileage: 0,
    longTrainMileage: 0,
    tramMileage: 0,
    subwayMileage: 0,
    taxiMileage: 0,
    publicTransportFootprint: 0,
    
    // Secondary footprint data
    spending: {
      food: 0,
      pharmaceuticals: 0,
      clothing: 0,
      paperProducts: 0,
      computers: 0,
      electronics: 0,
      vehicles: 0,
      furniture: 0,
      hospitality: 0,
      telecommunications: 0,
      banking: 0,
      insurance: 0,
      education: 0,
      recreation: 0,
    },
    secondaryFootprint: 0,
    
    // Total footprint
    totalFootprint: 0,
  });

  // Update data and recalculate totals
  const updateData = (updatedData: Partial<FootprintData>) => {
    setFootprintData(prevData => {
      const newData = { ...prevData, ...updatedData };
      
      // Calculate total footprint
      const totalFootprint = 
        newData.houseFootprint + 
        newData.flightsFootprint + 
        newData.carFootprint + 
        newData.motorbikeFootprint + 
        newData.publicTransportFootprint + 
        newData.secondaryFootprint;
      
      return { ...newData, totalFootprint };
    });
  };

  return (
    <div className="card-glass max-w-5xl mx-auto">
      <Tabs defaultValue="welcome" className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-8">
          <TabsTrigger value="welcome" className="flex flex-col items-center p-2 sm:p-3">
            <LayoutDashboard className="h-5 w-5 mb-1" />
            <span className="text-xs">Welcome</span>
          </TabsTrigger>
          <TabsTrigger value="house" className="flex flex-col items-center p-2 sm:p-3">
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs">House</span>
          </TabsTrigger>
          <TabsTrigger value="flights" className="flex flex-col items-center p-2 sm:p-3">
            <Plane className="h-5 w-5 mb-1" />
            <span className="text-xs">Flights</span>
          </TabsTrigger>
          <TabsTrigger value="car" className="flex flex-col items-center p-2 sm:p-3">
            <Car className="h-5 w-5 mb-1" />
            <span className="text-xs">Car</span>
          </TabsTrigger>
          <TabsTrigger value="motorbike" className="flex flex-col items-center p-2 sm:p-3">
            <Bike className="h-5 w-5 mb-1" />
            <span className="text-xs">Motorbike</span>
          </TabsTrigger>
          <TabsTrigger value="publictransport" className="flex flex-col items-center p-2 sm:p-3">
            <Bus className="h-5 w-5 mb-1" />
            <span className="text-xs">Bus & Rail</span>
          </TabsTrigger>
          <TabsTrigger value="secondary" className="flex flex-col items-center p-2 sm:p-3">
            <ShoppingBag className="h-5 w-5 mb-1" />
            <span className="text-xs">Secondary</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="flex flex-col items-center p-2 sm:p-3">
            <PieChart className="h-5 w-5 mb-1" />
            <span className="text-xs">Results</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="welcome">
          <WelcomeTab data={footprintData} updateData={updateData} />
        </TabsContent>
        
        <TabsContent value="house">
          <HouseTab data={footprintData} updateData={updateData} />
        </TabsContent>
        
        <TabsContent value="flights">
          <FlightsTab data={footprintData} updateData={updateData} />
        </TabsContent>
        
        <TabsContent value="car">
          <CarTab data={footprintData} updateData={updateData} />
        </TabsContent>
        
        <TabsContent value="motorbike">
          <MotorbikeTab data={footprintData} updateData={updateData} />
        </TabsContent>
        
        <TabsContent value="publictransport">
          <PublicTransportTab data={footprintData} updateData={updateData} />
        </TabsContent>
        
        <TabsContent value="secondary">
          <SecondaryTab data={footprintData} updateData={updateData} />
        </TabsContent>
        
        <TabsContent value="results">
          <ResultsTab data={footprintData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FootprintCalculator;
