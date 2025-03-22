
import React from "react";
import { Link } from "react-router-dom";
import { BrainCircuit, Droplet, Leaf, Lightbulb, Shield, Zap, ArrowRight, Check } from "lucide-react";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const Solution = () => {
  return (
    <div className="min-h-screen">
      <Hero
        title="Our Solution"
        subtitle="Leveraging Google Gemini AI to provide precise environmental impact calculations for agricultural products."
        className="pt-32 pb-16"
      />
      
      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="eco-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-semibold mb-4">Technological Approach</h2>
                <p className="text-muted-foreground mb-4">
                  Our solution combines advanced AI technology with established environmental assessment 
                  methodologies to deliver accurate, context-aware footprint calculations. By leveraging 
                  the Google Gemini AI API, we're able to process complex environmental data and provide 
                  meaningful insights in real-time.
                </p>
                <p className="text-muted-foreground mb-4">
                  Unlike traditional calculators that rely on static databases, our AI-powered approach 
                  adapts to different regions, production methods, and agricultural contexts to provide 
                  more accurate and relevant results.
                </p>
              </div>

              <Separator />
              
              <div>
                <h2 className="text-3xl font-semibold mb-6">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 bg-primary/10 p-2 rounded-full">
                      <BrainCircuit className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">AI-Powered Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Leverages Google Gemini AI to process complex environmental data and provide context-aware calculations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 bg-primary/10 p-2 rounded-full">
                      <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Carbon Footprint Calculation</h3>
                      <p className="text-sm text-muted-foreground">
                        Detailed assessment of greenhouse gas emissions across the entire agricultural product lifecycle.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 bg-primary/10 p-2 rounded-full">
                      <Droplet className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Water Footprint Calculation</h3>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive analysis of blue, green, and grey water usage in agricultural production.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 bg-primary/10 p-2 rounded-full">
                      <Lightbulb className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Smart Recommendations</h3>
                      <p className="text-sm text-muted-foreground">
                        AI-generated suggestions for reducing environmental impact based on your specific inputs.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 bg-primary/10 p-2 rounded-full">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Secure API Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        User-provided API keys are handled securely with no permanent storage of sensitive information.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 bg-primary/10 p-2 rounded-full">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Real-Time Calculations</h3>
                      <p className="text-sm text-muted-foreground">
                        Instant results with visual representations and detailed breakdowns of environmental impact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="text-3xl font-semibold mb-4">How Google Gemini AI Powers Our Solution</h2>
                <p className="text-muted-foreground mb-6">
                  The Google Gemini AI API is at the core of our calculator functionality, enabling 
                  sophisticated environmental impact analysis that would otherwise require extensive 
                  databases and complex algorithms.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="bg-primary/10 p-2 rounded-full shrink-0 mt-1">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Contextual Understanding</h3>
                      <p className="text-sm text-muted-foreground">
                        Gemini AI understands the complex relationships between agricultural practices, 
                        regional factors, and environmental impacts, allowing for more nuanced calculations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="bg-primary/10 p-2 rounded-full shrink-0 mt-1">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Knowledge Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        The AI draws on a vast knowledge base of environmental science, agricultural practices, 
                        and region-specific factors to make informed estimates and recommendations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="bg-primary/10 p-2 rounded-full shrink-0 mt-1">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Adaptive Reasoning</h3>
                      <p className="text-sm text-muted-foreground">
                        Gemini can adapt its calculations based on the specific inputs provided, filling in 
                        knowledge gaps and making reasonable assumptions when needed.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="bg-primary/10 p-2 rounded-full shrink-0 mt-1">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Structured Output</h3>
                      <p className="text-sm text-muted-foreground">
                        The API returns structured data that we can process into clear visualizations and 
                        actionable insights, making complex environmental information accessible.
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
                  <h3 className="text-xl font-medium mb-4">How It Works</h3>
                  <ol className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary font-medium text-sm">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Enter your Google Gemini API key</p>
                        <p className="text-sm text-muted-foreground">
                          Securely stored only in your browser session
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary font-medium text-sm">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Input agricultural product details</p>
                        <p className="text-sm text-muted-foreground">
                          Product type, quantity, region, production method, etc.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary font-medium text-sm">3</span>
                      </div>
                      <div>
                        <p className="font-medium">AI processes your request</p>
                        <p className="text-sm text-muted-foreground">
                          Google Gemini AI analyzes the data and calculates environmental impact
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary font-medium text-sm">4</span>
                      </div>
                      <div>
                        <p className="font-medium">View detailed results</p>
                        <p className="text-sm text-muted-foreground">
                          Get visualizations, breakdowns, and recommendations
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-4">Try Our Calculators</h3>
                  <p className="text-muted-foreground mb-6">
                    Experience the power of our AI-driven environmental footprint calculators.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/calculator" className="flex items-center justify-center">
                      Try Calculator <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-4">API Key Information</h3>
                  <p className="text-muted-foreground mb-4">
                    To use our calculators, you'll need a Google Gemini API key.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Your API key is only stored in your browser session</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">We never permanently store or share your API key</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">You can revoke the key at any time through your Google account</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <a 
                      href="https://ai.google.dev/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm flex items-center"
                    >
                      Get a Google Gemini API key <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solution;
