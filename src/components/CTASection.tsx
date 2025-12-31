import { useState, useEffect, useRef } from "react";
import Particles from "./Particles";
import chatIcon from "@/assets/chat-icon.png";

const CTASection = () => {
  const whatsappUrl = "https://chat.whatsapp.com/FOcvkxkZRoZKLaQTKU3uCI";
  const [isVisible, setIsVisible] = useState(false);
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
    <section ref={sectionRef} className="section-padding relative overflow-hidden bg-background" id="cta">
      {/* Particles Background - Conditional rendering for performance */}
      <div className="absolute inset-0 z-0" style={{ contain: 'strict', transform: 'translateZ(0)' }}>
        {isVisible && (
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={30} // Reduced for better performance
            particleSpread={10}
            speed={0.05}
            particleBaseSize={80}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={true}
          />
        )}
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/10 via-transparent to-muted/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gradient-radial from-primary/5 via-transparent to-transparent blur-3xl pointer-events-none" style={{ transform: 'translate3d(-50%, -50%, 0)' }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center" style={{ contain: 'layout' }}>
        {/* Main heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Have a project in mind?
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Let's transform your idea into a powerful digital experience.
        </p>

        {/* CTA Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary-glow inline-flex items-center gap-2"
        >
          LET'S WORK TOGETHER
          <img src={chatIcon} alt="" className="w-7 h-7 invert" />
        </a>

        {/* Decorative line */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/50" />
          <div className="w-2 h-2 rounded-full bg-primary/50" />
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <div className="w-2 h-2 rounded-full bg-secondary/50" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-secondary/50" />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
