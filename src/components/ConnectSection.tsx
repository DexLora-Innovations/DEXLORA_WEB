import { useState, useEffect, useRef } from "react";
import { Mail, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Particles from "./Particles";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ConnectSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Basic email validation
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      toast({
        title: "Valid Email Required",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.message.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter your message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
      const web3AccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

      const timestamp = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "full",
        timeStyle: "long",
      });

      let response;
      // Prefer Formspree if ID is provided
      if (formspreeId && formspreeId !== "" && formspreeId !== "YOUR_FORMSPREE_ID_HERE") {
        response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || "New Message – DexLora",
            message: formData.message,
            _timestamp: timestamp
          }),
        });
      } else {
        // Fallback to Web3Forms
        if (web3AccessKey === "YOUR_ACCESS_KEY_HERE") {
          console.warn("Missing Configuration. Formspree ID found:", formspreeId);
          toast({
            title: "Setup Required",
            description: "Please restart your terminal (npm run dev) to load the new ID.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        const submissionData = {
          access_key: web3AccessKey,
          from_name: formData.name,
          subject: formData.subject || "New Message – DexLora",
          replyto: formData.email,
          message: `
New message received from DexLora Innovations website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SENDER DETAILS:
• Name: ${formData.name}
• Email: ${formData.email}

SUBJECT:
${formData.subject || "No subject provided"}

MESSAGE:
${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted on: ${timestamp}
          `.trim(),
        };

        response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(submissionData),
        });
      }

      const result = await response.json();

      if (response.ok && (result.success !== false)) {
        toast({
          title: "Message Sent!",
          description: "Message sent successfully. We'll get back to you shortly.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        console.error("Submission Error:", result);
        throw new Error(result.error || result.message || "Failed to send message");
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error.message || "Unable to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section ref={sectionRef} className="section-padding relative overflow-hidden" id="connect">
      {/* Particles Background - Optimized visibility and count */}
      <div className="absolute inset-0 z-0" style={{ contain: 'strict', transform: 'translateZ(0)' }}>
        {isVisible && (
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={40} // Reduced from 200 for 60fps performance
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        )}
      </div>

      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-secondary/10 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left card - Info */}
          <div className="glass-card p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Let's Build Something{" "}
                <span className="gradient-text">Impactful</span>
              </h2>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Have an idea, product vision, or digital challenge?
                <br /><br />
                DexLora Innovations partners with you to design, develop, and deliver future-ready solutions.
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <a
                  href="mailto:dexlora.innovations@gmail.com"
                  className="hover:text-foreground transition-colors"
                >
                  dexlora.innovations@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <span>Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Right card - Form */}
          <div className="glass-card p-8 md:p-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Send us a Message
            </h3>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="bg-muted/50 border-border/50 h-12 rounded-xl focus:border-primary/50 transition-colors"
                />
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="bg-muted/50 border-border/50 h-12 rounded-xl focus:border-primary/50 transition-colors"
                />
              </div>

              <div>
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="bg-muted/50 border-border/50 h-12 rounded-xl focus:border-primary/50 transition-colors"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="bg-muted/50 border-border/50 rounded-xl resize-none focus:border-primary/50 transition-colors"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold text-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
