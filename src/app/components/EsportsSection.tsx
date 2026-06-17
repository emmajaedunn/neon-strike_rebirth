import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { Trophy, Users, Calendar, DollarSign } from "lucide-react";

const TEAMS = [
  { rank: 1, name: "GHOST PROTOCOL", tag: "GHP", wins: 18, losses: 2, winrate: "90%", points: 2840, change: "+120", trend: "up" },
  { rank: 2, name: "VOID SYNDICATE", tag: "VDS", wins: 16, losses: 4, winrate: "80%", points: 2620, change: "+85", trend: "up" },
  { rank: 3, name: "NEON WOLVES", tag: "NNW", wins: 15, losses: 5, winrate: "75%", points: 2480, change: "-30", trend: "down" },
  { rank: 4, name: "APEX DIVISION", tag: "APX", wins: 14, losses: 6, winrate: "70%", points: 2340, change: "+45", trend: "up" },
  { rank: 5, name: "SHADOW LEGION", tag: "SHL", wins: 12, losses: 8, winrate: "60%", points: 2100, change: "+12", trend: "up" },
  { rank: 6, name: "IRON CIRCUIT", tag: "IRC", wins: 10, losses: 10, winrate: "50%", points: 1880, change: "-60", trend: "down" },
];

const EVENTS = [
  { name: "NSR WORLD CHAMPIONSHIP", date: "AUG 15–20, 2025", prize: "$2,000,000", status: "REGISTRATION OPEN", color: "#00d4ff" },
  { name: "NEON CUP QUALIFIER", date: "JULY 8–10, 2025", prize: "$250,000", status: "LIVE NOW", color: "#ff0055" },
  { name: "PRO LEAGUE SPLIT 2", date: "JUNE 24, 2025", prize: "$500,000", status: "UPCOMING", color: "#b400ff" },
];

function CountdownTimer() {
  const [time, setTime] = useState({ d: 22, h: 14, m: 38, s: 45 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { d, h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }
        if (d < 0) { d = 0; }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3">
      {[
        { label: "DAYS", value: time.d },
        { label: "HRS", value: time.h },
        { label: "MIN", value: time.m },
        { label: "SEC", value: time.s },
      ].map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="text-center">
            <div
              className="w-14 h-14 flex items-center justify-center"
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "1.4rem",
                fontWeight: 900,
                color: "#00d4ff",
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.3)",
                textShadow: "0 0 15px rgba(0,212,255,0.8)",
              }}
            >
              {String(value).padStart(2, "0")}
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.5rem", color: "rgba(0,212,255,0.5)", letterSpacing: "0.15em", marginTop: 4 }}>
              {label}
            </div>
          </div>
          {i < 3 && (
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.2rem", fontWeight: 900, color: "rgba(0,212,255,0.4)", marginBottom: 16 }}>:</div>
          )}
        </div>
      ))}
    </div>
  );
}

