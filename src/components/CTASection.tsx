import { Sparkles } from "lucide-react";

const CTASection = () => {
  const whatsappNumber = "917092269839";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <section className="section-padding relative overflow-hidden bg-background" id="cta">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/10 via-transparent to-muted/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gradient-radial from-primary/5 via-transparent to-transparent blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 flex items-center justify-center gap-3 flex-wrap">
          Have a project in mind?
          <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary animate-pulse" />
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
          className="btn-primary-glow inline-block"
        >
          LET'S WORK TOGETHER
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
