
import React from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const teamMembers = [
    {
      name: "Aashif",
      role: "AI Engineer",
      bio: "Aashif has over 0.6 years of experience in creating impactful AI systems, designing and developing applications.",
      image: "https://c4.wallpaperflare.com/wallpaper/507/185/242/batman-and-robin-batman-logo-batman-2021-the-batman-2021-dc-comics-hd-wallpaper-preview.jpg"
    },
    {
      name: "Emanuel",
      role: "Full Stack Developer",
      bio: "Emanuel plays important role of facing challenges and leads our technical development.",
      image: "https://images.alphacoders.com/137/thumbbig-1379590.webp"
    },
    {
      name: "Shrijanaryal",
      role: "Engineer",
      bio: "Shrijan provides overall support and organizing flow of team.",
      image: "https://c4.wallpaperflare.com/wallpaper/867/586/481/composite-superman-superman-artwork-dc-comics-wallpaper-preview.jpg"
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero
        title="About Us"
        subtitle="Meet the team behind EcoFootprint and learn about our mission to promote environmental sustainability."
        className="pt-32 pb-16"
      />
      
      {/* Mission Section */}
      <section className="py-12 bg-white">
        <div className="eco-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-subtitle">
              At EcoFootprint, we're dedicated to making environmental impact assessment accessible,
              accurate, and actionable. We believe that informed decisions lead to more sustainable practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-4">Accessibility</h3>
                <p className="text-muted-foreground">
                  We're committed to making environmental impact assessment tools available to everyone,
                  from large corporations to individual consumers and researchers.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-4">Accuracy</h3>
                <p className="text-muted-foreground">
                  We leverage cutting-edge AI technology and established scientific methodologies to provide
                  the most accurate environmental footprint calculations possible.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-4">Action</h3>
                <p className="text-muted-foreground">
                  Beyond just providing data, we aim to inspire and facilitate meaningful action toward
                  reducing environmental impacts and promoting sustainability.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Separator className="my-16" />
          
          {/* Team Section */}
          <div>
            <h2 className="section-title text-center">Our Team</h2>
            <p className="section-subtitle text-center">
              Meet the passionate individuals behind EcoFootprint who are dedicated to making a positive
              environmental impact through technology and innovation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4 mx-auto overflow-hidden rounded-full w-32 h-32 border-4 border-white shadow-md">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
          
          <Separator className="my-16" />
          
          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                EcoFootprint was founded in 2025 by a team of environmental and technology
                enthusiasts who recognized the need for more accessible and accurate environmental impact
                assessment tools.
              </p>
              <p className="text-muted-foreground mb-4">
                While working on various sustainability projects, our founders observed that many
                organizations and individuals lacked the tools to accurately measure their environmental
                footprint, particularly for agricultural products.
              </p>
              <p className="text-muted-foreground mb-4">
                With the advent of advanced AI technologies like Google Gemini, we saw an opportunity
                to create a solution that could provide detailed environmental assessments without
                requiring extensive technical knowledge or resources.
              </p>
              <p className="text-muted-foreground">
                Today, we're proud to offer a platform that empowers users to make more informed,
                environmentally conscious decisions through data-driven insights.
              </p>
            </div>
            
            <div className="bg-muted p-8 rounded-xl glass-panel">
              <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full shrink-0 mt-1">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Environmental Integrity</h4>
                    <p className="text-sm text-muted-foreground">
                      We're committed to providing accurate, science-based environmental assessments
                      that truly reflect the impact of agricultural practices.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full shrink-0 mt-1">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Technological Innovation</h4>
                    <p className="text-sm text-muted-foreground">
                      We leverage cutting-edge AI and data science to solve complex environmental
                      challenges in innovative ways.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full shrink-0 mt-1">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Accessibility</h4>
                    <p className="text-sm text-muted-foreground">
                      We believe that environmental tools should be accessible to everyone,
                      regardless of technical expertise or resources.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full shrink-0 mt-1">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Transparency</h4>
                    <p className="text-sm text-muted-foreground">
                      We're committed to being open about our methodologies, data sources,
                      and the limitations of our calculations.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="eco-container text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Calculate Your Environmental Impact?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Try our AI-powered calculators today and gain valuable insights into the carbon and
            water footprints of your agricultural products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/calculator" className="flex items-center">
                Try Our Calculators <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact" className="flex items-center">
                <Mail className="mr-2 h-4 w-4" /> Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
