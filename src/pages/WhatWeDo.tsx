
import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Droplet, LineChart, ArrowRight, Info, CheckCircle2 } from "lucide-react";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const WhatWeDo = () => {
  return (
    <div className="min-h-screen">
      <Hero
        title="What We Do"
        subtitle="We provide precision tools to measure and understand the environmental impact of agricultural products."
        className="pt-32 pb-16"
      />
      
      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="eco-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  At EcoFootprint, we're dedicated to making environmental impact assessment accessible, 
                  accurate, and actionable. Our mission is to empower businesses, researchers, and 
                  individuals with the tools they need to understand and reduce their environmental footprint.
                </p>
                <p className="text-muted-foreground mb-4">
                  Using cutting-edge AI technology and established scientific methodologies, we provide 
                  detailed insights into the carbon and water footprints of agricultural products 
                  throughout their lifecycle.
                </p>
              </div>

              <Separator />
              
              <div>
                <h2 className="text-3xl font-semibold mb-4">Our Approach</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-eco-carbon/10 p-2 rounded-full">
                          <Leaf className="h-5 w-5 text-eco-carbon" />
                        </div>
                        <h3 className="text-xl font-medium">Carbon Footprint</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Our carbon footprint calculator assesses greenhouse gas emissions across the entire 
                        lifecycle of agricultural products, from farm to distribution.
                      </p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-eco-carbon shrink-0 mt-0.5" />
                          <span className="text-sm">Production emissions (fertilizers, machinery)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-eco-carbon shrink-0 mt-0.5" />
                          <span className="text-sm">Processing and packaging impacts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-eco-carbon shrink-0 mt-0.5" />
                          <span className="text-sm">Transportation and distribution emissions</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-eco-water/10 p-2 rounded-full">
                          <Droplet className="h-5 w-5 text-eco-water" />
                        </div>
                        <h3 className="text-xl font-medium">Water Footprint</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Our water footprint calculator measures the total freshwater used to produce 
                        agricultural goods, including direct and indirect consumption.
                      </p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-eco-water shrink-0 mt-0.5" />
                          <span className="text-sm">Blue water (surface and groundwater for irrigation)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-eco-water shrink-0 mt-0.5" />
                          <span className="text-sm">Green water (rainwater consumed)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-eco-water shrink-0 mt-0.5" />
                          <span className="text-sm">Grey water (freshwater needed to dilute pollutants)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="text-3xl font-semibold mb-4">Our Methodology</h2>
                <p className="text-muted-foreground mb-6">
                  We combine established scientific methodologies with advanced AI techniques to provide accurate
                  environmental footprint assessments. Our calculations are based on:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="bg-primary/10 p-2 rounded-full shrink-0">
                      <LineChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Life Cycle Assessment (LCA)</h3>
                      <p className="text-sm text-muted-foreground">
                        We use internationally recognized LCA methodologies to assess environmental impacts 
                        across the entire product lifecycle, from raw material extraction to disposal.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="bg-primary/10 p-2 rounded-full shrink-0">
                      <Info className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Regional Context Adaptation</h3>
                      <p className="text-sm text-muted-foreground">
                        Our calculators adjust results based on regional factors such as climate, 
                        agricultural practices, energy mix, and water availability.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="bg-primary/10 p-2 rounded-full shrink-0">
                      <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Production Method Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        We account for different production methods (conventional, organic, etc.) 
                        and their varying environmental impacts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-4">Why It Matters</h3>
                  <p className="text-muted-foreground mb-4">
                    Understanding environmental footprints is crucial for:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Informing sustainable production practices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Supporting environmentally conscious consumer choices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Identifying hotspots for environmental impact reduction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Meeting sustainability reporting requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Developing more sustainable agricultural systems</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-4">Try Our Calculators</h3>
                  <p className="text-muted-foreground mb-6">
                    Experience the power of our environmental footprint calculators and gain valuable insights.
                  </p>
                  <div className="space-y-3">
                    <Button asChild className="w-full bg-eco-carbon hover:bg-eco-carbon/90">
                      <Link to="/calculator" className="flex items-center justify-center">
                        <Leaf className="mr-2 h-5 w-5" /> Carbon Calculator
                      </Link>
                    </Button>
                    <Button asChild className="w-full bg-eco-water hover:bg-eco-water/90">
                      <Link to="/calculator" className="flex items-center justify-center">
                        <Droplet className="mr-2 h-5 w-5" /> Water Calculator
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-4">Learn More</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link to="/solution" className="flex items-center text-primary hover:underline">
                        Our Solution <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/about" className="flex items-center text-primary hover:underline">
                        About Us <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="flex items-center text-primary hover:underline">
                        Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeDo;
