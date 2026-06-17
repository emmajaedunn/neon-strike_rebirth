import { useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { Users, Tv, Youtube, Twitter } from "lucide-react";

const PLATFORMS = [
  {
    name: "Discord",
    icon: Users,
    stat: "847K",
    statLabel: "Members",
    subStat: "+12K this week",
    desc: "Join the official server. Squad finder, patch notes, and the largest NSR community hub.",
    color: "#5865F2",
    bg: "rgba(88,101,242,0.08)",
    border: "rgba(88,101,242,0.25)",
    status: "ONLINE",
    activity: "4,201 active now",
    handle: "discord.gg/neonstrikerebirth",
  },
  {
    name: "Twitch",
    icon: Tv,
    stat: "2.3M",
    statLabel: "Followers",
    subStat: "Peak 180K concurrent",
    desc: "Watch pro play, developer streams, and 24/7 community broadcasts.",
    color: "#9146FF",
    bg: "rgba(145,70,255,0.08)",
    border: "rgba(145,70,255,0.25)",
    status: "LIVE",
    activity: "87K watching",
    handle: "twitch.tv/neonstrikeofficial",
  },
  {
    name: "YouTube",
    icon: Youtube,
    stat: "5.1M",
    statLabel: "Subscribers",
    subStat: "120M total views",
    desc: "Trailers, dev diaries, lore drops, and official tournament VODs.",
    color: "#FF0000",
    bg: "rgba(255,0,0,0.06)",
    border: "rgba(255,0,0,0.25)",
    status: "NEW VIDEO",
    activity: "Posted 2 hrs ago",
    handle: "@NeonStrikeGame",
  },
  {
    name: "X / Twitter",
    icon: Twitter,
    stat: "1.8M",
    statLabel: "Followers",
    subStat: "#NeonStrike trending",
    desc: "Real-time patch updates, community spotlights, and developer announcements.",
    color: "#1D9BF0",
    bg: "rgba(29,155,240,0.06)",
    border: "rgba(29,155,240,0.25)",
    status: "TRENDING",
    activity: "24.4K mentions today",
    handle: "@NeonStrikeGame",
  },
];

export function CommunitySection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden" style={{ background: "#050508" }}>
      {/* BG glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 60%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div
            className="inline-block mb-4 text-xs tracking-widest px-4 py-1"
            style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.3)", letterSpacing: "0.3em" }}
          >
            JOIN THE MOVEMENT
          </div>
          <h2
            style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#ffffff" }}
          >
            THE
            <span style={{ color: "#00d4ff", textShadow: "0 0 30px rgba(0,212,255,0.6)" }}> COMMUNITY</span>
          </h2>
          <p
            className="mt-4 mx-auto max-w-lg"
            style={{ fontFamily: "'Exo 2', sans-serif", color: "rgba(232,234,240,0.5)", fontSize: "0.95rem" }}
          >
            Millions of operatives worldwide. One unified front. Find your squad, share your highlights, and shape the future of Neon Strike.
          </p>
        </motion.div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLATFORMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.name}
                className="relative group cursor-pointer overflow-hidden"
                style={{
                  background: p.bg,
                  border: `1px solid ${p.border}`,
                  transition: "all 0.3s ease",
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ y: -6, boxShadow: `0 20px 60px ${p.color}22` }}
              >
                {/* Animated border glow on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 30px ${p.color}18`, border: `1px solid ${p.color}55` }}
                />

                <div className="p-6">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center"
                      style={{ background: `${p.color}18`, border: `1px solid ${p.color}33` }}
                    >
                      <Icon size={18} style={{ color: p.color }} />
                    </div>
                    <div
                      className="px-2 py-0.5 flex items-center gap-1"
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "0.5rem",
                        color: p.color,
                        border: `1px solid ${p.color}44`,
                        letterSpacing: "0.1em",
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: p.color }} />
                      {p.status}
                    </div>
                  </div>

                  {/* Platform name */}
                  <div
                    className="mb-1"
                    style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.75rem", fontWeight: 700, color: p.color, letterSpacing: "0.1em" }}
                  >
                    {p.name.toUpperCase()}
                  </div>

                  {/* Main stat */}
                  <div
                    style={{ fontFamily: "'Orbitron', monospace", fontSize: "2rem", fontWeight: 900, color: "#ffffff", lineHeight: 1.1, textShadow: `0 0 20px ${p.color}44` }}
                  >
                    {p.stat}
                  </div>
                  <div
                    className="mb-3"
                    style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: "rgba(232,234,240,0.4)", letterSpacing: "0.1em" }}
                  >
                    {p.statLabel.toUpperCase()}
                  </div>

                  {/* Sub stat */}
                  <div
                    className="mb-4 text-xs"
                    style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: `${p.color}cc`, letterSpacing: "0.05em" }}
                  >
                    {p.subStat}
                  </div>

                  {/* Description */}
                  <p
                    className="mb-4 text-xs leading-relaxed"
                    style={{ fontFamily: "'Exo 2', sans-serif", color: "rgba(232,234,240,0.5)", fontSize: "0.8rem" }}
                  >
                    {p.desc}
                  </p>

                  {/* Activity */}
                  <div
                    className="flex items-center gap-1.5 text-xs"
                    style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: "rgba(232,234,240,0.35)", letterSpacing: "0.05em" }}
                  >
                    <div className="w-1 h-1 rounded-full" style={{ background: "#22ff88" }} />
                    {p.activity}
                  </div>

                  {/* Handle */}
                  <div
                    className="mt-3 pt-3"
                    style={{ borderTop: `1px solid ${p.color}18`, fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: `${p.color}88`, letterSpacing: "0.05em" }}
                  >
                    {p.handle}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Newsletter bar */}
        <motion.div
          className="mt-16 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ border: "1px solid rgba(0,212,255,0.15)", background: "rgba(0,0,0,0.4)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div>
            <h3
              style={{ fontFamily: "'Orbitron', monospace", fontSize: "1rem", fontWeight: 900, color: "#ffffff", letterSpacing: "0.1em" }}
            >
              GET MISSION INTEL DELIVERED
            </h3>
            <p
              style={{ fontFamily: "'Exo 2', sans-serif", color: "rgba(232,234,240,0.5)", fontSize: "0.85rem", marginTop: 4 }}
            >
              Patch notes, lore drops, and exclusive beta access — straight to your inbox.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="operative@email.com"
              className="flex-1 md:w-64 px-4 py-3 text-sm outline-none"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                background: "rgba(0,212,255,0.05)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "rgba(232,234,240,0.8)",
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
              }}
            />
            <button
              className="px-6 py-3 text-xs font-bold tracking-widest transition-all duration-200 hover:scale-105 whitespace-nowrap"
              style={{
                fontFamily: "'Orbitron', monospace",
                background: "linear-gradient(135deg, #00d4ff, #0088cc)",
                color: "#050508",
                letterSpacing: "0.15em",
              }}
            >
              ENLIST
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
