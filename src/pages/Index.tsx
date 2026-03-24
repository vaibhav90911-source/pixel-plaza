import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Crown, Key, Shield, ShoppingCart } from "lucide-react";

const features = [
  { icon: ShoppingCart, title: "Server Store", desc: "Browse ranks, keys, and exclusive bundles.", link: "/store" },
  { icon: Crown, title: "Ranks", desc: "Unlock powerful perks and stand out.", link: "/ranks" },
  { icon: Key, title: "Crate Keys", desc: "Open crates for epic loot and rewards.", link: "/crates" },
  { icon: Shield, title: "Rules", desc: "Know the rules, play fair, have fun.", link: "/rules" },
];

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />

    {/* Features Section */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Everything You Need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <Link key={f.link} to={f.link} className="glass rounded-xl p-6 hover:neon-border transition-all group">
              <f.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl font-bold text-foreground mb-4">Ready to Play?</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">Join our community and start your adventure today.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/store">
            <Button variant="neon" size="lg">Visit Store</Button>
          </Link>
          <a href="https://discord.gg/76zeQ4CVh5" target="_blank" rel="noopener noreferrer">
            <Button variant="cyanGlow" size="lg">Join Discord</Button>
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
