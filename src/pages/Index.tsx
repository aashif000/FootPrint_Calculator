
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Droplet, BarChart, Lightbulb, Globe, Activity } from "lucide-react";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Measure Your Environmental Impact"
        subtitle="Calculate the carbon and water footprints of agricultural products with precision and clarity."
        ctaText="Try Calculator"
        ctaLink="/calculator"
        imageBackground={true}
      />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="eco-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">Advanced Environmental Footprint Analysis</h2>
            <p className="section-subtitle">
              Our calculators provide detailed insights into the environmental impact of agricultural products, 
              powered by cutting-edge AI technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Leaf}
              title="Carbon Footprint"
              description="Calculate the total greenhouse gas emissions associated with agricultural products throughout their lifecycle."
            />
            <FeatureCard
              icon={Droplet}
              title="Water Footprint"
              description="Measure the total volume of freshwater used to produce goods, including irrigation, processing, and dilution of pollutants."
            />
            <FeatureCard
              icon={BarChart}
              title="Detailed Analysis"
              description="Get comprehensive breakdowns of environmental impact factors with precise visualizations and metrics."
            />
            <FeatureCard
              icon={Globe}
              title="Regional Context"
              description="Compare environmental impacts across different regions and production methods around the world."
            />
            <FeatureCard
              icon={Lightbulb}
              title="Smart Recommendations"
              description="Receive AI-powered suggestions to reduce environmental impact based on your specific inputs."
            />
            <FeatureCard
              icon={Activity}
              title="Real-Time Calculations"
              description="Get instant results using the latest environmental impact data and methodologies."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="eco-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="section-title">Ready to calculate your environmental impact?</h2>
            <p className="section-subtitle">
              Our calculators provide detailed insights into the carbon and water footprints of 
              agricultural products, helping you make more sustainable choices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg" className="bg-eco-carbon hover:bg-eco-carbon/90">
                <Link to="/calculator" className="flex items-center">
                  <Leaf className="mr-2 h-5 w-5" /> Carbon Calculator
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-eco-water hover:bg-eco-water/90">
                <Link to="/calculator" className="flex items-center">
                  <Droplet className="mr-2 h-5 w-5" /> Water Calculator
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Preview Section */}
      <section className="py-20 bg-white">
        <div className="eco-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Why Calculate Environmental Footprints?</h2>
              <p className="text-muted-foreground mb-6">
                Understanding the environmental impact of agricultural products is essential for 
                sustainable decision-making in both business and consumer contexts.
              </p>
              <p className="text-muted-foreground mb-6">
                Our calculators leverage the power of Google's Gemini AI to provide accurate, 
                context-aware assessments of carbon and water footprints across the entire 
                agricultural supply chain.
              </p>
              <Button asChild variant="outline">
                <Link to="/what-we-do" className="flex items-center">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-muted rounded-xl p-6 glass-panel">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Environmental Transparency</h3>
                    <p className="text-sm text-muted-foreground">
                      Gain visibility into the true environmental cost of agricultural products.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 rounded-full p-2 mt-1">
                    <Lightbulb className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Data-Driven Decisions</h3>
                    <p className="text-sm text-muted-foreground">
                      Make informed choices based on quantifiable environmental metrics.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-eco-carbon/10 rounded-full p-2 mt-1">
                    <Globe className="h-5 w-5 text-eco-carbon" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Sustainable Future</h3>
                    <p className="text-sm text-muted-foreground">
                      Contribute to global sustainability goals by understanding and reducing impacts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
