import { Shield, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ruleCategories = [
  {
    title: "General Rules",
    rules: [
      { rule: "Be respectful to all players and staff.", detail: "Harassment, bullying, and toxic behavior will not be tolerated." },
      { rule: "No spamming or advertising.", detail: "This includes chat spam, server advertisements, and Discord links." },
      { rule: "No inappropriate content.", detail: "Keep builds, skins, names, and chat appropriate for all ages." },
      { rule: "English only in global chat.", detail: "Other languages are welcome in private messages and party chat." },
      { rule: "No begging for items, ranks, or OP.", detail: "Staff will never ask for your password or personal information." },
    ],
  },
  {
    title: "Gameplay Rules",
    rules: [
      { rule: "No hacking or modified clients.", detail: "This includes x-ray, kill aura, fly hacks, speed hacks, and auto-clickers. Optifine and approved mods are allowed." },
      { rule: "No exploiting bugs or glitches.", detail: "Report any bugs you find to staff immediately. Exploiting gives unfair advantages." },
      { rule: "No griefing in protected areas.", detail: "PvP and raiding rules vary by game mode — check specific mode rules." },
      { rule: "No AFK farming or botting.", detail: "Automated gameplay and AFK machines that bypass the AFK kick are not allowed." },
      { rule: "No real-money trading (RMT).", detail: "Trading in-game items or accounts for real money is strictly prohibited." },
    ],
  },
  {
    title: "Chat & Communication",
    rules: [
      { rule: "No hate speech or discrimination.", detail: "Zero tolerance for racism, sexism, homophobia, or any form of discrimination." },
      { rule: "No sharing personal information.", detail: "Protect yourself and others — don't share real names, addresses, or phone numbers." },
      { rule: "No impersonating staff.", detail: "Pretending to be a staff member is a bannable offense." },
      { rule: "Listen to staff decisions.", detail: "Staff decisions are final. If you disagree, appeal through the proper channels on Discord." },
    ],
  },
  {
    title: "Punishments",
    rules: [
      { rule: "1st Offense: Warning or temporary mute.", detail: "Duration depends on severity." },
      { rule: "2nd Offense: Temporary ban (1-7 days).", detail: "Repeated violations escalate punishment duration." },
      { rule: "3rd Offense: Extended ban (30 days).", detail: "Serious or repeated offenses may skip to this tier." },
      { rule: "Severe Violations: Permanent ban.", detail: "Hacking, doxxing, DDoS threats, or extreme toxicity result in immediate permanent bans." },
    ],
  },
];

const RulesPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary neon-text mb-4">
            <Shield className="inline-block w-10 h-10 mr-3 mb-1" />
            Server Rules
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Please read and follow all rules. Ignorance is not an excuse. Rules are subject to change.</p>
        </div>

        <div className="glass rounded-xl p-5 mb-8 flex items-start gap-3 border-primary/30 border">
          <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            By joining our server, you agree to follow all rules listed below. Violations will result in appropriate punishments. Appeals can be made on our <a href="https://discord.gg/yourserver" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Discord server</a>.
          </p>
        </div>

        <div className="space-y-8">
          {ruleCategories.map((cat, ci) => (
            <section key={cat.title}>
              <h2 className="font-display text-xl font-bold text-accent cyan-text mb-4">{cat.title}</h2>
              <div className="space-y-3">
                {cat.rules.map((r, ri) => (
                  <div key={ri} className="glass rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="font-display text-sm font-bold text-primary min-w-[2rem]">
                        {ci + 1}.{ri + 1}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{r.rule}</p>
                        <p className="text-sm text-muted-foreground mt-1">{r.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default RulesPage;
