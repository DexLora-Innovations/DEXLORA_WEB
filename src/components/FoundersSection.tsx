import { useState, useEffect, useRef } from "react";
import { Phone, Mail, Linkedin } from "lucide-react";
import Particles from "./Particles";

interface Founder {
  name: string;
  role: string;
  phone: string;
  email: string;
  linkedin: string;
  photo: string;
}

const founders: Founder[] = [
  {
    name: "Aravind Muthiah M",
    role: "Founder & CEO",
    phone: "9445180946",
    email: "aravindmuthiah23@gmail.com",
    linkedin: "https://www.linkedin.com/in/aravind-muthiah-m/",
    photo: "/aravind.jpg",
  },
  {
    name: "Vinnarasu R",
    role: "Co-Founder & COO",
    phone: "7092269839",
    email: "r.vinnarasu2006@gmail.com",
    linkedin: "https://www.linkedin.com/in/vinnarasu-r-50439b328/",
    photo: "/vinnarasu.png",
  },
  {
    name: "Pruthevi S",
    role: "Co-Founder & CTO",
    phone: "7200402867",
    email: "pruthevis9d@gmail.com",
    linkedin: "https://www.linkedin.com/in/pruthevi-s/",
    photo: "/pruthevi.jpg",
  },
];

const FounderCard = ({ founder, index }: { founder: Founder; index: number }) => {
  return (
    <div
      className="glass-card-hover p-8 flex flex-col items-center text-center group"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Profile photo with gradient border */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent to-secondary p-0.5">
          <img
            src={founder.photo}
            alt={founder.name}
            className="w-full h-full rounded-full object-cover"
            style={index === 0 ? { objectPosition: 'top' } : undefined}
          />
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Name */}
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
        {founder.name}
      </h3>

      {/* Role */}
      <p className="text-primary font-medium mb-6">{founder.role}</p>

      {/* Contact info */}
      <div className="space-y-3 mb-6 w-full">
        <a
          href={`tel:+91${founder.phone}`}
          className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Phone className="w-4 h-4 text-primary" />
          <span className="text-sm">+91 {founder.phone}</span>
        </a>
        <a
          href={`mailto:${founder.email}`}
          className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Mail className="w-4 h-4 text-primary" />
          <span className="text-sm break-all">{founder.email}</span>
        </a>
      </div>

      {/* LinkedIn button */}
      <a
        href={founder.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-foreground font-medium transition-all duration-300 hover:from-primary/30 hover:to-secondary/30 hover:border-primary/50 hover:scale-105"
      >
        <Linkedin className="w-4 h-4" />
        <span>View Profile</span>
      </a>
    </div>
  );
};

const FoundersSection = () => {
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
    <section ref={sectionRef} className="section-padding relative overflow-hidden" id="founders">
      {/* Particles Background - Optimized visibility and count */}
      <div className="absolute inset-0 z-0" style={{ contain: 'strict', transform: 'translateZ(0)' }}>
        {isVisible && (
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={30} // Reduced from 200 for performance
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        )}
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-gradient-radial from-primary/5 via-transparent to-transparent blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet the <span className="gradient-text">Founding Team</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Vision-driven leaders building future-ready digital and smart solutions.
          </p>
        </div>

        {/* Founders grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <FounderCard key={founder.name} founder={founder} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
