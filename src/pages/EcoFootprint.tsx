
import React from "react";
import Hero from "@/components/Hero";
import FootprintCalculator from "@/components/FootprintCalculator";

const EcoFootprint = () => {
  return (
    <div className="min-h-screen">
      <Hero
        title="Personal Carbon Footprint Calculator"
        subtitle="Measure your carbon impact across different aspects of your lifestyle to better understand and reduce your environmental footprint."
        className="pt-32 pb-16"
      />
      
      <section className="py-12 bg-white">
        <div className="eco-container">
          <FootprintCalculator />
        </div>
      </section>
    </div>
  );
};

export default EcoFootprint;
