import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const SERVER_IP = "play.yourserver.com";

const HeroSection = () => {
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-wider neon-text text-primary mb-6 animate-float">
          MC SERVER
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Join the ultimate Minecraft experience. Custom ranks, epic crates, and an incredible community await.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={copyIP}
            className="flex items-center gap-3 px-6 py-3 rounded-lg bg-secondary/80 backdrop-blur font-mono text-lg text-accent cyan-border hover:bg-secondary transition-all"
          >
            {SERVER_IP}
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
          <Link to="/store">
            <Button variant="neon" size="lg">Visit Store</Button>
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-muted-foreground text-sm">
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-foreground">500+</div>
            <div>Players Online</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-foreground">10K+</div>
            <div>Community</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-foreground">99.9%</div>
            <div>Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
