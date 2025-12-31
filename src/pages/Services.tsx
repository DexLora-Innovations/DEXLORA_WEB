import { Helmet } from "react-helmet-async";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";
import {
  Globe,
  Smartphone,
  Code2,
  Search,
  Gamepad2,
  Palette,
  Wifi,
  Wrench,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Custom Website Development",
    description: "Build powerful, scalable, and brand-focused websites with clean custom code and future-ready architecture.",
    features: [
      "Fully Customized Design & Development",
      "Scalable & Future-Ready Architecture",
      "Clean, Secure Custom Code",
      "Unique Brand-Focused Layouts"
    ],
    accentColor: "from-cyan-500 to-blue-600"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications with superior UI/UX and high-performance architecture.",
    features: [
      "Android & iOS App Solutions",
      "User-Friendly UI & UX",
      "High Performance & Security",
      "App Store Deployment Support"
    ],
    accentColor: "from-purple-500 to-pink-600"
  },
  {
    icon: Code2,
    title: "Web Application Development",
    description: "Create robust web applications with real-time features, secure data handling, and scalable architecture.",
    features: [
      "Powerful Web-Based Applications",
      "Secure Data Handling",
      "Real-Time Features & APIs",
      "Cloud-Ready Deployment"
    ],
    accentColor: "from-green-500 to-emerald-600"
  },
  {
    icon: Palette,
    title: "UI / UX Design",
    description: "User-centric designs with interactive prototypes and modern interfaces that boost engagement.",
    features: [
      "User-Centric Design Approach",
      "Interactive Wireframes & Prototypes",
      "Clean & Modern Interfaces",
      "Brand-Consistent Visuals"
    ],
    accentColor: "from-orange-500 to-red-600"
  },
  {
    icon: Search,
    title: "SEO Services",
    description: "Comprehensive SEO strategies to improve search rankings and drive organic traffic growth.",
    features: [
      "On-page & Technical SEO",
      "Keyword Research & Analysis",
      "Performance Optimization",
      "Improved Search Rankings"
    ],
    accentColor: "from-yellow-500 to-orange-600"
  },
  {
    icon: Gamepad2,
    title: "Game Development",
    description: "Engaging 2D & 3D games with stunning graphics and cross-platform compatibility.",
    features: [
      "2D & 3D Game Development",
      "Cross-Platform Solutions",
      "Engaging Gameplay Mechanics",
      "High-Quality Graphics"
    ],
    accentColor: "from-pink-500 to-rose-600"
  },
  {
    icon: Wifi,
    title: "IoT Solutions",
    description: "Smart device development with sensor integration and real-time cloud connectivity.",
    features: [
      "Smart Device Development",
      "Sensor Integration",
      "Real-Time Data Monitoring",
      "Cloud & Mobile Connectivity"
    ],
    accentColor: "from-blue-500 to-indigo-600"
  },
  {
    icon: BookOpen,
    title: "Final Year Projects",
    description: "Complete project implementation with latest technologies, documentation, and presentation support.",
    features: [
      "Complete Implementation",
      "Latest Technologies",
      "Working Models & Source Code",
      "Viva & Presentation Support"
    ],
    accentColor: "from-indigo-500 to-purple-600"
  },
  {
    icon: Wrench,
    title: "Support & Maintenance",
    description: "Continuous monitoring, security updates, and long-term technical assistance for your applications.",
    features: [
      "24/7 Monitoring",
      "Security Updates & Bug Fixes",
      "Performance Optimization",
      "Feature Enhancements"
    ],
    accentColor: "from-teal-500 to-cyan-600"
  }
];

const Services = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Services | DexLora Innovations</title>
        <meta
          name="description"
          content="Explore DexLora Innovations' comprehensive digital services including custom web development, mobile apps, UI/UX design, IoT solutions, and more."
        />
      </Helmet>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(56, 189, 248, 0.6);
          }
        }

        .service-card {
          animation: fadeInUp 0.6s ease-out;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(17, 24, 39, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s;
        }

        .service-card:hover::before {
          left: 100%;
        }

        .service-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(56, 189, 248, 0.5);
          box-shadow: 0 20px 60px rgba(56, 189, 248, 0.2);
        }

        .service-card.active {
          border-color: rgba(56, 189, 248, 0.8);
          box-shadow: 0 20px 60px rgba(56, 189, 248, 0.4);
        }

        .gradient-text {
          background: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .icon-wrapper {
          transition: all 0.3s ease;
        }

        .service-card:hover .icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }

        .feature-item {
          opacity: 0;
          animation: fadeInUp 0.4s ease-out forwards;
        }

        .feature-item:nth-child(1) { animation-delay: 0.1s; }
        .feature-item:nth-child(2) { animation-delay: 0.2s; }
        .feature-item:nth-child(3) { animation-delay: 0.3s; }
        .feature-item:nth-child(4) { animation-delay: 0.4s; }

        .cta-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .cta-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 7rem);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .particles-hero {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
        }
      `}</style>

      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
        {/* Hero Section with Particles */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="particles-hero">
            <Particles
              particleColors={['#38bdf8', '#818cf8', '#c084fc']}
              particleCount={300}
              particleSpread={15}
              speed={0.15}
              particleBaseSize={120}
              moveParticlesOnHover={true}
              alphaParticles={true}
              disableRotation={false}
              sizeRandomness={1.2}
              cameraDistance={25}
            />
          </div>

          <div ref={heroRef} className="content-wrapper max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">Premium Digital Solutions</span>
            </div>

            <h1 className="hero-title gradient-text mb-6">
              Our Services
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Transform your ideas into reality with cutting-edge technology and creative excellence.
              We deliver comprehensive digital solutions tailored to your success.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="cta-button px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-lg flex items-center gap-2 hover:shadow-2xl hover:shadow-cyan-500/50"
              >
                Explore Services
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="/contact"
                className="px-8 py-4 bg-white/5 border border-white/20 rounded-full font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/60 rounded-full" />
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services-grid" className="py-20 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                What We <span className="gradient-text">Offer</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Comprehensive solutions designed to elevate your digital presence and drive business growth
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`service-card rounded-2xl p-8 ${activeService === index ? 'active' : ''}`}
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className={`icon-wrapper w-16 h-16 rounded-2xl bg-gradient-to-br ${service.accentColor} flex items-center justify-center mb-6`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {service.title}
                  </h3>

                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className={`feature-item flex items-start gap-3 text-sm text-slate-300 ${activeService === index ? '' : 'opacity-0'}`}
                        style={{
                          animation: activeService === index ? `fadeInUp 0.4s ease-out ${fIndex * 0.1}s forwards` : 'none'
                        }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/contact"
                    className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${service.accentColor} bg-clip-text text-transparent hover:gap-3 transition-all`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" style={{ color: 'currentColor', opacity: 0.7 }} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your <span className="gradient-text">Project?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Let's collaborate and bring your vision to life with innovative solutions and exceptional design.
            </p>
            <a
              href="/contact"
              className="cta-button inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
            >
              Get in Touch
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Services;
