import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Instagram, Linkedin, MessageCircle, Facebook } from "lucide-react";

const contactOptions = [
  {
    icon: Mail,
    title: "Mail Us",
    text: "Reach out to DexLora Innovations for project discussions, collaborations, or support.",
    href: "mailto:DexLora.innovations@gmail.com",
    color: "from-red-500/20 to-orange-500/20",
    hoverGlow: "hover:shadow-red-500/20",
  },
  {
    icon: Instagram,
    title: "Instagram",
    text: "Follow us for updates, projects, and creative technology insights.",
    href: "https://www.instagram.com/dexlora_innovations?utm_source=qr&igsh=MXU2amV0eGZyeWNscQ==",
    color: "from-pink-500/20 to-purple-500/20",
    hoverGlow: "hover:shadow-pink-500/20",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    text: "Connect with DexLora Innovations for professional updates and partnerships.",
    href: "https://www.linkedin.com/in/dexlora-innovations/",
    color: "from-blue-500/20 to-cyan-500/20",
    hoverGlow: "hover:shadow-blue-500/20",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    text: "Chat with our team directly for quick discussions and inquiries.",
    href: "https://wa.me/917092269839",
    color: "from-green-500/20 to-emerald-500/20",
    hoverGlow: "hover:shadow-green-500/20",
  },
  {
    icon: Facebook,
    title: "Facebook",
    text: "Follow DexLora Innovations for news, updates, and community engagement.",
    href: "https://www.facebook.com/profile.php?id=61585169746090",
    color: "from-blue-600/20 to-blue-400/20",
    hoverGlow: "hover:shadow-blue-600/20",
  },
];

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | DexLora Innovations</title>
        <meta
          name="description"
          content="Get in touch with DexLora Innovations for project discussions, collaborations, or support. Reach us via email, Instagram, LinkedIn, or WhatsApp."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-16">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-hero-gradient" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08)_0%,transparent_70%)]" />
          
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                               linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto animate-fade-up">
              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="gradient-text">CONTACT US</span>
              </h1>

              {/* Decorative dots */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-primary/60" />
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span className="w-2 h-2 rounded-full bg-primary/60" />
              </div>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Need an expert solution or have a project idea?
                <br />
                Leave your contact details or reach out through our channels — we'll connect with you shortly.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {contactOptions.map((option, index) => (
                <a
                  key={option.title}
                  href={option.href}
                  target={option.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={option.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className={`
                    group glass-card p-8 text-center cursor-pointer
                    transition-all duration-500 ease-out
                    hover:scale-105 hover:shadow-2xl ${option.hoverGlow}
                    animate-fade-up
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icon Container */}
                  <div className={`
                    w-16 h-16 mx-auto mb-6 rounded-2xl
                    bg-gradient-to-br ${option.color}
                    flex items-center justify-center
                    transition-transform duration-300
                    group-hover:scale-110 group-hover:rotate-3
                  `}>
                    <option.icon className="w-8 h-8 text-foreground" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {option.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {option.text}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-primary text-sm font-medium">
                      Click to connect →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
