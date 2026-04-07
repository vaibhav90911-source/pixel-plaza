import { Crown, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const ranks = [
  { id: "rank-elite", name: "ELITE", price: 40, color: "text-green-400", borderClass: "hover:shadow-[0_0_15px_rgba(74,222,128,0.3)]", perks: ["Colored name in chat", "3 /sethome slots", "Access to /hat", "Elite kit (daily)"] },
  { id: "rank-champion", name: "CHAMPION", price: 80, color: "text-blue-400", borderClass: "hover:shadow-[0_0_15px_rgba(96,165,250,0.3)]", perks: ["All Elite perks", "/nick command", "Particle effects", "5 /sethome slots", "Champion kit (daily)", "/feed command"] },
  { id: "rank-immortal", name: "IMMORTAL", price: 250, color: "text-purple-400", borderClass: "hover:shadow-[0_0_15px_rgba(192,132,252,0.3)]", perks: ["All Champion perks", "Custom chat tag", "Pet system access", "7 /sethome slots", "Immortal kit (daily)", "/heal command", "/ec (enderchest)"] },
  { id: "rank-deadliest", name: "DEADLIEST", price: 500, color: "text-red-400", borderClass: "hover:shadow-[0_0_15px_rgba(248,113,113,0.3)]", popular: true, perks: ["All Immortal perks", "Exclusive cosmetics", "7 /sethome slots", "Deadliest kit (daily)", "/fix command", "Custom join message", "Beta access to new features"] },
  { id: "rank-ace", name: "ACE", price: 999, color: "text-yellow-400", borderClass: "hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]", perks: ["All Deadliest perks", "Ace chat channel", "Monthly legendary crate", "7 /sethome slots", "Ace kit (daily)", "All cosmetics unlocked"] },
  { id: "rank-boss", name: "BOSS", price: 1499, color: "text-orange-400", borderClass: "hover:shadow-[0_0_15px_rgba(251,146,60,0.3)]", perks: ["All Ace perks", "Boss chat channel", "Weekly beast crate", "Boss kit (daily)", "Custom particle trails"] },
  { id: "rank-god", name: "GOD", price: 1999, color: "text-primary", borderClass: "hover:shadow-[0_0_20px_rgba(233,69,96,0.4)]", perks: ["All Boss perks", "God chat channel", "Monthly beast crate x3", "God kit (daily)", "Exclusive God cosmetics", "Custom chat color", "Server suggestion priority", "All future perks included"] },
];

const RanksPage = () => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAdd = (rank: typeof ranks[0]) => {
    addItem({ id: rank.id, name: rank.name, price: rank.price, category: "Ranks", color: rank.color });
    toast({ title: `${rank.name} added to cart!` });
  };

  return (
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ranks.map((rank) => (
              <div key={rank.name} className={`glass rounded-xl p-6 transition-all ${rank.borderClass} ${rank.popular ? "ring-2 ring-primary neon-border" : ""} relative`}>
                {rank.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary text-primary-foreground text-xs font-display font-bold rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h2 className={`font-display text-2xl font-black ${rank.color} mb-1`}>{rank.name}</h2>
                <div className="font-display text-3xl font-bold text-foreground mb-6">₹{rank.price.toLocaleString("en-IN")}</div>
                <ul className="space-y-2 mb-6">
                  {rank.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <Button variant="neon" className="w-full" onClick={() => handleAdd(rank)}>
                  <Plus className="w-4 h-4 mr-1" /> Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RanksPage;
