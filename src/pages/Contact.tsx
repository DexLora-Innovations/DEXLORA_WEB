import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, Instagram, Linkedin, MessageCircle, Facebook, Phone, MapPin } from "lucide-react";
import ColorBends from "@/components/ColorBends";
import Hyperspeed from "@/components/Hyperspeed";

// Custom X (Twitter) Icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const contactOptions = [
  {
    icon: Mail,
    title: "Mail Us",
    text: "Reach out to DexLora Innovations for project discussions, collaborations, or support.",
    href: "mailto:dexlora.innovations@gmail.com",
    color: "from-red-500/20 to-orange-500/20",
    hoverGlow: "hover:shadow-red-500/20",
    iconColor: "text-red-500",
  },
  {
    icon: Instagram,
    title: "Instagram",
    text: "Follow us for updates, projects, and creative technology insights.",
    href: "https://www.instagram.com/dexlora_innovations?utm_source=qr&igsh=MXU2amV0eGZyeWNscQ==",
    color: "from-pink-500/20 to-purple-500/20",
    hoverGlow: "hover:shadow-pink-500/20",
    iconColor: "text-pink-500",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    text: "Connect with DexLora Innovations for professional updates and partnerships.",
    href: "https://www.linkedin.com/in/dexlora-innovations/",
    color: "from-blue-500/20 to-cyan-500/20",
    hoverGlow: "hover:shadow-blue-500/20",
    iconColor: "text-blue-500",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    text: "Chat with our team directly for quick discussions and inquiries.",
    href: "https://chat.whatsapp.com/FOcvkxkZRoZKLaQTKU3uCI",
    color: "from-green-500/20 to-emerald-500/20",
    hoverGlow: "hover:shadow-green-500/20",
    iconColor: "text-green-500",
  },
  {
    icon: Facebook,
    title: "Facebook",
    text: "Follow DexLora Innovations for news, updates, and community engagement.",
    href: "https://www.facebook.com/profile.php?id=61585169746090",
    color: "from-blue-600/20 to-blue-400/20",
    hoverGlow: "hover:shadow-blue-600/20",
    iconColor: "text-blue-600",
  },
  {
    icon: XIcon,
    title: "Twitter (X)",
    text: "Follow DexLora Innovations for announcements, updates, and technology insights.",
    href: "https://x.com/DexLora3994",
    color: "from-sky-500/20 to-slate-500/20",
    hoverGlow: "hover:shadow-sky-500/20",
    iconColor: "text-sky-500",
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

      {/* Fullscreen ColorBends Animation Background - Optimized for performance */}
      <ColorBends
        colors={["#ff3366", "#9933ff", "#00ffcc", "#ff6600"]}
        rotation={30}
        speed={0.1}
        scale={0.6}
        frequency={0.8}
        warpStrength={0.8}
        mouseInfluence={0}
        parallax={0}
        noise={0.02}
        transparent={false}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <Navbar />

      <main className="min-h-screen pt-16 relative" style={{ zIndex: 1 }}>
        {/* Hero Section with Hyperspeed */}
        <section className="relative py-24 md:py-32 overflow-hidden" style={{ minHeight: '600px' }}>
          {/* Hyperspeed Animation - Optimized for performance */}
          <div className="absolute inset-0 z-0">
            <Hyperspeed
              effectOptions={{
                onSpeedUp: () => { },
                onSlowDown: () => { },
                distortion: 'turbulentDistortion',
                length: 300,
                roadWidth: 10,
                islandWidth: 2,
                lanesPerRoad: 3,
                fov: 90,
                fovSpeedUp: 150,
                speedUp: 2,
                carLightsFade: 0.4,
                totalSideLightSticks: 10,
                lightPairsPerRoadWay: 20,
                shoulderLinesWidthPercentage: 0.05,
                brokenLinesWidthPercentage: 0.1,
                brokenLinesLengthPercentage: 0.5,
                lightStickWidth: [0.12, 0.5],
                lightStickHeight: [1.3, 1.7],
                movingAwaySpeed: [40, 60],
                movingCloserSpeed: [-80, -120],
                carLightsLength: [300 * 0.03, 300 * 0.15],
                carLightsRadius: [0.05, 0.1],
                carWidthPercentage: [0.3, 0.5],
                carShiftX: [-0.8, 0.8],
                carFloorSeparation: [0, 5],
                colors: {
                  roadColor: 0x080808,
                  islandColor: 0x0a0a0a,
                  background: 0x000000,
                  shoulderLines: 0xFFFFFF,
                  brokenLines: 0xFFFFFF,
                  leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
                  rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
                  sticks: 0x03B3C3,
                }
              }}
            />
          </div>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
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
                    <option.icon className={`w-8 h-8 ${option.iconColor}`} />
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

        {/* Send Us a Mail Form Section */}
        <ContactForm />

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
                      href="mailto:dexlora.innovations@gmail.com"
                      className="hover:text-foreground transition-colors"
                    >
                      dexlora.innovations@gmail.com
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
              <div className="flex flex-col items-center justify-center gap-6 md:ml-auto">
                <h3 className="text-xl font-semibold text-foreground">Connect With Us</h3>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {/* Mail */}
                  <a
                    href="mailto:dexlora.innovations@gmail.com"
                    className="w-14 h-14 rounded-full glass-card border border-border/30 flex items-center justify-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
                  >
                    <Mail className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/dexlora_innovations?utm_source=qr&igsh=MXU2amV0eGZyeWNscQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full glass-card border border-border/30 flex items-center justify-center hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 group"
                  >
                    <Instagram className="w-6 h-6 text-muted-foreground group-hover:text-pink-500 transition-colors" />
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://chat.whatsapp.com/FOcvkxkZRoZKLaQTKU3uCI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full glass-card border border-border/30 flex items-center justify-center hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
                  >
                    <MessageCircle className="w-6 h-6 text-muted-foreground group-hover:text-green-500 transition-colors" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/dexlora-innovations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full glass-card border border-border/30 flex items-center justify-center hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group"
                  >
                    <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                  </a>

                  {/* Twitter/X */}
                  <a
                    href="https://x.com/DexLora3994"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full glass-card border border-border/30 flex items-center justify-center hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/20 transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5 text-muted-foreground group-hover:text-sky-500 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61585169746090"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full glass-card border border-border/30 flex items-center justify-center hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300 group"
                  >
                    <Facebook className="w-6 h-6 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
};

export default Contact;
