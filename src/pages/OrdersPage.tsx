import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string;
  items: any;
  total_amount: string;
  status: string;
  minecraft_username: string | null;
  created_at: string;
}

const statusConfig: Record<string, { icon: typeof Clock; color: string; label: string }> = {
  pending: { icon: Clock, color: "text-yellow-400", label: "Pending" },
  completed: { icon: CheckCircle, color: "text-green-400", label: "Completed" },
  cancelled: { icon: XCircle, color: "text-red-400", label: "Cancelled" },
};

const OrdersPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          if (data) setOrders(data);
          setLoadingOrders(false);
        });
    }
  }, [user]);

  if (loading || loadingOrders) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-primary neon-text mb-8 flex items-center gap-3">
            <Package className="w-10 h-10" />
            My Orders
          </h1>

          {orders.length === 0 ? (
            <div className="glass rounded-xl p-12 text-center">
              <p className="text-muted-foreground text-lg mb-2">No orders yet</p>
              <p className="text-sm text-muted-foreground">Items you purchase will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const config = statusConfig[order.status] || statusConfig.pending;
                const StatusIcon = config.icon;
                const items = Array.isArray(order.items) ? (order.items as any[]) : [];

                return (
                  <div key={order.id} className="glass rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-5 h-5 ${config.color}`} />
                        <span className={`text-sm font-display font-bold ${config.color}`}>{config.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      {items.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-foreground">{item.name}</span>
                          <span className="text-muted-foreground">₹{item.price?.toLocaleString("en-IN")}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground font-mono">
                        MC: {order.minecraft_username || "—"}
                      </span>
                      <span className="font-display font-bold text-foreground">{order.total_amount}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrdersPage;
