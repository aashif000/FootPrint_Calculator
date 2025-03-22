
// Format a number with commas
export const formatNumber = (num: number): string => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
};

// Generate random data for development/testing purposes
export const generateDummyData = (type: "carbon" | "water") => {
  if (type === "carbon") {
    return {
      totalFootprint: Math.random() * 100 + 10,
      unit: "kg CO2e",
      breakdown: [
        {
          category: "Production",
          value: Math.random() * 50 + 5,
          percentage: Math.random() * 60
        },
        {
          category: "Transport",
          value: Math.random() * 30 + 3,
          percentage: Math.random() * 30
        },
        {
          category: "Processing",
          value: Math.random() * 20 + 2,
          percentage: Math.random() * 20
        }
      ],
      recommendations: [
        "Switch to organic farming methods to reduce fertilizer emissions",
        "Optimize transport routes to minimize distance traveled",
        "Implement renewable energy sources in processing facilities"
      ]
    };
  } else {
    return {
      totalFootprint: Math.random() * 1000 + 100,
      unit: "liters",
      breakdown: [
        {
          category: "Blue Water",
          value: Math.random() * 500 + 50,
          percentage: Math.random() * 50
        },
        {
          category: "Green Water",
          value: Math.random() * 400 + 40,
          percentage: Math.random() * 40
        },
        {
          category: "Grey Water",
          value: Math.random() * 100 + 10,
          percentage: Math.random() * 10
        }
      ],
      recommendations: [
        "Implement drip irrigation to reduce water usage",
        "Harvest rainwater for irrigation purposes",
        "Use drought-resistant crop varieties",
        "Implement precision agriculture techniques"
      ]
    };
  }
};

// Validate the API key format (basic validation)
export const isValidApiKey = (key: string): boolean => {
  // Google API keys are typically around 39 characters
  return key.length >= 20 && key.length <= 50;
};
