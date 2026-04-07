import { Key, Flame, Star, Skull, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const crates = [
  { id: "key-legendary", name: "Legendary Crate", icon: Star, color: "text-yellow-400", glowClass: "hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]", price: 199, description: "Unlock powerful rewards from the Legendary Crate.", tier: "3rd Tier" },
  { id: "key-inferno", name: "Inferno Crate", icon: Flame, color: "text-orange-400", glowClass: "hover:shadow-[0_0_20px_rgba(251,146,60,0.3)]", price: 399, description: "Blazing hot rewards await inside the Inferno Crate.", tier: "2nd Tier" },
  { id: "key-beast", name: "Beast Crate", icon: Skull, color: "text-primary", glowClass: "hover:shadow-[0_0_20px_rgba(233,69,96,0.4)]", price: 699, description: "The highest valued crate with the most exclusive rewards.", tier: "Top Tier" },
];

const CratesPage = () => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAdd = (crate: typeof crates[0]) => {
    addItem({ id: crate.id, name: `${crate.name} Key`, price: crate.price, category: "Crate Keys", color: crate.color });
    toast({ title: `${crate.name} Key added to cart!` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary neon-text mb-4">
              <Key className="inline-block w-10 h-10 mr-3 mb-1" />
              Crate Keys
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">Add keys to your cart and checkout. Pay via UPI and confirm on Discord to receive your keys.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {crates.map((crate) => (
              <div key={crate.id} className={`glass rounded-xl p-6 transition-all ${crate.glowClass}`}>
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
                  <span className="font-display text-2xl font-bold text-foreground">₹{crate.price}<span className="text-xs text-muted-foreground font-body"> /key</span></span>
                  <Button variant="neon" size="sm" onClick={() => handleAdd(crate)}>
                    <Plus className="w-4 h-4 mr-1" /> Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CratesPage;