export function EsportsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden" style={{ background: "#050508" }}>
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 60%)" }}
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
            COMPETITIVE PLAY
          </div>
          <h2
            style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#ffffff" }}
          >
            ENTER THE
            <span style={{ color: "#00d4ff", textShadow: "0 0 30px rgba(0,212,255,0.6)" }}> ARENA</span>
          </h2>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {[
            { icon: Trophy, label: "PRIZE POOL", value: "$2.75M", color: "#00d4ff" },
            { icon: Users, label: "REGISTERED TEAMS", value: "4,200+", color: "#b400ff" },
            { icon: Calendar, label: "LIVE EVENTS", value: "3", color: "#ff0055" },
            { icon: DollarSign, label: "TOTAL PAID OUT", value: "$8.4M", color: "#ff6600" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="p-5 flex flex-col items-center text-center"
              style={{ border: `1px solid ${color}22`, background: "rgba(0,0,0,0.4)" }}
            >
              <Icon size={20} style={{ color, marginBottom: 8, opacity: 0.7 }} />
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.5rem", fontWeight: 900, color, textShadow: `0 0 20px ${color}66` }}>{value}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: "rgba(232,234,240,0.4)", letterSpacing: "0.15em", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Team rankings */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div
              className="p-6"
              style={{ border: "1px solid rgba(0,212,255,0.15)", background: "rgba(0,0,0,0.4)" }}
            >
              <div
                className="mb-4 text-xs tracking-widest"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00d4ff", letterSpacing: "0.25em" }}
              >
                PRO LEAGUE — SEASON 3 STANDINGS
              </div>

              {/* Column headers */}
              <div
                className="grid grid-cols-12 gap-2 pb-3 mb-2"
                style={{ borderBottom: "1px solid rgba(0,212,255,0.1)", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: "rgba(232,234,240,0.35)", letterSpacing: "0.1em" }}
              >
                <div className="col-span-1">#</div>
                <div className="col-span-5">TEAM</div>
                <div className="col-span-2 text-center">W/L</div>
                <div className="col-span-2 text-center">WIN%</div>
                <div className="col-span-2 text-right">PTS</div>
              </div>

              {TEAMS.map((team, i) => (
                <motion.div
                  key={team.tag}
                  className="grid grid-cols-12 gap-2 py-3 items-center hover:bg-white/[0.02] transition-colors cursor-pointer"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.5 }}
                >
                  <div
                    className="col-span-1"
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "0.75rem",
                      fontWeight: 900,
                      color: i === 0 ? "#ffd700" : i === 1 ? "#c0c0c0" : i === 2 ? "#cd7f32" : "rgba(232,234,240,0.4)",
                    }}
                  >
                    {team.rank}
                  </div>
                  <div className="col-span-5">
                    <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#e8eaf0", letterSpacing: "0.05em" }}>{team.name}</div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: "rgba(0,212,255,0.5)", letterSpacing: "0.1em" }}>[{team.tag}]</div>
                  </div>
                  <div className="col-span-2 text-center" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "rgba(232,234,240,0.5)" }}>
                    <span style={{ color: "#22ff88" }}>{team.wins}</span>
                    <span style={{ color: "rgba(232,234,240,0.3)" }}> / </span>
                    <span style={{ color: "#ff0055" }}>{team.losses}</span>
                  </div>
                  <div className="col-span-2 text-center" style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.65rem", color: "#00d4ff", fontWeight: 700 }}>{team.winrate}</div>
                  <div className="col-span-2 text-right">
                    <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.75rem", color: "#ffffff", fontWeight: 900 }}>{team.points.toLocaleString()}</div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.5rem", color: team.trend === "up" ? "#22ff88" : "#ff0055" }}>{team.change}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right panel: countdown + events */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Countdown */}
            <div
              className="p-6"
              style={{ border: "1px solid rgba(0,212,255,0.2)", background: "rgba(0,0,0,0.5)" }}
            >
              <div
                className="mb-1 text-xs tracking-widest"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00d4ff", letterSpacing: "0.25em" }}
              >
                WORLD CHAMPIONSHIP
              </div>
              <div
                className="mb-4 text-xs"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "rgba(232,234,240,0.4)", letterSpacing: "0.1em" }}
              >
                REGISTRATION CLOSES IN:
              </div>
              <CountdownTimer />
            </div>

            {/* Events */}
            <div className="space-y-3">
              {EVENTS.map((evt) => (
                <div
                  key={evt.name}
                  className="p-4 cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ border: `1px solid ${evt.color}33`, background: `${evt.color}08` }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div
                      className="w-2 h-2 rounded-full mt-1 animate-pulse"
                      style={{ background: evt.color, boxShadow: `0 0 8px ${evt.color}` }}
                    />
                    <span
                      className="text-xs px-2 py-0.5"
                      style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: evt.color, border: `1px solid ${evt.color}44`, letterSpacing: "0.1em" }}
                    >
                      {evt.status}
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#e8eaf0", letterSpacing: "0.05em" }}>{evt.name}</div>
                  <div className="flex justify-between items-center mt-1">
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: "rgba(232,234,240,0.4)" }}>{evt.date}</span>
                    <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.65rem", color: evt.color, fontWeight: 700 }}>{evt.prize}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
