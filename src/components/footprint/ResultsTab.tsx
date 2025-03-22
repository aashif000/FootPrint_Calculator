
import React from "react";
import { FootprintData } from "@/components/FootprintCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InfoIcon, TreePine, AlertTriangle, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

interface ResultsTabProps {
  data: FootprintData;
}

const ResultsTab: React.FC<ResultsTabProps> = ({ data }) => {
  // Prepare chart data
  const barChartData = [
    { name: "House", value: data.houseFootprint },
    { name: "Flights", value: data.flightsFootprint },
    { name: "Car", value: data.carFootprint },
    { name: "Motorbike", value: data.motorbikeFootprint },
    { name: "Public Transport", value: data.publicTransportFootprint },
    { name: "Secondary", value: data.secondaryFootprint },
  ];
  
  // Prepare pie chart data (only include non-zero values)
  const pieChartData = barChartData
    .filter(item => item.value > 0)
    .map(item => ({
      name: item.name,
      value: item.value
    }));
  
  // Colors for charts
  const colors = ["#10b981", "#3b82f6", "#f97316", "#8b5cf6", "#06b6d4", "#ec4899"];
  
  // Calculate percentage compared to average (15.24 metric tons for US)
  const averageFootprint = 15.24;
  const percentOfAverage = (data.totalFootprint / averageFootprint) * 100;
  
  // Calculate carbon offsets (approx $15 per metric ton)
  const offsetCost = data.totalFootprint * 15;
  
  // Helper function to navigate to another tab
  const navigateToTab = (tabValue: string) => {
    const tabElement = document.querySelector(`[data-value="${tabValue}"]`) as HTMLElement;
    if (tabElement) tabElement.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Your Carbon Footprint Results</CardTitle>
        <CardDescription>
          Here's a summary of your carbon footprint based on the information you provided.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-medium">Total Carbon Footprint</h3>
              <p className="text-4xl font-bold">
                {data.totalFootprint.toFixed(2)}
                <span className="text-lg font-normal ml-2">metric tons CO₂e</span>
              </p>
              
              <div className="flex items-start">
                <InfoIcon className="h-5 w-5 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  The average footprint for people in the United States is 15.24 metric tons.
                  Your footprint is approximately {percentOfAverage.toFixed(0)}% of this average.
                </p>
              </div>
              
              {data.totalFootprint > 0 && (
                <div className="flex flex-col space-y-3 mt-4">
                  <Button className="bg-secondary">
                    <TreePine className="h-4 w-4 mr-2" />
                    Offset Now (${offsetCost.toFixed(2)})
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Offset your emissions through certified carbon removal projects
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-muted p-6 rounded-lg h-[300px]">
              <h3 className="text-xl font-medium mb-4">Breakdown by Category</h3>
              {pieChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${value.toFixed(2)} tons CO₂e`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground text-center">
                    No data available. Please complete previous sections to see your breakdown.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Detailed Analysis</h3>
            <div className="h-[300px] mb-4">
              {barChartData.some(item => item.value > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Metric Tons CO₂e', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      formatter={(value: number) => [`${value.toFixed(2)} tons CO₂e`, ""]}
                    />
                    <Legend />
                    <Bar dataKey="value" name="Carbon Footprint">
                      {barChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground text-center">
                    No data available. Please complete previous sections to see your detailed analysis.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Footprint by Category</h3>
            
            <div className="space-y-4">
              {barChartData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">{item.name}</p>
                    <div className="flex items-center space-x-4">
                      <p className="text-lg font-semibold">{item.value.toFixed(2)} tons</p>
                      {item.value > 0 && (
                        <Button variant="outline" size="sm" className="text-xs h-8">
                          Offset
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ 
                        width: `${Math.min((item.value / data.totalFootprint) * 100, 100)}%`,
                        backgroundColor: colors[index % colors.length]
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-xl font-medium flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              What This Means
            </h3>
            
            <div className="bg-muted p-4 rounded-md space-y-4">
              <p className="text-sm">
                To limit global warming to 1.5°C, the average global carbon footprint needs to drop to 2 tons per person by 2050.
                {data.totalFootprint > 2 
                  ? ` Your footprint of ${data.totalFootprint.toFixed(2)} tons is ${(data.totalFootprint / 2).toFixed(1)}x higher than this target.`
                  : ` Congratulations! Your footprint of ${data.totalFootprint.toFixed(2)} tons is already below the 2050 target.`
                }
              </p>
              
              <div className="space-y-2">
                <h4 className="font-medium">Top reduction opportunities:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {data.flightsFootprint > 1 && (
                    <li>Reduce air travel or offset your flight emissions</li>
                  )}
                  {data.carFootprint > 2 && (
                    <li>Consider a more fuel-efficient vehicle or using public transport</li>
                  )}
                  {data.houseFootprint > 3 && (
                    <li>Improve home energy efficiency or switch to renewable energy</li>
                  )}
                  {data.spending.food > 3000 && (
                    <li>Reduce meat consumption or choose more local and seasonal foods</li>
                  )}
                  {data.totalFootprint < 1 && (
                    <li>Continue your low-carbon lifestyle and inspire others to do the same</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigateToTab("secondary")}
            >
              Previous: Secondary
            </Button>
            <Button 
              type="button"
              className="bg-secondary"
            >
              Save Results
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsTab;
