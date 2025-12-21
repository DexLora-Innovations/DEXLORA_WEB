import { Link } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
          DexLora <span className="gradient-text">Innovations</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-2 px-4 py-2 text-sm md:text-base font-medium bg-primary/20 text-primary border border-primary/30 rounded-full hover:bg-primary/30 transition-all duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
