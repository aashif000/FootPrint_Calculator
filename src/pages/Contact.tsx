
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Hero
        title="Contact Us"
        subtitle="Have questions about our calculators or need assistance? We'd love to hear from you."
        className="pt-32 pb-16"
      />
      
      <section className="py-12 bg-white">
        <div className="eco-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Whether you have questions about our calculators, need technical support, or want to discuss 
                collaboration opportunities, we're here to help.
              </p>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="bg-primary/10 p-3 rounded-full shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">Mail Us</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="bg-primary/10 p-3 rounded-full shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="bg-primary/10 p-3 rounded-full shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-muted-foreground">
                        <b>Currently:</b><br />
                        Remote
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-primary/5 p-6">
                    <h3 className="text-2xl font-semibold">Send Us a Message</h3>
                    <p className="text-muted-foreground">
                      We'll get back to you as soon as possible.
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please provide details about your inquiry..."
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
       
      
      {/* FAQ Preview */}
      <section className="py-12 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="eco-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Find answers to common questions about our calculators and how they work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">How accurate are the calculator results?</h3>
                <p className="text-muted-foreground">
                  Our calculators use AI technology to provide the most accurate estimates based on 
                  available scientific data and methodologies. However, results should be considered 
                  estimates rather than precise measurements.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Is my API key secure?</h3>
                <p className="text-muted-foreground">
                  Yes, your Google Gemini API key is only stored in your browser's session and is never 
                  saved permanently on our servers. The connection to the API is secure and encrypted.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">How can I get a Google Gemini API key?</h3>
                <p className="text-muted-foreground">
                  You can obtain an API key by signing up for the Google Gemini API through the 
                  Google AI developer platform. Visit <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI</a> for more information.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Can I use the calculators for commercial purposes?</h3>
                <p className="text-muted-foreground">
                  Yes, our calculators are available for both personal and commercial use. For enterprise-level 
                  solutions or custom implementations, please contact us directly to discuss your needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
