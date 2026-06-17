import { useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { Crosshair, Cpu, Users, Map } from "lucide-react";

const FEATURES = [
  {
    icon: Crosshair,
    title: "TACTICAL COMBAT",
    subtitle: "Warfare Redefined",
    desc: "Experience hyper-realistic firefights with adaptive AI, destructible environments, and physics-based ballistics. Every engagement is a chess match played at gunpoint.",
    color: "#00d4ff",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop&auto=format",
    tags: ["ADAPTIVE AI", "BALLISTICS SIM", "DESTRUCTION"],
  },
  {
    icon: Cpu,
    title: "CYBER ABILITIES",
    subtitle: "Hack the Battlefield",
    desc: "Deploy neural hacks, commandeer drones, disable enemy systems, and exploit the connected world around you. The war is fought in code as much as combat.",
    color: "#b400ff",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&auto=format",
    tags: ["NEURAL LINK", "SYSTEM OVERRIDE", "DRONE WARFARE"],
  },
  {
    icon: Users,
    title: "SQUAD WARFARE",
    subtitle: "No One Fights Alone",
    desc: "5-versus-5 asymmetric squad battles where roles, synergies, and real-time coordination determine victory. Build your team. Execute the plan. Dominate.",
    color: "#ff6600",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=500&fit=crop&auto=format",
    tags: ["5v5 TACTICAL", "ROLE SYNERGY", "COMMS SYSTEM"],
  },
  {
    icon: Map,
    title: "DYNAMIC MAPS",
    subtitle: "The World Changes",
    desc: "Twelve launch maps with live environmental events — EMP storms, flooding districts, orbital strikes, and shifting day-night cycles that reshape every match.",
    color: "#ff0055",
    image: "https://images.unsplash.com/photo-1480044965905-02098d419e96?w=800&h=500&fit=crop&auto=format",
    tags: ["12 LAUNCH MAPS", "LIVE EVENTS", "DAY/NIGHT CYCLE"],
  },
];

export function GameplayFeatures() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden" style={{ background: "#050508" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div
            className="inline-block mb-4 text-xs tracking-widest px-4 py-1"
            style={{ fontFamily: "'Share Tech Mono', monospace", color: "#ff0055", border: "1px solid rgba(255,0,85,0.3)", letterSpacing: "0.3em" }}
          >
            CORE SYSTEMS
          </div>
          <h2
            style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#ffffff" }}
          >
            GAMEPLAY
            <span style={{ color: "#ff0055", textShadow: "0 0 30px rgba(255,0,85,0.6)" }}> FEATURES</span>
          </h2>
        </motion.div>

        {/* Feature panels */}
        <div className="space-y-6">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            const isReversed = i % 2 === 1;
            return (
              <motion.div
                key={feat.title}
                className={`grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden group ${isReversed ? "md:[&>*:first-child]:order-2" : ""}`}
                style={{ border: `1px solid ${feat.color}22` }}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.8 }}
              >
                {/* Image */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.55) saturate(0.7)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, ${feat.color}22, transparent 60%)` }}
                  />
                  {/* Icon overlay */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center"
                    style={{ border: `1px solid ${feat.color}44`, background: `${feat.color}11` }}
                  >
                    <Icon size={24} style={{ color: feat.color }} />
                  </div>
                  {/* Number */}
                  <div
                    className="absolute top-4 left-4"
                    style={{ fontFamily: "'Orbitron', monospace", fontSize: "3rem", fontWeight: 900, color: `${feat.color}18`, lineHeight: 1 }}
                  >
                    0{i + 1}
                  </div>
                </div>

                {/* Content */}
                <div
                  className="p-8 flex flex-col justify-center"
                  style={{ background: "rgba(8,9,15,0.9)" }}
                >
                  <div
                    className="mb-2 text-xs tracking-widest"
                    style={{ fontFamily: "'Share Tech Mono', monospace", color: feat.color, letterSpacing: "0.25em" }}
                  >
                    {feat.subtitle.toUpperCase()}
                  </div>
                  <h3
                    className="mb-4"
                    style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.4rem", fontWeight: 900, color: "#ffffff" }}
                  >
                    {feat.title}
                  </h3>
                  <p
                    className="mb-6 leading-relaxed"
                    style={{ fontFamily: "'Exo 2', sans-serif", color: "rgba(232,234,240,0.6)", fontSize: "0.9rem" }}
                  >
                    {feat.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {feat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1"
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "0.6rem",
                          background: `${feat.color}0f`,
                          border: `1px solid ${feat.color}33`,
                          color: feat.color,
                          letterSpacing: "0.1em",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
