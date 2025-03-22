
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Index from "./pages/Index";
import WhatWeDo from "./pages/WhatWeDo";
import Solution from "./pages/Solution";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Calculator from "./pages/Calculator";
import EcoFootprint from "./pages/EcoFootprint";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// API key context
export const ApiKeyContext = createContext<{
  apiKey: string;
  setApiKey: (key: string) => void;
}>({
  apiKey: "",
  setApiKey: () => {},
});

const queryClient = new QueryClient();

const App = () => {
  const [apiKey, setApiKey] = useState<string>("");

  return (
    <QueryClientProvider client={queryClient}>
      <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/what-we-do" element={<WhatWeDo />} />
                  <Route path="/solution" element={<Solution />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/eco-footprint" element={<EcoFootprint />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ApiKeyContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
