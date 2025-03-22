
import React, { useState, useContext } from "react";
import { ApiKeyContext } from "@/App";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import APIKeyInput from "@/components/APIKeyInput";
import CarbonCalculator from "@/components/CarbonCalculator";
import WaterCalculator from "@/components/WaterCalculator";
import FootprintChatbot from "@/components/FootprintChatbot";
import FootprintCalculationFacts from "@/components/FootprintCalculationFacts";
import FootprintCalculator from "@/components/FootprintCalculator";
import Hero from "@/components/Hero";

const Calculator = () => {
  const { apiKey } = useContext(ApiKeyContext);
  const [activeTab, setActiveTab] = useState<string>("carbon");

  return (
    <div className="min-h-screen">
      <Hero
        title="Environmental Footprint Calculator"
        subtitle="Calculate the carbon and water footprints of agricultural products with precision and clarity."
        className="pt-32 pb-16"
      />
      
      <section className="py-12 bg-white">
        <div className="eco-container">
          {!apiKey ? (
            <div className="max-w-xl mx-auto">
              <APIKeyInput />
            </div>
          ) : (
            <div>
              <Tabs defaultValue="carbon" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 mb-8">
                  <TabsTrigger value="carbon" className="text-sm sm:text-base">Carbon Footprint</TabsTrigger>
                  <TabsTrigger value="water" className="text-sm sm:text-base">Water Footprint</TabsTrigger>
                  <TabsTrigger value="chatbot" className="text-sm sm:text-base">AI Chatbot</TabsTrigger>
                  <TabsTrigger value="facts" className="text-sm sm:text-base">Calculation Facts</TabsTrigger>
                  <TabsTrigger value="offline" className="text-sm sm:text-base">Offline Calculator</TabsTrigger>
                </TabsList>
                
                <TabsContent value="carbon" className="animate-fade-in">
                  <CarbonCalculator />
                </TabsContent>
                
                <TabsContent value="water" className="animate-fade-in">
                  <WaterCalculator />
                </TabsContent>
                
                <TabsContent value="chatbot" className="animate-fade-in">
                  <FootprintChatbot />
                </TabsContent>
                
                <TabsContent value="facts" className="animate-fade-in">
                  <FootprintCalculationFacts />
                </TabsContent>
                
                <TabsContent value="offline" className="animate-fade-in">
                  <div className="max-w-6xl mx-auto">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-center mb-2">Offline Carbon Footprint Calculator</h2>
                      <p className="text-muted-foreground text-center">
                        Calculate your carbon footprint with our comprehensive questionnaire - no internet required for calculations.
                      </p>
                    </div>
                    <FootprintCalculator />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Calculator;
