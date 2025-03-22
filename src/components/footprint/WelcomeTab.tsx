
import React from "react";
import { FormEvent } from "react";
import { FootprintData } from "@/components/FootprintCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface WelcomeTabProps {
  data: FootprintData;
  updateData: (data: Partial<FootprintData>) => void;
}

// Countries list (abbreviated for example)
const countries = [
  "United States", "United Kingdom", "Canada", "Australia", 
  "Germany", "France", "Japan", "China", "India", "Brazil"
];

// States list for US (abbreviated)
const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", 
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia"
];

const WelcomeTab: React.FC<WelcomeTabProps> = ({ data, updateData }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Form submission logic if needed
  };

  // Helper function to navigate to another tab
  const navigateToTab = (tabValue: string) => {
    const tabElement = document.querySelector(`[data-value="${tabValue}"]`) as HTMLElement;
    if (tabElement) tabElement.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Welcome to the web's leading carbon footprint calculator</CardTitle>
        <CardDescription>
          Get started by telling us a bit about yourself and the time period you want to calculate for.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Where do you live?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select 
                  value={data.country} 
                  onValueChange={(value) => updateData({ country: value })}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country.toLowerCase()}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  This helps us calculate using regional emissions factors.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State/Province/Region</Label>
                <Select 
                  disabled={data.country !== 'united states'} 
                  value={data.state} 
                  onValueChange={(value) => updateData({ state: value })}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder={data.country === 'united states' ? "Select your state" : "Select country first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {usStates.map((state) => (
                      <SelectItem key={state} value={state.toLowerCase()}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  If you don't know or your region isn't listed, we'll use national averages.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Enter the period this calculation covers</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !data.startDate && "text-muted-foreground"
                      )}
                      id="start-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {data.startDate ? format(data.startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={data.startDate}
                      onSelect={(date) => updateData({ startDate: date })}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !data.endDate && "text-muted-foreground"
                      )}
                      id="end-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {data.endDate ? format(data.endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={data.endDate}
                      onSelect={(date) => updateData({ endDate: date })}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              If you're calculating for a full year, you can select dates exactly one year apart.
              Defaults to one year if not specified.
            </p>
          </div>
          
          <div className="flex justify-end">
            <Button type="button" onClick={() => navigateToTab("house")}>
              Next: House
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WelcomeTab;
