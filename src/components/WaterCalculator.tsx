
import React, { useState, useContext } from "react";
import { toast } from "sonner";
import { Droplet } from "lucide-react";
import { ApiKeyContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useGeminiApi } from "@/hooks/useGeminiApi";
import ResultsVisualization from "./ResultsVisualization";

const WaterCalculator: React.FC = () => {
  const { apiKey } = useContext(ApiKeyContext);
  const { calculateWaterFootprint } = useGeminiApi();
  
  const [productType, setProductType] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [region, setRegion] = useState<string>("");
  const [productionMethod, setProductionMethod] = useState<string>("conventional");
  const [irrigationType, setIrrigationType] = useState<string>("surface");
  const [isRainfed, setIsRainfed] = useState<boolean>(false);
  
  const [calculationData, setCalculationData] = useState<any>(null);

  const handleCalculate = async () => {
    if (!apiKey) {
      toast.error("Please provide your Google Gemini API key first");
      return;
    }

    if (!productType || !region) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const result = await calculateWaterFootprint({
        productType,
        quantity,
        region,
        productionMethod,
        irrigationType: isRainfed ? "rainfed" : irrigationType
      });
      
      setCalculationData(result);
    } catch (error) {
      console.error("Calculation error:", error);
      toast.error("Error calculating water footprint. Please try again.");
    }
  };

  const productOptions = [
    "Wheat", "Rice", "Corn", "Soybeans", "Potatoes",
    "Tomatoes", "Apples", "Bananas", "Coffee", "Beef",
    "Chicken", "Pork", "Milk", "Eggs"
  ];

  const regionOptions = [
    "North America", "Europe", "Asia", "South America", 
    "Africa", "Australia", "Global Average"
  ];

  const productionMethodOptions = [
    { value: "conventional", label: "Conventional" },
    { value: "organic", label: "Organic" },
    { value: "regenerative", label: "Regenerative" },
    { value: "hydroponic", label: "Hydroponic" }
  ];

  const irrigationOptions = [
    { value: "surface", label: "Surface Irrigation" },
    { value: "sprinkler", label: "Sprinkler Systems" },
    { value: "drip", label: "Drip Irrigation" },
    { value: "micro", label: "Micro Irrigation" }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <Droplet className="h-5 w-5 text-eco-water" />
        <h2 className="text-2xl font-semibold">Water Footprint Calculator</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="product-type">Agricultural Product</Label>
            <Select value={productType} onValueChange={setProductType}>
              <SelectTrigger id="product-type">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {productOptions.map((product) => (
                  <SelectItem key={product} value={product.toLowerCase()}>
                    {product}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity (kg)</Label>
            <Input
              id="quantity"
              type="number"
              min="0.1"
              step="0.1"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="region">Production Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger id="region">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                {regionOptions.map((region) => (
                  <SelectItem key={region} value={region.toLowerCase()}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="production-method">Production Method</Label>
            <Select value={productionMethod} onValueChange={setProductionMethod}>
              <SelectTrigger id="production-method">
                <SelectValue placeholder="Select a method" />
              </SelectTrigger>
              <SelectContent>
                {productionMethodOptions.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              id="rainfed"
              checked={isRainfed}
              onCheckedChange={setIsRainfed}
            />
            <Label htmlFor="rainfed" className="cursor-pointer">Rainfed agriculture (no irrigation)</Label>
          </div>
          
          {!isRainfed && (
            <div className="space-y-2">
              <Label htmlFor="irrigation-type">Irrigation Type</Label>
              <Select value={irrigationType} onValueChange={setIrrigationType}>
                <SelectTrigger id="irrigation-type">
                  <SelectValue placeholder="Select irrigation type" />
                </SelectTrigger>
                <SelectContent>
                  {irrigationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <Button 
            onClick={handleCalculate} 
            className="w-full mt-8 bg-eco-water hover:bg-eco-water/90"
          >
            Calculate Water Footprint
          </Button>
        </div>
      </div>
      
      {calculationData && (
        <ResultsVisualization
          data={calculationData}
          type="water"
        />
      )}
    </div>
  );
};

export default WaterCalculator;
