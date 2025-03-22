
import { useContext } from "react";
import { ApiKeyContext } from "@/App";

interface CarbonFootprintParams {
  productType: string;
  quantity: number;
  region: string;
  productionMethod: string;
  transportDistance: number;
}

interface WaterFootprintParams {
  productType: string;
  quantity: number;
  region: string;
  productionMethod: string;
  irrigationType: string;
}

export const useGeminiApi = () => {
  const { apiKey } = useContext(ApiKeyContext);

  const sendGeminiRequest = async (messages: any[]) => {
    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: messages,
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in Gemini API request:", error);
      throw error;
    }
  };

  const calculateCarbonFootprint = async (params: CarbonFootprintParams) => {
    const { productType, quantity, region, productionMethod, transportDistance } = params;

    const systemPrompt = {
      role: "system",
      parts: [
        {
          text: `You are an expert agricultural carbon footprint calculator. Given information about agricultural products, you analyze and return a JSON object with detailed carbon footprint calculations. Always respond only with a valid JSON object containing the following fields:
          {
            "totalFootprint": numeric value for total carbon footprint,
            "unit": "kg CO2e",
            "breakdown": [
              {
                "category": name of emission category (e.g., "Production", "Transport", "Processing", etc.),
                "value": numeric value for this category,
                "percentage": percentage as decimal (0-100)
              }
            ],
            "recommendations": [array of string recommendations to reduce the footprint]
          }
          Make realistic estimates based on scientific data. If information is lacking, use reasonable assumptions based on global averages.`
        }
      ]
    };

    const userPrompt = {
      role: "user",
      parts: [
        {
          text: `Calculate the carbon footprint for:
          - Product: ${productType}
          - Quantity: ${quantity} kg
          - Region: ${region}
          - Production Method: ${productionMethod}
          - Transport Distance: ${transportDistance} km`
        }
      ]
    };

    const response = await sendGeminiRequest([systemPrompt, userPrompt]);
    
    try {
      // Extract the JSON string from the response and parse it
      const textResponse = response.candidates[0].content.parts[0].text;
      return JSON.parse(textResponse);
    } catch (error) {
      console.error("Failed to parse Gemini response:", error);
      throw new Error("Failed to process calculation results");
    }
  };

  const calculateWaterFootprint = async (params: WaterFootprintParams) => {
    const { productType, quantity, region, productionMethod, irrigationType } = params;

    const systemPrompt = {
      role: "system",
      parts: [
        {
          text: `You are an expert agricultural water footprint calculator. Given information about agricultural products, you analyze and return a JSON object with detailed water footprint calculations. Always respond only with a valid JSON object containing the following fields:
          {
            "totalFootprint": numeric value for total water footprint,
            "unit": "liters",
            "breakdown": [
              {
                "category": name of water usage category (e.g., "Blue water", "Green water", "Grey water", "Irrigation", etc.),
                "value": numeric value for this category,
                "percentage": percentage as decimal (0-100)
              }
            ],
            "recommendations": [array of string recommendations to reduce the water footprint]
          }
          Make realistic estimates based on scientific data. If information is lacking, use reasonable assumptions based on global averages.
          
          Note: "Blue water" refers to surface and groundwater used for irrigation, "Green water" refers to rainwater consumed, and "Grey water" refers to freshwater required to dilute pollutants.`
        }
      ]
    };

    const userPrompt = {
      role: "user",
      parts: [
        {
          text: `Calculate the water footprint for:
          - Product: ${productType}
          - Quantity: ${quantity} kg
          - Region: ${region}
          - Production Method: ${productionMethod}
          - Irrigation Type: ${irrigationType}`
        }
      ]
    };

    const response = await sendGeminiRequest([systemPrompt, userPrompt]);
    
    try {
      // Extract the JSON string from the response and parse it
      const textResponse = response.candidates[0].content.parts[0].text;
      return JSON.parse(textResponse);
    } catch (error) {
      console.error("Failed to parse Gemini response:", error);
      throw new Error("Failed to process calculation results");
    }
  };

  return { calculateCarbonFootprint, calculateWaterFootprint };
};
