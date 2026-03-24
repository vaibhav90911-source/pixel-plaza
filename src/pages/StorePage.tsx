import { Button } from "@/components/ui/button";
import { ShoppingCart, Crown, Key, Box } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const storeItems = [
  {
    category: "Ranks",
    icon: Crown,
    items: [
      { name: "VIP", price: "$4.99", desc: "Basic perks, colored name, /fly in lobby", color: "text-green-400" },
      { name: "MVP", price: "$9.99", desc: "All VIP perks + /nick, particle effects, priority queue", color: "text-blue-400" },
      { name: "ELITE", price: "$19.99", desc: "All MVP perks + exclusive kits, pet system, custom tag", color: "text-purple-400" },
      { name: "LEGEND", price: "$34.99", desc: "All perks + legend chat, monthly crate, exclusive cosmetics", color: "text-yellow-400" },
    ],
  },
  {
    category: "Crate Keys",
    icon: Key,
    items: [
      { name: "Common Key x3", price: "$1.99", desc: "3 Common crate keys with basic rewards", color: "text-muted-foreground" },
      { name: "Rare Key x3", price: "$4.99", desc: "3 Rare crate keys with better loot", color: "text-blue-400" },
      { name: "Legendary Key", price: "$7.99", desc: "1 Legendary crate key with epic rewards", color: "text-yellow-400" },
    ],
  },
  {
    category: "Bundles",
    icon: Box,
    items: [
      { name: "Starter Pack", price: "$6.99", desc: "VIP rank + 5 Common keys + 32 diamonds", color: "text-green-400" },
      { name: "Ultimate Pack", price: "$49.99", desc: "LEGEND rank + 5 Legendary keys + exclusive kit", color: "text-primary" },
    ],
  },
];

const StorePage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary neon-text mb-4">
            <ShoppingCart className="inline-block w-10 h-10 mr-3 mb-1" />
            Server Store
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Support the server and unlock amazing perks, crate keys, and exclusive bundles.</p>
        </div>

        {storeItems.map((cat) => (
          <div key={cat.category} className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <cat.icon className="w-6 h-6 text-accent" />
              {cat.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cat.items.map((item) => (
                <div key={item.name} className="glass rounded-lg p-5 hover:neon-border transition-all group">
                  <h3 className={`font-display font-bold text-lg ${item.color} mb-1`}>{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-bold text-foreground">{item.price}</span>
                    <Button variant="neon" size="sm">Buy Now</Button>
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

export default StorePage;
