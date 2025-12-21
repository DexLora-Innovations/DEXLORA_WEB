import { Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ConnectSection = () => {
  return (
    <section className="section-padding relative overflow-hidden" id="connect">
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
                  href="mailto:DexLora.innovations@gmail.com"
                  className="hover:text-foreground transition-colors"
                >
                  DexLora.innovations@gmail.com
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
              Send us a message
            </h3>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="bg-muted/50 border-border/50 h-12 rounded-xl focus:border-primary/50 transition-colors"
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-muted/50 border-border/50 h-12 rounded-xl focus:border-primary/50 transition-colors"
                />
              </div>
              
              <div>
                <Input
                  type="text"
                  placeholder="Subject"
                  className="bg-muted/50 border-border/50 h-12 rounded-xl focus:border-primary/50 transition-colors"
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="Your Message"
                  rows={4}
                  className="bg-muted/50 border-border/50 rounded-xl resize-none focus:border-primary/50 transition-colors"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold text-lg transition-all duration-300 hover:scale-[1.02]"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
