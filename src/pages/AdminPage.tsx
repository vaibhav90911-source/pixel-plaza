import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Plus, Trash2, Eye, Users, Tag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface ReferralCode {
  id: string;
  code: string;
  creator_name: string;
  discount_percent: number;
  is_active: boolean;
  created_at: string;
}

interface Order {
  id: string;
  items: any;
  total_amount: string;
  status: string;
  minecraft_username: string | null;
  created_at: string;
  referral_code_id: string | null;
  user_id: string;
}

interface ReferralUsage {
  id: string;
  created_at: string;
  referral_code_id: string;
  order_id: string;
  user_id: string;
}

const AdminPage = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<"referrals" | "orders" | "usage">("referrals");

  // Referral state
  const [referrals, setReferrals] = useState<ReferralCode[]>([]);
  const [newCode, setNewCode] = useState("");
  const [newCreator, setNewCreator] = useState("");
  const [newDiscount, setNewDiscount] = useState("10");

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);

  // Usage state
  const [usage, setUsage] = useState<ReferralUsage[]>([]);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadReferrals();
      loadOrders();
      loadUsage();
    }
  }, [isAdmin]);

  const loadReferrals = async () => {
    const { data } = await supabase.from("referral_codes").select("*").order("created_at", { ascending: false });
    if (data) setReferrals(data);
  };

  const loadOrders = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) setOrders(data);
  };

  const loadUsage = async () => {
    const { data } = await supabase.from("referral_usage").select("*").order("created_at", { ascending: false });
    if (data) setUsage(data);
  };

  const createReferral = async () => {
    if (!newCode.trim() || !newCreator.trim()) return;
    const { error } = await supabase.from("referral_codes").insert({
      code: newCode.trim().toUpperCase(),
      creator_name: newCreator.trim(),
      discount_percent: parseInt(newDiscount) || 0,
      created_by: user?.id,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Referral code created!" });
      setNewCode("");
      setNewCreator("");
      setNewDiscount("10");
      loadReferrals();
    }
  };

  const toggleReferral = async (id: string, currentActive: boolean) => {
    await supabase.from("referral_codes").update({ is_active: !currentActive }).eq("id", id);
    loadReferrals();
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    loadOrders();
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl font-bold text-primary neon-text mb-8 flex items-center gap-3">
            <Shield className="w-10 h-10" />
            Admin Panel
          </h1>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { key: "referrals" as const, label: "Referral Codes", icon: Tag },
              { key: "orders" as const, label: "Orders", icon: ShoppingCart },
              { key: "usage" as const, label: "Referral Usage", icon: Users },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  tab === t.key ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </div>

          {/* Referral Codes Tab */}
          {tab === "referrals" && (
            <div className="space-y-4">
              <div className="glass rounded-xl p-6">
                <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-accent" /> Create Referral Code
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <Input value={newCode} onChange={(e) => setNewCode(e.target.value.toUpperCase())} placeholder="CODE" className="bg-secondary/50 border-border font-mono" />
                  <Input value={newCreator} onChange={(e) => setNewCreator(e.target.value)} placeholder="Creator name" className="bg-secondary/50 border-border" />
                  <Input type="number" value={newDiscount} onChange={(e) => setNewDiscount(e.target.value)} placeholder="Discount %" className="bg-secondary/50 border-border" />
                  <Button variant="neon" onClick={createReferral}>Create</Button>
                </div>
              </div>

              <div className="glass rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 text-muted-foreground font-medium">Code</th>
                      <th className="text-left p-3 text-muted-foreground font-medium">Creator</th>
                      <th className="text-left p-3 text-muted-foreground font-medium">Discount</th>
                      <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((r) => (
                      <tr key={r.id} className="border-b border-border/50">
                        <td className="p-3 font-mono text-accent">{r.code}</td>
                        <td className="p-3 text-foreground">{r.creator_name}</td>
                        <td className="p-3 text-foreground">{r.discount_percent}%</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${r.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                            {r.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm" onClick={() => toggleReferral(r.id, r.is_active)}>
                            {r.is_active ? "Disable" : "Enable"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {tab === "orders" && (
            <div className="glass rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-muted-foreground font-medium">MC Username</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Items</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Total</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-border/50">
                      <td className="p-3 font-mono text-accent">{o.minecraft_username || "—"}</td>
                      <td className="p-3 text-foreground">{Array.isArray(o.items) ? (o.items as any[]).map((i: any) => i.name).join(", ") : "—"}</td>
                      <td className="p-3 text-foreground font-bold">{o.total_amount}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          o.status === "completed" ? "bg-green-500/20 text-green-400" :
                          o.status === "cancelled" ? "bg-red-500/20 text-red-400" :
                          "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3 flex gap-1">
                        {o.status === "pending" && (
                          <>
                            <Button variant="neon" size="sm" onClick={() => updateOrderStatus(o.id, "completed")}>Approve</Button>
                            <Button variant="ghost" size="sm" onClick={() => updateOrderStatus(o.id, "cancelled")}>Cancel</Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Usage Tab */}
          {tab === "usage" && (
            <div className="glass rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-muted-foreground font-medium">Referral Code ID</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Order ID</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">User ID</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {usage.map((u) => (
                    <tr key={u.id} className="border-b border-border/50">
                      <td className="p-3 font-mono text-accent text-xs">{u.referral_code_id.slice(0, 8)}...</td>
                      <td className="p-3 font-mono text-xs text-foreground">{u.order_id.slice(0, 8)}...</td>
                      <td className="p-3 font-mono text-xs text-foreground">{u.user_id.slice(0, 8)}...</td>
                      <td className="p-3 text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
