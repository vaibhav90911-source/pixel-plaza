import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DISCORD_LINK = "https://discord.gg/76zeQ4CVh5";

const CheckoutSuccessPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16 flex items-center justify-center">
      <div className="glass rounded-xl p-10 max-w-md mx-4 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-3">Order Placed!</h1>
        <p className="text-muted-foreground mb-6">
          Your order has been recorded. Now complete payment via UPI and share the confirmation screenshot on our Discord server.
        </p>
        <div className="glass rounded-lg p-4 mb-6 text-left">
          <h3 className="font-display text-sm font-bold text-accent flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4" /> Next Steps
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Pay the total amount via UPI</li>
            <li>Join our Discord server</li>
            <li>Open a ticket with your payment screenshot</li>
            <li>We'll deliver your items in-game!</li>
          </ol>
        </div>
        <div className="flex gap-3 justify-center">
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
            <Button variant="neon">Join Discord</Button>
          </a>
          <Link to="/store">
            <Button variant="glass">Back to Store</Button>
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default CheckoutSuccessPage;
