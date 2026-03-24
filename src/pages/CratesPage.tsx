import { Key, Flame, Star, Skull, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DISCORD_LINK = "https://discord.gg/76zeQ4CVh5";

const crates = [
  {
    name: "Legendary Crate",
    icon: Star,
    color: "text-yellow-400",
    glowClass: "hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]",
    keyPrice: "₹199",
    description: "Unlock powerful rewards from the Legendary Crate.",
    tier: "3rd Tier",
  },
  {
    name: "Inferno Crate",
    icon: Flame,
    color: "text-orange-400",
    glowClass: "hover:shadow-[0_0_20px_rgba(251,146,60,0.3)]",
    keyPrice: "₹399",
    description: "Blazing hot rewards await inside the Inferno Crate.",
    tier: "2nd Tier",
  },
  {
    name: "Beast Crate",
    icon: Skull,
    color: "text-primary",
    glowClass: "hover:shadow-[0_0_20px_rgba(233,69,96,0.4)]",
    keyPrice: "₹699",
    description: "The highest valued crate with the most exclusive rewards.",
    tier: "Top Tier",
  },
];

const CratesPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary neon-text mb-4">
            <Key className="inline-block w-10 h-10 mr-3 mb-1" />
            Crate Keys
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Unlock crates with keys to win amazing in-game rewards. Purchase keys and confirm payment on Discord.</p>
        </div>

        {/* How to Purchase */}
        <div className="mb-10 glass rounded-xl p-6 max-w-2xl mx-auto">
          <h2 className="font-display text-lg font-bold text-accent cyan-text mb-2 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            How to Purchase
          </h2>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Click <span className="font-semibold text-foreground">"Buy Key"</span> on the crate you want</li>
            <li>You'll be redirected to our Discord server</li>
            <li>Open a ticket and share your payment confirmation</li>
            <li>Our team will verify and deliver your key in-game!</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {crates.map((crate) => (
            <div key={crate.name} className={`glass rounded-xl p-6 transition-all ${crate.glowClass}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <crate.icon className={`w-8 h-8 ${crate.color}`} />
                  <h2 className={`font-display text-xl font-bold ${crate.color}`}>{crate.name}</h2>
                </div>
                <span className={`text-xs font-display uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary ${crate.color}`}>
                  {crate.tier}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{crate.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-bold text-foreground">{crate.keyPrice}<span className="text-xs text-muted-foreground font-body"> /key</span></span>
                <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
                  <Button variant="neon" size="sm">Buy Key</Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Info */}
        <div className="mt-12 glass rounded-xl p-6 max-w-2xl mx-auto text-center">
          <h3 className="font-display text-lg font-bold text-foreground mb-2">Payment Confirmation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            After making your payment, join our Discord and open a ticket with your payment screenshot. Our team will verify and deliver your key within 24 hours.
          </p>
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
            <Button variant="cyanGlow" size="lg">Join Discord to Purchase</Button>
          </a>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default CratesPage;
