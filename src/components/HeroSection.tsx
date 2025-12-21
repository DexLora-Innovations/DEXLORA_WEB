import dexloraLogo from "@/assets/dexlora-logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      
      {/* Radial glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-primary/10 via-accent/5 to-transparent blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-secondary/10 via-secondary/5 to-transparent blur-3xl" />
      
      {/* Animated particles */}
      <div className="particles-bg">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle animate-pulse-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto pt-16">
        {/* Logo */}
        <div className="animate-fade-up mb-6">
          <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64">
            <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-primary/30 via-accent/20 to-secondary/30 rounded-full scale-125 animate-pulse-slow" />
            <img 
              src={dexloraLogo} 
              alt="DexLora Innovations Logo" 
              className="relative w-full h-full object-contain drop-shadow-2xl animate-float"
            />
          </div>
        </div>

        {/* Company name */}
        <h1 className="animate-fade-up-delay-1 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="text-foreground">DexLora</span>
          <span className="gradient-text ml-3">Innovations</span>
        </h1>

        {/* Tagline */}
        <p className="animate-fade-up-delay-2 text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light mb-8 max-w-2xl">
          Building Digital & Smart Solutions for the Future
        </p>

        {/* Services separator */}
        <div className="animate-fade-up-delay-3 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-sm md:text-base text-muted-foreground mb-10">
          <span className="px-4 py-2 glass-card text-foreground/90">Websites</span>
          <span className="text-primary text-lg">•</span>
          <span className="px-4 py-2 glass-card text-foreground/90">Apps</span>
          <span className="text-primary text-lg">•</span>
          <span className="px-4 py-2 glass-card text-foreground/90">Games</span>
          <span className="text-primary text-lg">•</span>
          <span className="px-4 py-2 glass-card text-foreground/90">UI/UX</span>
          <span className="text-primary text-lg">•</span>
          <span className="px-4 py-2 glass-card text-foreground/90">IoT Hardware</span>
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-up-delay-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/services"
            className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-full hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25"
          >
            Learn More
          </a>
          <a
            href="/contact"
            className="px-8 py-3 border-2 border-primary/50 text-foreground font-semibold rounded-full hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            Contact Us
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-up-delay-4 absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
