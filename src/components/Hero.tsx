
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
  subtitleClassName?: string;
  imageBackground?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink = "/calculator",
  className,
  subtitleClassName,
  imageBackground = false,
}) => {
  return (
    <section 
      className={cn(
        "relative pt-32 pb-20 overflow-hidden",
        imageBackground && "bg-[url('/hero-bg.jpg')] bg-cover bg-center",
        className
      )}
    >
      {imageBackground && (
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/40 backdrop-blur-xs" />
      )}
      
      <div className="eco-container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="animate-fade-up text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {title}
          </h1>
          <p className={cn(
            "animate-fade-up animation-delay-200 mt-6 text-lg md:text-xl text-muted-foreground",
            subtitleClassName
          )}>
            {subtitle}
          </p>
          
          {ctaText && (
            <div className="animate-fade-up animation-delay-300 mt-10">
              <Link
                to={ctaLink}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/20"
              >
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
