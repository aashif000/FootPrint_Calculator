
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart, Droplet, Info, Calculator, LeafyGreen } from "lucide-react";

const FootprintCalculationFacts: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Calculator className="mr-2 h-6 w-6" />
        Footprint Calculation Methodologies
      </h1>
      
      <Tabs defaultValue="carbon">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="carbon" className="flex items-center">
            <BarChart className="h-4 w-4 mr-2" />
            Carbon Footprint
          </TabsTrigger>
          <TabsTrigger value="water" className="flex items-center">
            <Droplet className="h-4 w-4 mr-2" />
            Water Footprint
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="carbon">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <LeafyGreen className="mr-2 h-6 w-6 text-green-600" />
                Carbon Footprint Calculations
              </CardTitle>
              <CardDescription>
                Learn about the formulas and methodologies used to calculate carbon footprints.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">General Formula</h3>
                <div className="bg-muted p-4 rounded-md">
                  <p className="mb-2 font-mono">Carbon Footprint (kg CO₂e) = Activity Quantity × Emission Factor</p>
                  <p className="text-sm text-muted-foreground">
                    This basic formula is applied across different activities to calculate their carbon footprint.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Household Energy Emissions</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Electricity</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-mono text-sm">Electricity (kg CO₂e) = kWh × 0.3937</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      The factor varies by region based on energy mix.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Natural Gas</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-mono text-sm">Natural Gas (kg CO₂e) = kWh × 0.185</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Heating Oil</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-mono text-sm">Heating Oil (kg CO₂e) = US gallons × 10.15</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Coal</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-mono text-sm">Coal (kg CO₂e) = kWh × 0.36</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">LPG</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-mono text-sm">LPG (kg CO₂e) = therms × 1.51</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Propane</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-mono text-sm">Propane (kg CO₂e) = US gallons × 5.74</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Wooden Pellets</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-mono text-sm">Wooden Pellets (kg CO₂e) = metric tons × 165</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Transportation Emissions</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Car (Gasoline)</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-mono text-sm">Car (kg CO₂e) = (Miles ÷ MPG) × 8.89</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      8.89 kg CO₂e per gallon of gasoline.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Car (Electric)</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-mono text-sm">Car (kg CO₂e) = kWh used × 0.3937</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Convert MPGe to kWh per mile: 33.7 kWh per gallon equivalent.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Flight Emissions</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-mono text-sm">Flight (kg CO₂e) = Distance × Class Factor × 0.2</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      0.2 kg CO₂e per km in economy class. Class factors: Economy (1.0), Premium Economy (1.6), Business (2.9), First (4.0).
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Public Transport</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-mono text-sm">Bus (kg CO₂e) = Miles × 0.107</p>
                      <p className="font-mono text-sm">Train (kg CO₂e) = Miles × 0.041</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start bg-blue-50 p-4 rounded-md">
                <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">Important Notes</h4>
                  <ul className="text-sm text-blue-700 list-disc list-inside space-y-1 mt-1">
                    <li>Emission factors may vary by region and year.</li>
                    <li>Calculations are approximations based on average values.</li>
                    <li>For precise calculations, local or regional emission factors should be used.</li>
                    <li>Convert all results to metric tons (1,000 kg = 1 metric ton) for final reporting.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="water">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Droplet className="mr-2 h-6 w-6 text-blue-600" />
                Water Footprint Calculations
              </CardTitle>
              <CardDescription>
                Learn about the formulas and methodologies used to calculate water footprints.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">General Formula</h3>
                <div className="bg-muted p-4 rounded-md">
                  <p className="mb-2 font-mono">Water Footprint (liters) = Activity Quantity × Water Consumption Rate</p>
                  <p className="text-sm text-muted-foreground">
                    This basic formula is applied across different activities to calculate their water footprint.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Components of Water Footprint</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-md">
                    <h4 className="font-medium text-blue-700">Blue Water</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      The volume of surface and groundwater consumed during production.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-md">
                    <h4 className="font-medium text-green-700">Green Water</h4>
                    <p className="text-sm text-green-600 mt-1">
                      The rainwater consumed during the production process.
                    </p>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-md">
                    <h4 className="font-medium text-gray-700">Grey Water</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      The freshwater required to dilute pollutants to meet water quality standards.
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Agricultural Products</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Crops</h4>
                    <div className="bg-muted p-3 rounded-md space-y-2">
                      <p className="font-mono text-sm">Rice (liters) = kg × 2,500</p>
                      <p className="font-mono text-sm">Wheat (liters) = kg × 1,300</p>
                      <p className="font-mono text-sm">Corn (liters) = kg × 900</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Animal Products</h4>
                    <div className="bg-muted p-3 rounded-md space-y-2">
                      <p className="font-mono text-sm">Beef (liters) = kg × 15,400</p>
                      <p className="font-mono text-sm">Chicken (liters) = kg × 4,300</p>
                      <p className="font-mono text-sm">Eggs (liters) = kg × 3,300</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Beverages</h4>
                    <div className="bg-muted p-3 rounded-md space-y-2">
                      <p className="font-mono text-sm">Coffee (liters) = kg × 18,900</p>
                      <p className="font-mono text-sm">Tea (liters) = kg × 8,860</p>
                      <p className="font-mono text-sm">Beer (liters) = liter × 298</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Fruits & Vegetables</h4>
                    <div className="bg-muted p-3 rounded-md space-y-2">
                      <p className="font-mono text-sm">Apples (liters) = kg × 822</p>
                      <p className="font-mono text-sm">Tomatoes (liters) = kg × 214</p>
                      <p className="font-mono text-sm">Potatoes (liters) = kg × 287</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Consumer Products</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Textiles</h4>
                    <div className="bg-muted p-3 rounded-md space-y-2">
                      <p className="font-mono text-sm">Cotton T-shirt (liters) = item × 2,700</p>
                      <p className="font-mono text-sm">Jeans (liters) = item × 8,000</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Paper Products</h4>
                    <div className="bg-muted p-3 rounded-md space-y-2">
                      <p className="font-mono text-sm">Paper (liters) = kg × 2,000</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start bg-blue-50 p-4 rounded-md">
                <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">Important Notes</h4>
                  <ul className="text-sm text-blue-700 list-disc list-inside space-y-1 mt-1">
                    <li>Water footprint values vary significantly by production region and methods.</li>
                    <li>Irrigation type, climate, and soil conditions all affect water usage.</li>
                    <li>Values provided are global averages; actual values may differ locally.</li>
                    <li>The total water footprint is the sum of blue, green, and grey water footprints.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FootprintCalculationFacts;
