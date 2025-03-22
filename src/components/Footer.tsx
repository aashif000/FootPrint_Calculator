
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-16 pb-12 border-t">
      <div className="eco-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
              <div className="flex items-center">
                <span className="text-eco-leaf">Eco</span>
                <span className="text-eco-carbon">Footprint</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Helping businesses and individuals understand and reduce their 
              environmental impact through cutting-edge technology.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-sm font-medium mb-4">Pages</h3>
            <ul className="space-y-3">
              {["Home", "What We Do", "Solution", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-medium mb-4">Calculators</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Carbon Footprint
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Water Footprint
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span>Currently: Remote</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={14} />
                <span>Mail</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={14} />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4"> 
              <a href="https://github.com/aashif000/FootPrint_Calculator" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/aashif000" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © {currentYear} EcoFootprint. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
