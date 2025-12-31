import { Helmet } from "react-helmet-async";
import { memo, useMemo, useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";
import { Instagram, Linkedin, MessageCircle, Facebook, Phone, Mail, MapPin } from "lucide-react";

const services = [
  {
    title: "Custom Website Development",
    points: [
      "Fully Customized Design & Development",
      "Scalable & Future-Ready Architecture",
      "Unique Brand-Focused Layouts",
      "Clean, Secure Custom Code",
      "Computer Vision Projects",
    ],
  },
  {
    title: "Portfolio & Personal Websites",
    points: [
      "Modern Visual Showcases",
      "Simple & Smooth Navigation",
      "Social Media & Contact Integration",
      "High-Speed Performance",
      "Strong Personal Branding",
    ],
  },
  {
    title: "Business & Corporate Websites",
    points: [
      "Professional & Trust-Building Design",
      "Lead Generation & Inquiry Forms",
      "SEO-Optimized Structure",
      "Analytics & Tracking Ready",
      "Scalable Business Growth Support",
    ],
  },
  {
    title: "Responsive Mobile Design",
    points: [
      "Mobile Optimized Layouts",
      "Seamless Cross-Device Compatibility",
      "Google Mobile-Friendly Standards",
      "Reduced Bounce Rates",
      "Enhanced User Reach",
    ],
  },
  {
    title: "Mobile App Development",
    points: [
      "Android & iOS App Solutions",
      "User-Friendly UI & UX",
      "High Performance & Security",
      "Scalable Backend Integration",
      "App Store Deployment Support",
    ],
  },
  {
    title: "Web Application Development",
    points: [
      "Powerful Web-Based Applications",
      "Secure Data Handling",
      "Real-Time Features & APIs",
      "Scalable System Architecture",
      "Cloud-Ready Deployment",
    ],
  },
  {
    title: "SEO Services for Market Reach",
    points: [
      "Search Engine Optimization (On-page & Technical SEO)",
      "Keyword Research & Competitor Analysis",
      "Website Performance & Speed Optimization",
      "Improved Search Rankings & Organic Traffic",
      "Long-Term Digital Visibility Growth",
    ],
  },
  {
    title: "Game Development",
    points: [
      "2D & 3D Game Development",
      "Cross-Platform Game Solutions",
      "Engaging Gameplay Mechanics",
      "High-Quality Graphics & Animation",
      "Game Testing & Optimization",
    ],
  },
  {
    title: "UI / UX Design",
    points: [
      "User-Centric Design Approach",
      "Interactive Wireframes & Prototypes",
      "Clean & Modern Interfaces",
      "Improved User Engagement",
      "Brand-Consistent Visuals",
    ],
  },
  {
    title: "IoT Solutions & Hardware Projects",
    points: [
      "Smart Device Development",
      "Sensor & Microcontroller Integration",
      "Real-Time Data Monitoring",
      "Cloud & Mobile Connectivity",
      "Industry & Academic Ready Solutions",
    ],
  },
  {
    title: "Final Year Project Development",
    points: [
      "Complete Project Implementation",
      "Latest Technologies & Domains",
      "Working Models & Source Code",
      "Detailed Documentation & Reports",
      "Viva & Presentation Support",
    ],
  },
  {
    title: "Support & Maintenance",
    points: [
      "Continuous Website & App Monitoring",
      "Security Updates & Bug Fixes",
      "Performance Optimization & Uptime Support",
      "Feature Enhancements & Version Updates",
      "Reliable Long-Term Technical Assistance",
    ],
  },
];

// Optimized Service Card
const ServiceCard = memo(({ service, index }: { service: typeof services[0]; index: number }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Pre-apply will-change to prepare the compositor
          setShouldAnimate(true);

          // Micro-stagger for internal scheduling
          const delay = (index % 3) * 50;

          const timer = setTimeout(() => {
            setIsVisible(true);

            // Clean up will-change after animation finishes (700ms transition)
            const cleanupTimer = setTimeout(() => {
              setShouldAnimate(false);
            }, 800);

            return () => clearTimeout(cleanupTimer);
          }, delay);

          observer.unobserve(entry.target);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
        } transition-all duration-700 ease-out`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
        willChange: shouldAnimate ? 'transform, opacity' : 'auto',
      }}
    >
      {/* Timeline dot */}
      <div
        className="hidden md:flex absolute left-1/2 w-4 h-4 rounded-full bg-primary z-10"
        style={{
          transform: 'translateX(-50%) translateZ(0)',
          boxShadow: '0 0 12px hsl(174 72% 56% / 0.5)',
        }}
      />

      {/* Card */}
      <div className={`w-full md:w-[calc(50%-2rem)] ${isEven ? "md:pr-8" : "md:pl-8"}`}>
        <div
          className="service-card-optimized p-6 md:p-8 rounded-2xl group relative"
          style={{
            transform: 'translateZ(0)',
          }}
        >
          {/* Subtle hover overlay for the glow effect to avoid heavy repaints */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl" style={{ transform: 'translateZ(0)' }} />

          <div className="relative z-10 flex items-start gap-4 mb-6">
            <span
              className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg"
              style={{ transform: 'translateZ(0)' }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
              {service.title}
            </h3>
          </div>
          <ul className="relative z-10 space-y-3 pl-14">
            {service.points.map((point, pointIndex) => (
              <li
                key={pointIndex}
                className="flex items-start gap-3 text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block w-[calc(50%-2rem)]" aria-hidden="true" />
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

// Optimized Social Button
const SocialButton = memo(({
  href,
  hoverColor,
  icon: Icon,
  label
}: {
  href: string;
  hoverColor: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`social-btn-optimized w-14 h-14 rounded-full flex items-center justify-center group`}
    style={{
      transform: 'translate3d(0, 0, 0)',
    }}
    aria-label={label}
    data-hover-color={hoverColor}
  >
    <Icon className={`w-6 h-6 text-muted-foreground group-hover:${hoverColor} transition-colors duration-200`} />
  </a>
));

SocialButton.displayName = 'SocialButton';

const Services = () => {
  const servicesList = useMemo(() => services, []);
  const galaxyRef = useRef<HTMLDivElement>(null);
  const [galaxyActive, setGalaxyActive] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setGalaxyActive(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (galaxyRef.current) {
      observer.observe(galaxyRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>Services | DexLora Innovations</title>
        <meta
          name="description"
          content="DexLora Innovations offers custom website development, mobile apps, UI/UX design, IoT solutions, and more. Explore our full range of digital services."
        />
      </Helmet>

      <style>{`
        /* Optimized glass effect - promoting to compositor layer and simplifying paint */
        .service-card-optimized {
          background: hsl(222 47% 8% / 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid hsl(222 30% 18% / 0.3);
          box-shadow: 0 0 30px -10px hsl(174 72% 56% / 0.1);
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
          /* GPU promotion managed via JS will-change logic */
          position: relative;
        }

        /* Use pseudo-element for hover shadow/border to avoid repainting the main card */
        .service-card-optimized::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          box-shadow: 0 0 40px -10px hsl(174 72% 56% / 0.2);
          border: 1px solid hsl(174 72% 56% / 0.4);
          opacity: 0;
          transition: opacity 0.3s ease-out;
          will-change: opacity;
          z-index: 20; /* Above content to ensure border visibility, or below? Border should be on top. */
        }

        .service-card-optimized:hover::after {
          opacity: 1;
        }
        
        /* Optimized social buttons */
        .social-btn-optimized {
          background: hsl(222 47% 8% / 0.5);
          border: 1px solid hsl(222 30% 18% / 0.3);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          position: relative;
          overflow: hidden; /* For social buttons, overflow hidden is fine as they are small */
          transition: transform 0.2s ease-out; 
        }

        .social-btn-optimized:hover {
          transform: scale(1.05) translate3d(0,0,0);
        }

        /* Use pseudo for social hover colors to avoid repaints */
        .social-btn-optimized::before {
          content: "";
          position: absolute;
          inset: 0;
          background: transparent;
          border-radius: inherit;
          border: 1px solid transparent;
          box-shadow: none;
          opacity: 0;
          transition: opacity 0.2s ease-out;
          pointer-events: none;
        }

        .social-btn-optimized:hover::before {
          opacity: 1;
        }
        
        .social-btn-optimized[data-hover-color="primary"]::before {
          border-color: hsl(174 72% 56% / 0.5);
          box-shadow: 0 4px 20px -4px hsl(174 72% 56% / 0.3);
        }

        .social-btn-optimized[data-hover-color="pink"]::before {
          border-color: hsl(330 80% 60% / 0.5);
          box-shadow: 0 4px 20px -4px hsl(330 80% 60% / 0.3);
        }
        
        .social-btn-optimized[data-hover-color="green"]::before {
          border-color: hsl(142 70% 45% / 0.5);
          box-shadow: 0 4px 20px -4px hsl(142 70% 45% / 0.3);
        }
        
        .social-btn-optimized[data-hover-color="blue"]::before {
          border-color: hsl(210 90% 50% / 0.5);
          box-shadow: 0 4px 20px -4px hsl(210 90% 50% / 0.3);
        }
        
        .social-btn-optimized[data-hover-color="sky"]::before {
          border-color: hsl(200 90% 50% / 0.5);
          box-shadow: 0 4px 20px -4px hsl(200 90% 50% / 0.3);
        }
        
        .social-btn-optimized[data-hover-color="blue-dark"]::before {
          border-color: hsl(220 90% 50% / 0.5);
          box-shadow: 0 4px 20px -4px hsl(220 90% 50% / 0.3);
        }
        
        /* Timeline optimization */
        .timeline-line-optimized {
          background: linear-gradient(to bottom, 
            hsl(174 72% 56% / 0.5), 
            hsl(200 80% 50% / 0.3), 
            hsl(174 72% 56% / 0.5)
          );
          transform: translate3d(0, 0, 0);
        }
      `}</style>

      <Navbar />

      <main className="min-h-screen bg-background pt-16 relative overflow-x-hidden">
        {/* Hero Section */}
        <section className="section-padding py-20 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="animate-fade-up" style={{ willChange: 'transform, opacity' }}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                  OUR
                  <br />
                  <span className="gradient-text">SERVICES</span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mt-6 rounded-full" />
              </div>

              <div className="animate-fade-up-delay-1" style={{ willChange: 'transform, opacity' }}>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  DexLora Innovations delivers end-to-end digital and smart technology solutions.
                  We blend creativity, engineering, and innovation to build scalable products.
                  From websites and applications to IoT hardware and UI/UX design,
                  our services are crafted to support growth, performance, and future readiness.
                  Every solution is tailored to real-world business and technology needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Flow Section */}
        <section className="section-padding py-16 md:py-24 relative" ref={galaxyRef}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              contain: 'strict',
              transform: 'translateZ(0)'
            }}
          >
            {galaxyActive && (
              <Particles
                particleColors={['#ffffff', '#38bdf8']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
              />
            )}
          </div>

          <div className="max-w-6xl mx-auto relative" style={{ zIndex: 1, contain: 'layout' }}>
            <div className="relative">
              <div
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px timeline-line-optimized"
                aria-hidden="true"
              />

              <div className="space-y-12 md:space-y-16">
                {servicesList.map((service, index) => (
                  <ServiceCard
                    key={index}
                    service={service}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer / Contact Strip */}
        <section className="section-padding py-16 md:py-20 bg-card/50 border-t border-border/30 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  DexLora <span className="gradient-text">Innovations</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Anyone with a project idea can propose it to us. We help turn ideas into websites, mobile apps, hardware projects, or games. From concept to completion, we support full development. Idea owners can collaborate and customize their project. We transform innovative ideas into real products.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Tamil Nadu, India</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary" />
                    <a
                      href="mailto:dexlora.innovations@gmail.com"
                      className="hover:text-foreground transition-colors duration-200"
                    >
                      dexlora.innovations@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-5 h-5 text-primary" />
                    <a
                      href="tel:+917092269839"
                      className="hover:text-foreground transition-colors duration-200"
                    >
                      +91 7092269839
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-6 md:ml-auto">
                <h3 className="text-xl font-semibold text-foreground">Connect With Us</h3>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <SocialButton href="mailto:dexlora.innovations@gmail.com" hoverColor="text-primary" icon={Mail} label="Email Us" />
                  <SocialButton href="https://www.instagram.com/dexlora_innovations?utm_source=qr&igsh=MXU2amV0eGZyeWNscQ==" hoverColor="text-pink-500" icon={Instagram} label="Instagram" />
                  <SocialButton href="https://chat.whatsapp.com/FOcvkxkZRoZKLaQTKU3uCI" hoverColor="text-green-500" icon={MessageCircle} label="WhatsApp" />
                  <SocialButton href="https://www.linkedin.com/in/dexlora-innovations/" hoverColor="text-blue-500" icon={Linkedin} label="LinkedIn" />
                  <SocialButton
                    href="https://x.com/DexLora3994"
                    hoverColor="text-sky-500"
                    icon={() => (
                      <svg className="w-6 h-6 transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    )}
                    label="Twitter"
                  />
                  <SocialButton href="https://www.facebook.com/profile.php?id=61585169746090" hoverColor="text-blue-600" icon={Facebook} label="Facebook" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Services;
