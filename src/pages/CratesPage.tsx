import { Key, Gift, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const crates = [
  {
    name: "Common Crate",
    icon: Gift,
    color: "text-muted-foreground",
    glowClass: "",
    keyPrice: "$0.99",
    description: "Basic rewards to get you started.",
    loot: ["16 Diamonds", "Iron Armor Set", "32 Golden Apples", "5,000 In-game Coins", "Common Cosmetic"],
  },
  {
    name: "Rare Crate",
    icon: Star,
    color: "text-blue-400",
    glowClass: "hover:shadow-[0_0_20px_rgba(96,165,250,0.3)]",
    keyPrice: "$2.49",
    description: "Better rewards with exclusive items.",
    loot: ["32 Diamonds", "Diamond Armor Set", "Rare Pet Egg", "25,000 In-game Coins", "Rare Cosmetic", "/fly (1 hour)"],
  },
  {
    name: "Legendary Crate",
    icon: Zap,
    color: "text-yellow-400",
    glowClass: "hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]",
    keyPrice: "$7.99",
    description: "The rarest and most powerful rewards.",
    loot: ["64 Diamonds", "Enchanted Netherite Set", "Legendary Pet", "100,000 In-game Coins", "Exclusive Cosmetic", "Temporary Rank Upgrade (7 days)", "Custom Chat Color"],
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
          <p className="text-muted-foreground max-w-xl mx-auto">Unlock crates with keys to win amazing in-game rewards. Keys can be earned in-game or purchased below.</p>
        </div>

        <div className="mb-10 glass rounded-xl p-6 max-w-2xl mx-auto">
          <h2 className="font-display text-lg font-bold text-accent cyan-text mb-2">How It Works</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Purchase or earn a crate key</li>
            <li>Find the crate at <span className="font-mono text-accent">/warp crates</span></li>
            <li>Right-click the crate with your key</li>
            <li>Watch the animation and claim your reward!</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {crates.map((crate) => (
            <div key={crate.name} className={`glass rounded-xl p-6 transition-all ${crate.glowClass}`}>
              <div className="flex items-center gap-3 mb-3">
                <crate.icon className={`w-8 h-8 ${crate.color}`} />
                <h2 className={`font-display text-xl font-bold ${crate.color}`}>{crate.name}</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{crate.description}</p>
              <h3 className="text-xs font-display uppercase tracking-wider text-foreground mb-2">Possible Loot</h3>
              <ul className="space-y-1 mb-6">
                {crate.loot.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${crate.color === "text-muted-foreground" ? "bg-muted-foreground" : crate.color.replace("text-", "bg-")}`} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-bold text-foreground">{crate.keyPrice}<span className="text-xs text-muted-foreground font-body"> /key</span></span>
                <Button variant="neon" size="sm">Buy Key</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default CratesPage;
