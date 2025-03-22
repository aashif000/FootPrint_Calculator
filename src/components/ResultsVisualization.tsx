
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";

interface ResultsVisualizationProps {
  data: any;
  type: "carbon" | "water";
}

const ResultsVisualization: React.FC<ResultsVisualizationProps> = ({
  data,
  type
}) => {
  // Colors for the charts
  const colors = type === "carbon" 
    ? ["#424242", "#616161", "#757575", "#9E9E9E", "#BDBDBD"]
    : ["#2196F3", "#64B5F6", "#90CAF9", "#BBDEFB", "#E3F2FD"];
    
  const mainColor = type === "carbon" ? "#424242" : "#2196F3";
  
  // Format the data for the charts
  const pieData = data.breakdown?.map((item: any) => ({
    name: item.category,
    value: item.percentage
  })) || [];
  
  const barData = data.breakdown?.map((item: any) => ({
    name: item.category,
    value: item.value
  })) || [];

  return (
    <div className="animate-fade-in mt-8 space-y-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className={cn(
            "text-2xl font-bold",
            type === "carbon" ? "text-eco-carbon" : "text-eco-water"
          )}>
            {type === "carbon" ? "Carbon Footprint Results" : "Water Footprint Results"}
          </CardTitle>
          <CardDescription>
            Based on your inputs, here's the estimated {type} footprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center mb-6">
            <div className={cn(
              "text-4xl md:text-5xl font-bold py-4 px-8 rounded-xl",
              type === "carbon" ? "bg-eco-carbon/10" : "bg-eco-water/10"
            )}>
              {data.totalFootprint} {data.unit}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div className="bg-white rounded-xl p-4 shadow-sm h-80">
              <h3 className="text-lg font-medium mb-2 text-center">Breakdown by Percentage</h3>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill={mainColor}
                    dataKey="value"
                  >
                    {pieData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(1)}%`, 'Percentage']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Bar Chart */}
            <div className="bg-white rounded-xl p-4 shadow-sm h-80">
              <h3 className="text-lg font-medium mb-2 text-center">Breakdown by Value</h3>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart
                  data={barData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(2)} ${data.unit}`, 'Amount']} 
                  />
                  <Legend />
                  <Bar dataKey="value" fill={mainColor}>
                    {barData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>
              Based on the analysis, here are some recommendations to reduce your {type} footprint
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              {data.recommendations.map((recommendation: string, index: number) => (
                <li key={index} className="text-muted-foreground">{recommendation}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResultsVisualization;
