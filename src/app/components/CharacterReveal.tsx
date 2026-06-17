import { useState } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Shield, Zap, Target } from "lucide-react";

const CHARACTERS = [
  {
    id: "ghost",
    name: "GHOST",
    role: "Stealth Assassin",
    codename: "OPERATIVE-7",
    bio: "Former black-ops specialist turned mercenary. Moves like a shadow — you won't hear her coming.",
    color: "#00d4ff",
    accentColor: "rgba(0,212,255,0.2)",
    skills: ["CLOAK FIELD", "SILENT BLADE", "NEURAL HACK"],
    stats: { agility: 95, stealth: 99, lethality: 88 },
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop&auto=format",
    icon: Target,
    tag: "ELITE",
  },
  {
    id: "nova",
    name: "NOVA",
    role: "Combat Hacker",
    codename: "CIPHER-12",
    bio: "Child prodigy, neural-augmented at 14. She doesn't fight the machines — she commands them.",
    color: "#b400ff",
    accentColor: "rgba(180,0,255,0.2)",
    skills: ["SYSTEM BREACH", "DRONE SWARM", "EMP PULSE"],
    stats: { agility: 78, stealth: 70, lethality: 92 },
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&auto=format",
    icon: Zap,
    tag: "HACKER",
  },
  {
    id: "titan",
    name: "TITAN",
    role: "Heavy Weapons Specialist",
    codename: "WARHOUND-1",
    bio: "Enhanced supersoldier with cybernetic reinforcement. He is the wall. He is the weapon.",
    color: "#ff0055",
    accentColor: "rgba(255,0,85,0.2)",
    skills: ["ARMOR PLATING", "MINIGUN MODE", "SHOCKWAVE"],
    stats: { agility: 55, stealth: 30, lethality: 99 },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&auto=format",
    icon: Shield,
    tag: "HEAVY",
  },
];

function GlitchEffect({ active, color }: { active: boolean; color: string }) {
  if (!active) return null;
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-20"
      animate={{
        clipPath: [
          "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
          "polygon(0 45%, 100% 45%, 100% 55%, 0 55%)",
          "polygon(0 70%, 100% 70%, 100% 100%, 0 100%)",
          "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ],
        x: [0, 8, -6, 0],
      }}
      transition={{ duration: 0.3, times: [0, 0.3, 0.6, 1] }}
      style={{ background: color, opacity: 0.15 }}
    />
  );
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "rgba(232,234,240,0.5)", letterSpacing: "0.15em" }}>{label}</span>
        <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.65rem", color, fontWeight: 700 }}>{value}</span>
      </div>
      <div className="h-[2px] w-full" style={{ background: "rgba(255,255,255,0.1)" }}>
        <motion.div
          className="h-full"
          style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
}

export function CharacterReveal() {
  const [activeChar, setActiveChar] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden" style={{ background: "#050508" }}>
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div
            className="inline-block mb-4 text-xs tracking-widest px-4 py-1"
            style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.3)", letterSpacing: "0.3em" }}
          >
            OPERATIVE DOSSIERS
          </div>
          <h2
            className="leading-none"
            style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#ffffff" }}
          >
            CHOOSE YOUR
            <span style={{ color: "#00d4ff", textShadow: "0 0 30px rgba(0,212,255,0.6)" }}> OPERATIVE</span>
          </h2>
        </motion.div>

        {/* Character cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHARACTERS.map((char, i) => {
            const Icon = char.icon;
            const isActive = activeChar === char.id;
            return (
              <motion.div
                key={char.id}
                className="relative cursor-pointer group overflow-hidden"
                style={{
                  background: isActive ? char.accentColor : "rgba(10,11,18,0.8)",
                  border: `1px solid ${isActive ? char.color : "rgba(255,255,255,0.08)"}`,
                  boxShadow: isActive ? `0 0 40px ${char.accentColor}, 0 0 80px ${char.accentColor}` : "none",
                  transition: "all 0.4s ease",
                }}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                onHoverStart={() => setActiveChar(char.id)}
                onHoverEnd={() => setActiveChar(null)}
              >
                <GlitchEffect active={isActive} color={char.color} />

                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: isActive ? `saturate(1.3) brightness(1.1)` : "saturate(0.6) brightness(0.7)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, transparent 40%, ${char.color}22 70%, #050508 100%)`,
                    }}
                  />
                  {/* Tag */}
                  <div
                    className="absolute top-4 right-4 px-2 py-1 text-xs font-bold tracking-widest"
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      background: char.color,
                      color: "#050508",
                      fontSize: "0.6rem",
                    }}
                  >
                    {char.tag}
                  </div>
                  {/* Codename */}
                  <div
                    className="absolute bottom-4 left-4"
                    style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em" }}
                  >
                    {char.codename}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className="tracking-widest"
                      style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.4rem", fontWeight: 900, color: char.color, textShadow: isActive ? `0 0 20px ${char.color}` : "none" }}
                    >
                      {char.name}
                    </h3>
                    <Icon size={18} style={{ color: char.color, opacity: 0.7 }} />
                  </div>

                  <p
                    className="mb-3 text-xs tracking-widest"
                    style={{ fontFamily: "'Rajdhani', sans-serif", color: "rgba(232,234,240,0.5)", fontWeight: 600, letterSpacing: "0.25em" }}
                  >
                    {char.role.toUpperCase()}
                  </p>

                  <p
                    className="mb-5 text-sm leading-relaxed"
                    style={{ fontFamily: "'Exo 2', sans-serif", color: "rgba(232,234,240,0.6)" }}
                  >
                    {char.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {char.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs"
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          background: `${char.color}11`,
                          border: `1px solid ${char.color}33`,
                          color: char.color,
                          fontSize: "0.6rem",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="space-y-2">
                    <StatBar label="AGILITY" value={char.stats.agility} color={char.color} />
                    <StatBar label="STEALTH" value={char.stats.stealth} color={char.color} />
                    <StatBar label="LETHALITY" value={char.stats.lethality} color={char.color} />
                  </div>
                </div>

                {/* Bottom line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500"
                  style={{ background: isActive ? `linear-gradient(90deg, transparent, ${char.color}, transparent)` : "transparent" }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
