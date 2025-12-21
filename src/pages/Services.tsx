import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import { Instagram, Linkedin, MessageCircle, Phone, Mail, MapPin } from "lucide-react";

const services = [
  {
    title: "Custom Website Development",
    points: [
      "Fully Customized Design & Development",
      "Scalable & Future-Ready Architecture",
      "Unique Brand-Focused Layouts",
      "Clean, Secure Custom Code",
      "Easy Third-Party Integrations",
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
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services | DexLora Innovations</title>
        <meta
          name="description"
          content="DexLora Innovations offers custom website development, mobile apps, UI/UX design, IoT solutions, and more. Explore our full range of digital services."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-16">
        {/* Hero Section */}
        <section className="section-padding py-20 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Left - Title */}
              <div className="animate-fade-up">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                  OUR
                  <br />
                  <span className="gradient-text">SERVICES</span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mt-6 rounded-full" />
              </div>

              {/* Right - Description */}
              <div className="animate-fade-up-delay-1">
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
        <section className="section-padding py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Vertical line for timeline effect */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-primary/50" />

              {/* Service Cards */}
              <div className="space-y-12 md:space-y-16">
                {services.map((service, index) => (
                  <div
                    key={service.title}
                    className={`relative flex flex-col md:flex-row items-center gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50 z-10" />

                    {/* Card */}
                    <div
                      className={`w-full md:w-[calc(50%-2rem)] ${
                        index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                      }`}
                    >
                      <div className="glass-card p-6 md:p-8 rounded-2xl border border-border/30 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
                        <div className="flex items-start gap-4 mb-6">
                          <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                            {service.title}
                          </h3>
                        </div>
                        <ul className="space-y-3 pl-14">
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
                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer / Contact Strip */}
        <section className="section-padding py-16 md:py-20 bg-card/50 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              {/* Left Side */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  DexLora <span className="gradient-text">Innovations</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Ready to bring your ideas to life?
                  DexLora Innovations helps you build powerful digital, mobile, and smart technology solutions with clarity, quality, and innovation.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Tamil Nadu, India</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary" />
                    <a
                      href="mailto:DexLora.innovations@gmail.com"
                      className="hover:text-foreground transition-colors"
                    >
                      DexLora.innovations@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-5 h-5 text-primary" />
                    <a
                      href="tel:+917092269839"
                      className="hover:text-foreground transition-colors"
                    >
                      +91 7092269839
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side - Social Buttons */}
              <div className="flex flex-col items-start md:items-end justify-center gap-6">
                <h3 className="text-xl font-semibold text-foreground">Connect With Us</h3>
                <div className="flex items-center gap-4">
                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full glass-card border border-border/30 flex items-center justify-center hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 group"
                  >
                    <Instagram className="w-6 h-6 text-muted-foreground group-hover:text-pink-500 transition-colors" />
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/917092269839"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full glass-card border border-border/30 flex items-center justify-center hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
                  >
                    <MessageCircle className="w-6 h-6 text-muted-foreground group-hover:text-green-500 transition-colors" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/dexlora-innovations"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full glass-card border border-border/30 flex items-center justify-center hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group"
                  >
                    <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;
