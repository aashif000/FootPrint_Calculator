
import React, { useEffect } from "react";
import { FootprintData } from "@/components/FootprintCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InfoIcon, DollarSign } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SecondaryTabProps {
  data: FootprintData;
  updateData: (data: Partial<FootprintData>) => void;
}

// Emission factors for spending (kg CO2e per $)
// These are simplified and would vary by country/region in a real implementation
const EMISSION_FACTORS = {
  food: 0.56, // kg CO2e per $
  pharmaceuticals: 0.31,
  clothing: 0.45,
  paperProducts: 0.49,
  computers: 0.52,
  electronics: 0.42,
  vehicles: 0.53,
  furniture: 0.41,
  hospitality: 0.44,
  telecommunications: 0.28,
  banking: 0.11,
  insurance: 0.09,
  education: 0.25,
  recreation: 0.38,
};

const SecondaryTab: React.FC<SecondaryTabProps> = ({ data, updateData }) => {
  // Calculate secondary footprint when spending inputs change
  useEffect(() => {
    const spending = data.spending;
    const secondaryFootprint = (
      (spending.food * EMISSION_FACTORS.food) +
      (spending.pharmaceuticals * EMISSION_FACTORS.pharmaceuticals) +
      (spending.clothing * EMISSION_FACTORS.clothing) +
      (spending.paperProducts * EMISSION_FACTORS.paperProducts) +
      (spending.computers * EMISSION_FACTORS.computers) +
      (spending.electronics * EMISSION_FACTORS.electronics) +
      (spending.vehicles * EMISSION_FACTORS.vehicles) +
      (spending.furniture * EMISSION_FACTORS.furniture) +
      (spending.hospitality * EMISSION_FACTORS.hospitality) +
      (spending.telecommunications * EMISSION_FACTORS.telecommunications) +
      (spending.banking * EMISSION_FACTORS.banking) +
      (spending.insurance * EMISSION_FACTORS.insurance) +
      (spending.education * EMISSION_FACTORS.education) +
      (spending.recreation * EMISSION_FACTORS.recreation)
    ) / 1000; // Convert kg to metric tons

    updateData({ secondaryFootprint });
  }, [data.spending, updateData]);

  // Helper function to update spending values
  const updateSpending = (category: keyof typeof data.spending, value: number) => {
    updateData({
      spending: {
        ...data.spending,
        [category]: value,
      },
    });
  };

  // Helper function to navigate to another tab
  const navigateToTab = (tabValue: string) => {
    const tabElement = document.querySelector(`[data-value="${tabValue}"]`) as HTMLElement;
    if (tabElement) tabElement.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Calculate your secondary carbon footprint</CardTitle>
        <CardDescription>
          Your secondary carbon footprint comes from the goods and services you consume.
          Enter your annual spending in each category to calculate this part of your carbon footprint.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              All values should be entered in your local currency. The calculator will convert to CO₂e based on average
              emissions per unit of currency spent in each category.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="food-spending">Food & Drink</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        This includes groceries, restaurants, and all food/beverage consumption.
                        Factor: {EMISSION_FACTORS.food} kg CO₂e per $ spent.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="food-spending"
                type="number"
                min="0"
                value={data.spending.food || ''}
                onChange={(e) => updateSpending('food', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="pharmaceuticals-spending">Pharmaceuticals</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Medications, supplements, and personal care products.
                        Factor: {EMISSION_FACTORS.pharmaceuticals} kg CO₂e per $ spent.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="pharmaceuticals-spending"
                type="number"
                min="0"
                value={data.spending.pharmaceuticals || ''}
                onChange={(e) => updateSpending('pharmaceuticals', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="clothing-spending">Clothes, Textiles & Shoes</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        All clothing, footwear, and textile purchases.
                        Factor: {EMISSION_FACTORS.clothing} kg CO₂e per $ spent.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="clothing-spending"
                type="number"
                min="0"
                value={data.spending.clothing || ''}
                onChange={(e) => updateSpending('clothing', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="paper-spending">Paper Based Products</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Books, magazines, stationery, and other paper products.
                        Factor: {EMISSION_FACTORS.paperProducts} kg CO₂e per $ spent.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="paper-spending"
                type="number"
                min="0"
                value={data.spending.paperProducts || ''}
                onChange={(e) => updateSpending('paperProducts', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="computers-spending">Computers & IT Equipment</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Computers, printers, and other IT hardware.
                        Factor: {EMISSION_FACTORS.computers} kg CO₂e per $ spent.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="computers-spending"
                type="number"
                min="0"
                value={data.spending.computers || ''}
                onChange={(e) => updateSpending('computers', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="electronics-spending">Television, Radio & Phone</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        TVs, phones, and other consumer electronics.
                        Factor: {EMISSION_FACTORS.electronics} kg CO₂e per $ spent.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="electronics-spending"
                type="number"
                min="0"
                value={data.spending.electronics || ''}
                onChange={(e) => updateSpending('electronics', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="vehicles-spending">Motor Vehicles (excluding fuel)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Vehicle purchases, parts, and maintenance (excluding fuel).
                        Factor: {EMISSION_FACTORS.vehicles} kg CO₂e per $ spent.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="vehicles-spending"
                type="number"
                min="0"
                value={data.spending.vehicles || ''}
                onChange={(e) => updateSpending('vehicles', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="furniture-spending">Furniture & Manufactured Goods</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Furniture, household appliances, and other manufactured goods.
                        Factor: {EMISSION_FACTORS.furniture} kg CO₂e per $ spent.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="furniture-spending"
                type="number"
                min="0"
                value={data.spending.furniture || ''}
                onChange={(e) => updateSpending('furniture', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="hospitality-spending">Hotels, Restaurants, Pubs, etc.</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Accommodation and dining out expenses.
                        Factor: {EMISSION_FACTORS.hospitality} kg CO₂e per $ spent.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="hospitality-spending"
                type="number"
                min="0"
                value={data.spending.hospitality || ''}
                onChange={(e) => updateSpending('hospitality', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="telecommunications-spending">Telecommunications</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Phone, internet, and other communication services.
                        Factor: {EMISSION_FACTORS.telecommunications} kg CO₂e per $ spent.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="telecommunications-spending"
                type="number"
                min="0"
                value={data.spending.telecommunications || ''}
                onChange={(e) => updateSpending('telecommunications', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="banking-spending">Banking & Finance</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Banking fees, investment services, and financial services.
                        Factor: {EMISSION_FACTORS.banking} kg CO₂e per $ spent.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="banking-spending"
                type="number"
                min="0"
                value={data.spending.banking || ''}
                onChange={(e) => updateSpending('banking', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="insurance-spending">Insurance</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        All insurance premiums and related expenses.
                        Factor: {EMISSION_FACTORS.insurance} kg CO₂e per $ spent.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="insurance-spending"
                type="number"
                min="0"
                value={data.spending.insurance || ''}
                onChange={(e) => updateSpending('insurance', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="education-spending">Education</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Tuition, books, and other educational expenses.
                        Factor: {EMISSION_FACTORS.education} kg CO₂e per $ spent.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="education-spending"
                type="number"
                min="0"
                value={data.spending.education || ''}
                onChange={(e) => updateSpending('education', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="recreation-spending">Recreational & Cultural Activities</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Entertainment, sports, hobbies, and cultural activities.
                        Factor: {EMISSION_FACTORS.recreation} kg CO₂e per $ spent.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="recreation-spending"
                type="number"
                min="0"
                value={data.spending.recreation || ''}
                onChange={(e) => updateSpending('recreation', parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Total Secondary Footprint</h3>
            <p className="text-3xl font-bold">
              {data.secondaryFootprint.toFixed(2)} <span className="text-base font-normal">metric tons CO₂e</span>
            </p>
            <div className="flex items-start mt-2">
              <InfoIcon className="h-4 w-4 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Your secondary footprint reflects the emissions embedded in the goods and services you consume.
                Generally, spending on services (like banking) has a lower carbon intensity than spending on physical goods.
              </p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigateToTab("publictransport")}
            >
              Previous: Bus & Rail
            </Button>
            <Button 
              type="button"
              onClick={() => navigateToTab("results")}
            >
              Next: Results
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecondaryTab;
