import { Link, useLocation } from "react-router-dom";
import dexloraLogo from "@/assets/logo-new.jpg";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" onClick={() => handleNavClick("/")} className="shrink-0 text-lg sm:text-xl md:text-2xl font-bold text-foreground tracking-tight flex items-center gap-2 sm:gap-3">
          <img src={dexloraLogo} alt="DexLora Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-md" />
          <span className="whitespace-nowrap">
            DexLora <span className="gradient-text">Innovations</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => handleNavClick("/contact")}
            className="ml-2 px-4 py-2 text-base font-medium bg-primary/20 text-primary border border-primary/30 rounded-full hover:bg-primary/30 transition-all duration-200"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-l border-border/30">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2 mb-8">
                  <img src={dexloraLogo} alt="DexLora Logo" className="w-8 h-8 object-contain rounded-md" />
                  <span>DexLora <span className="gradient-text">Innovations</span></span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => handleNavClick("/contact")}
                  className="mt-4 px-6 py-3 text-center text-lg font-semibold bg-primary/20 text-primary border border-primary/30 rounded-xl hover:bg-primary/30 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
