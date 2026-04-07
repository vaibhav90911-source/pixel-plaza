import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CartPage = () => {
  const { items, removeItem, clearCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState("");
  const [appliedReferral, setAppliedReferral] = useState<{ id: string; code: string; discount_percent: number } | null>(null);
  const [minecraftUsername, setMinecraftUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const applyReferral = async () => {
    if (!referralCode.trim()) return;
    const { data, error } = await supabase
      .from("referral_codes")
      .select("id, code, discount_percent")
      .eq("code", referralCode.trim().toUpperCase())
      .eq("is_active", true)
      .maybeSingle();

    if (error || !data) {
      toast({ title: "Invalid code", description: "This referral code doesn't exist or is inactive.", variant: "destructive" });
      return;
    }
    setAppliedReferral(data);
    toast({ title: "Referral applied!", description: `${data.discount_percent}% discount from code ${data.code}` });
  };

  const discountedTotal = appliedReferral
    ? total * (1 - appliedReferral.discount_percent / 100)
    : total;

  const handleCheckout = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (!minecraftUsername.trim()) {
      toast({ title: "Minecraft username required", variant: "destructive" });
      return;
    }
    if (items.length === 0) return;

    setSubmitting(true);
    const orderItems = items.map((i) => ({ name: i.name, price: i.price, category: i.category }));

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        items: orderItems,
        total_amount: `₹${Math.round(discountedTotal).toLocaleString("en-IN")}`,
        referral_code_id: appliedReferral?.id || null,
        minecraft_username: minecraftUsername.trim(),
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Order failed", description: error.message, variant: "destructive" });
      setSubmitting(false);
      return;
    }

    if (appliedReferral && order) {
      await supabase.from("referral_usage").insert({
        referral_code_id: appliedReferral.id,
        order_id: order.id,
        user_id: user.id,
      });
    }

    clearCart();
    toast({ title: "Order placed!", description: "Pay via UPI and share confirmation on Discord." });
    navigate("/checkout-success");
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="font-display text-4xl font-bold text-primary neon-text mb-8 flex items-center gap-3">
            <ShoppingCart className="w-10 h-10" />
            Your Cart
          </h1>

          {items.length === 0 ? (
            <div className="glass rounded-xl p-12 text-center">
              <p className="text-muted-foreground text-lg mb-4">Your cart is empty</p>
              <Button variant="neon" onClick={() => navigate("/store")}>Browse Store</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="glass rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h3 className={`font-display font-bold ${item.color}`}>{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-display font-bold text-foreground">₹{item.price.toLocaleString("en-IN")}</span>
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Referral Code */}
              <div className="glass rounded-lg p-4">
                <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-accent" /> Referral Code
                </label>
                {appliedReferral ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-accent font-mono">{appliedReferral.code} — {appliedReferral.discount_percent}% off</span>
                    <button onClick={() => setAppliedReferral(null)} className="text-xs text-muted-foreground hover:text-foreground">Remove</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="bg-secondary/50 border-border font-mono"
                    />
                    <Button variant="glass" onClick={applyReferral}>Apply</Button>
                  </div>
                )}
              </div>

              {/* Minecraft Username */}
              <div className="glass rounded-lg p-4">
                <label className="text-sm font-medium text-foreground mb-2 block">Minecraft Username</label>
                <Input
                  value={minecraftUsername}
                  onChange={(e) => setMinecraftUsername(e.target.value)}
                  placeholder="Your in-game name"
                  className="bg-secondary/50 border-border font-mono"
                />
              </div>

              {/* Total */}
              <div className="glass rounded-xl p-6">
                {appliedReferral && (
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                )}
                {appliedReferral && (
                  <div className="flex justify-between text-sm text-accent mb-2">
                    <span>Discount ({appliedReferral.discount_percent}%)</span>
                    <span>-₹{Math.round(total - discountedTotal).toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="font-display text-lg font-bold text-foreground">Total</span>
                  <span className="font-display text-2xl font-bold text-primary">₹{Math.round(discountedTotal).toLocaleString("en-IN")}</span>
                </div>
                <Button
                  variant="neon"
                  className="w-full mt-4"
                  onClick={handleCheckout}
                  disabled={submitting}
                >
                  {submitting ? "Placing Order..." : user ? "Place Order" : "Login to Checkout"}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  After placing your order, pay via UPI and share confirmation on our Discord.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
