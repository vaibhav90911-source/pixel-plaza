import { Button } from "@/components/ui/button";
import { ShoppingCart, Crown, Key, Box, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const storeItems = [
  {
    category: "Ranks",
    icon: Crown,
    items: [
      { id: "rank-elite", name: "Elite", price: 40, desc: "Basic perks, colored name", color: "text-green-400" },
      { id: "rank-champion", name: "Champion", price: 80, desc: "All Elite perks + /nick, particle effects", color: "text-blue-400" },
      { id: "rank-immortal", name: "Immortal", price: 250, desc: "All Champion perks + custom tag, pet system, /heal", color: "text-purple-400" },
      { id: "rank-deadliest", name: "Deadliest", price: 500, desc: "All Immortal perks + exclusive cosmetics, /fix, custom join msg", color: "text-red-400" },
      { id: "rank-ace", name: "Ace", price: 999, desc: "All Deadliest perks + monthly crate, all cosmetics", color: "text-yellow-400" },
      { id: "rank-boss", name: "Boss", price: 1499, desc: "All Ace perks + weekly beast crate, priority support", color: "text-orange-400" },
      { id: "rank-god", name: "God", price: 1999, desc: "All perks + God cosmetics, custom chat color, all future perks", color: "text-primary" },
    ],
  },
  {
    category: "Crate Keys",
    icon: Key,
    items: [
      { id: "key-legendary", name: "Legendary Key", price: 199, desc: "1 Legendary crate key", color: "text-yellow-400" },
      { id: "key-inferno", name: "Inferno Key", price: 399, desc: "1 Inferno crate key", color: "text-orange-400" },
      { id: "key-beast", name: "Beast Key", price: 699, desc: "1 Beast crate key — highest value", color: "text-primary" },
    ],
  },
  {
    category: "Bundles",
    icon: Box,
    items: [
      { id: "bundle-starter", name: "Starter Pack", price: 149, desc: "Elite rank + 1 Legendary key", color: "text-green-400" },
      { id: "bundle-ultimate", name: "Ultimate Pack", price: 2999, desc: "God rank + 3 Beast keys + exclusive kit", color: "text-primary" },
    ],
  },
];

const StorePage = () => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAdd = (item: { id: string; name: string; price: number; color: string }, category: string) => {
    addItem({ ...item, category });
    toast({ title: `${item.name} added to cart!` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary neon-text mb-4">
              <ShoppingCart className="inline-block w-10 h-10 mr-3 mb-1" />
              Server Store
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">Add items to your cart, apply a referral code, and checkout. Pay via UPI and confirm on Discord.</p>
          </div>

          {storeItems.map((cat) => (
            <div key={cat.category} className="mb-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <cat.icon className="w-6 h-6 text-accent" />
                {cat.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.items.map((item) => (
                  <div key={item.id} className="glass rounded-lg p-5 hover:neon-border transition-all group">
                    <h3 className={`font-display font-bold text-lg ${item.color} mb-1`}>{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl font-bold text-foreground">₹{item.price.toLocaleString("en-IN")}</span>
                      <Button
                        variant="neon"
                        size="sm"
                        onClick={() => handleAdd(item, cat.category)}
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StorePage;
