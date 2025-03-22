
import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Leaf, Loader2 } from "lucide-react";
import { ApiKeyContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useGeminiApi } from "@/hooks/useGeminiApi";
import ResultsVisualization from "./ResultsVisualization";

interface CalculationResult {
  carbonFootprint: number;
  unit: string;
  breakdown: {
    category: string;
    value: number;
    percentage: number;
  }[];
  recommendations: string[];
}

const CarbonCalculator: React.FC = () => {
  const { apiKey } = useContext(ApiKeyContext);
  const { calculateCarbonFootprint } = useGeminiApi();
  
  const [productType, setProductType] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [region, setRegion] = useState<string>("");
  const [productionMethod, setProductionMethod] = useState<string>("conventional");
  const [transport, setTransport] = useState<number>(100);
  
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
      const result = await calculateCarbonFootprint({
        productType,
        quantity,
        region,
        productionMethod,
        transportDistance: transport
      });
      
      setCalculationData(result);
    } catch (error) {
      console.error("Calculation error:", error);
      toast.error("Error calculating carbon footprint. Please try again.");
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

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <Leaf className="h-5 w-5 text-eco-leaf" />
        <h2 className="text-2xl font-semibold">Carbon Footprint Calculator</h2>
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
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label htmlFor="transport">Transport Distance (km): {transport}</Label>
            </div>
            <Slider
              id="transport"
              min={0}
              max={1000}
              step={10}
              value={[transport]}
              onValueChange={(values) => setTransport(values[0])}
            />
          </div>
          
          <Button 
            onClick={handleCalculate} 
            className="w-full mt-8 bg-eco-carbon hover:bg-eco-carbon/90"
          >
            Calculate Carbon Footprint
          </Button>
        </div>
      </div>
      
      {calculationData && (
        <ResultsVisualization
          data={calculationData}
          type="carbon"
        />
      )}
    </div>
  );
};

export default CarbonCalculator;
