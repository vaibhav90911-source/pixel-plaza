import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Copy, Check, ShoppingCart, User, LogOut, Shield, Package } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Store", path: "/store" },
  { label: "Ranks", path: "/ranks" },
  { label: "Crate Keys", path: "/crates" },
  { label: "Rules", path: "/rules" },
];

const SERVER_IP = "legacy-11.hexacraft.fun:25612";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const { itemCount } = useCart();

  const copyIP = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display text-xl font-bold tracking-widest text-primary neon-text">
          INFERNO SMP
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={copyIP}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary text-sm font-mono text-accent hover:bg-secondary/80 transition-colors"
          >
            {SERVER_IP}
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <Link to="/cart" className="relative">
            <Button variant="glass" size="icon">
              <ShoppingCart className="w-4 h-4" />
            </Button>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/orders">
                <Button variant="glass" size="icon" title="My Orders">
                  <Package className="w-4 h-4" />
                </Button>
              </Link>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="glass" size="icon" title="Admin Panel">
                    <Shield className="w-4 h-4" />
                  </Button>
                </Link>
              )}
              <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground">
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="neon" size="sm">
                <User className="w-4 h-4 mr-1" /> Login
              </Button>
            </Link>
          )}

          <a href="https://discord.gg/76zeQ4CVh5" target="_blank" rel="noopener noreferrer">
            <Button variant="cyanGlow" size="sm">Discord</Button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Link to="/cart" className="relative">
            <Button variant="glass" size="icon">
              <ShoppingCart className="w-4 h-4" />
            </Button>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden glass border-t border-border px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" onClick={() => setOpen(false)} className="block px-4 py-2.5 rounded-md text-sm font-medium text-accent">
              Admin Panel
            </Link>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={copyIP}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary text-sm font-mono text-accent"
            >
              {SERVER_IP}
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            {user ? (
              <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground">
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)}>
                <Button variant="neon" size="sm">Login</Button>
              </Link>
            )}
            <a href="https://discord.gg/76zeQ4CVh5" target="_blank" rel="noopener noreferrer">
              <Button variant="cyanGlow" size="sm">Discord</Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
