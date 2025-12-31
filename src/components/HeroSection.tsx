import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import dexloraLogo from "@/assets/logo-new.jpg";
import LightPillar from './LightPillar';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden overflow-x-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />

      {/* Light Pillar Animation - Optimized for performance */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, contain: 'strict', transform: 'translateZ(0)' }}>
        {isVisible && (
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={0.8}
            rotationSpeed={0.15}
            glowAmount={0.004}
            pillarWidth={2.5}
            pillarHeight={0.35}
            noiseIntensity={0.3}
            pillarRotation={0}
            interactive={false}
            mixBlendMode="normal"
          />
        )}
      </div>

      {/* Radial glow effects - optimized with composite transformation */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-primary/10 via-accent/5 to-transparent blur-3xl pointer-events-none" style={{ transform: 'translate3d(-50%, -50%, 0)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-secondary/10 via-secondary/5 to-transparent blur-3xl pointer-events-none hidden md:block" style={{ transform: 'translate3d(0, 0, 0)' }} />

      {/* Animated particles - Reduced count for performance */}
      <div className="particles-bg">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle animate-pulse-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              willChange: 'opacity, transform'
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 w-full max-w-4xl mx-auto pt-16">
        {/* Logo */}
        <div className="animate-fade-up mb-6" style={{ willChange: 'transform, opacity' }}>
          <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64">
            <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-primary/30 via-accent/20 to-secondary/30 rounded-full scale-125 animate-pulse-slow" />
            <img
              src={dexloraLogo}
              alt="DexLora Innovations Logo"
              className="relative w-full h-full object-contain drop-shadow-2xl animate-float rounded-2xl"
              style={{ willChange: 'transform' }}
            />
          </div>
        </div>

        {/* Company name */}
        <h1 className="animate-fade-up-delay-1 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6" style={{ willChange: 'transform, opacity' }}>
          <span className="text-foreground">DexLora</span>
          <span className="gradient-text ml-3">Innovations</span>
        </h1>

        {/* Tagline */}
        <p className="animate-fade-up-delay-2 text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light mb-8 max-w-2xl" style={{ willChange: 'transform, opacity' }}>
          Building Digital & Smart Solutions for the Future
        </p>

        {/* Services separator */}
        <div className="animate-fade-up-delay-3 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-sm md:text-base text-muted-foreground mb-10" style={{ willChange: 'transform, opacity' }}>
          <span className="px-4 py-2 glass-card text-foreground/90" style={{ transform: 'translateZ(0)' }}>Websites</span>
          <span className="text-primary text-lg">•</span>
          <span className="px-4 py-2 glass-card text-foreground/90" style={{ transform: 'translateZ(0)' }}>Apps</span>
          <span className="text-primary text-lg">•</span>
          <span className="px-4 py-2 glass-card text-foreground/90" style={{ transform: 'translateZ(0)' }}>Games</span>
          <span className="text-primary text-lg">•</span>
          <span className="px-4 py-2 glass-card text-foreground/90" style={{ transform: 'translateZ(0)' }}>UI/UX</span>
          <span className="text-primary text-lg">•</span>
          <span className="px-4 py-2 glass-card text-foreground/90" style={{ transform: 'translateZ(0)' }}>IoT Hardware</span>
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-up-delay-4 flex flex-wrap items-center justify-center gap-4" style={{ willChange: 'transform, opacity' }}>
          <Link
            to="/services"
            className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-full hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25"
          >
            Learn More
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 border-2 border-primary/50 text-foreground font-semibold rounded-full hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
