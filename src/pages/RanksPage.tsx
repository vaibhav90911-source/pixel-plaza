import { Crown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ranks = [
  {
    name: "VIP",
    price: "$4.99",
    color: "text-green-400",
    borderClass: "hover:shadow-[0_0_15px_rgba(74,222,128,0.3)]",
    perks: ["Colored name in chat", "/fly in lobby", "3 /sethome slots", "Access to /hat", "VIP kit (daily)", "Priority queue"],
  },
  {
    name: "MVP",
    price: "$9.99",
    color: "text-blue-400",
    borderClass: "hover:shadow-[0_0_15px_rgba(96,165,250,0.3)]",
    perks: ["All VIP perks", "/nick command", "Particle effects", "5 /sethome slots", "MVP kit (daily)", "/feed command", "Join full servers"],
  },
  {
    name: "ELITE",
    price: "$19.99",
    color: "text-purple-400",
    borderClass: "hover:shadow-[0_0_15px_rgba(192,132,252,0.3)]",
    popular: true,
    perks: ["All MVP perks", "Custom chat tag", "Pet system access", "10 /sethome slots", "Elite kit (daily)", "/heal command", "/ec (enderchest)", "Exclusive cosmetics"],
  },
  {
    name: "LEGEND",
    price: "$34.99",
    color: "text-yellow-400",
    borderClass: "hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]",
    perks: ["All ELITE perks", "Legend chat channel", "Monthly legendary crate", "Unlimited /sethome", "Legend kit (daily)", "/fix command", "Custom join message", "All cosmetics unlocked", "Beta access to new features"],
  },
];

const RanksPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary neon-text mb-4">
            <Crown className="inline-block w-10 h-10 mr-3 mb-1" />
            Server Ranks
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Choose the rank that fits your playstyle. All ranks are permanent and one-time purchases.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {ranks.map((rank) => (
            <div
              key={rank.name}
              className={`glass rounded-xl p-6 transition-all ${rank.borderClass} ${rank.popular ? "ring-2 ring-primary neon-border" : ""} relative`}
            >
              {rank.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary text-primary-foreground text-xs font-display font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h2 className={`font-display text-2xl font-black ${rank.color} mb-1`}>{rank.name}</h2>
              <div className="font-display text-3xl font-bold text-foreground mb-6">{rank.price}</div>
              <ul className="space-y-2 mb-6">
                {rank.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
              <Button variant="neon" className="w-full">Purchase</Button>
            </div>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default RanksPage;
