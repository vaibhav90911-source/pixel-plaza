import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card/40 backdrop-blur py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-lg font-bold text-primary neon-text mb-3">INFERNO SMP</h3>
          <p className="text-sm text-muted-foreground">The ultimate Minecraft experience. Join our epic community.</p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Navigation</h4>
          <div className="space-y-2">
            {[{l:"Store",p:"/store"},{l:"Ranks",p:"/ranks"},{l:"Crate Keys",p:"/crates"},{l:"Rules",p:"/rules"}].map(n=>(
              <Link key={n.p} to={n.p} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{n.l}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Connect</h4>
          <p className="text-sm text-muted-foreground mb-1">Server IP: <span className="font-mono text-accent">Inferno.play.hosting</span></p>
          <a href="https://discord.gg/76zeQ4CVh5" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">Join our Discord</a>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Inferno SMP. All rights reserved. Not affiliated with Mojang Studios.
      </div>
    </div>
  </footer>
);

export default Footer;
