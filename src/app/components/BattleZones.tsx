import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";

const ZONES = [
  {
    id: "neon",
    name: "NEON DISTRICT",
    code: "ZONE-01",
    x: 28,
    y: 38,
    status: "CONTESTED",
    statusColor: "#ff0055",
    players: "1,204",
    desc: "A sprawling urban nightmare of neon-drenched towers and underground tunnels. High verticality, constant rain, zero visibility zones.",
    lore: "Once the financial heart of New Meridian. Now controlled by rival factions fighting over collapsed AI infrastructure buried 40 floors underground.",
    modes: ["DOMINATION", "HARDPOINT", "SIEGE"],
    color: "#00d4ff",
  },
  {
    id: "blacksite",
    name: "BLACKSITE OMEGA",
    code: "ZONE-02",
    x: 58,
    y: 55,
    status: "ACTIVE",
    statusColor: "#00d4ff",
    players: "892",
    desc: "Classified military installation repurposed as a warzone. Tight corridors, hidden bunkers, experimental weapons caches.",
    lore: "A decommissioned DARPA facility that housed early neural-interface experiments. Rumored to contain a working prototype of the Omega AI — a weapon capable of ending the war in minutes.",
    modes: ["EXTRACTION", "SEARCH & DESTROY"],
    color: "#b400ff",
  },
  {
    id: "outlands",
    name: "THE OUTLANDS",
    code: "ZONE-03",
    x: 72,
    y: 28,
    status: "UNSTABLE",
    statusColor: "#ff6600",
    players: "2,011",
    desc: "Vast irradiated wastelands between city-states. Long sight lines, vehicle combat, dynamic weather with sand storms.",
    lore: "Scorched during the Third Energy War. Nomadic scavenger clans and PMC warlords battle over the last clean water reserves and solar farms.",
    modes: ["BIG TEAM BATTLE", "BATTLE ROYALE"],
    color: "#ff6600",
  },
  {
    id: "skyfall",
    name: "SKYFALL STATION",
    code: "ZONE-04",
    x: 45,
    y: 18,
    status: "SECURE",
    statusColor: "#22ff88",
    players: "634",
    desc: "Derelict orbital platform now used as a staging area. Zero-g sections, EMP events, and the ever-present threat of hull breach.",
    lore: "Station NSR-7 was humanity's first permanent orbital habitat. After the Cascade Failure, it became a lawless outpost — the last point between Earth's war and the silence of space.",
    modes: ["CAPTURE THE FLAG", "ESCALATION"],
    color: "#22ff88",
  },
];

export function BattleZones() {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const zone = ZONES.find((z) => z.id === activeZone);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden" style={{ background: "#06060a" }}>
      {/* Stars/dots background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: "rgba(0,212,255,0.3)",
              opacity: Math.random() * 0.6 + 0.2,
            }}
          />
        ))}
      </div>

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
            style={{ fontFamily: "'Share Tech Mono', monospace", color: "#22ff88", border: "1px solid rgba(34,255,136,0.3)", letterSpacing: "0.3em" }}
          >
            GLOBAL CONFLICT MAP
          </div>
          <h2
            style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#ffffff" }}
          >
            BATTLE
            <span style={{ color: "#22ff88", textShadow: "0 0 30px rgba(34,255,136,0.6)" }}> ZONES</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <motion.div
            className="lg:col-span-2 relative overflow-hidden"
            style={{ minHeight: 420, background: "rgba(0,0,0,0.6)", border: "1px solid rgba(0,212,255,0.15)" }}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Map image */}
            <img
              src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&h=500&fit=crop&auto=format"
              alt="Battle map"
              className="w-full h-full object-cover absolute inset-0"
              style={{ opacity: 0.15, filter: "hue-rotate(180deg) saturate(2)" }}
            />

            {/* Hex grid overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at center, rgba(0,212,255,0.05) 0%, transparent 70%)`,
              }}
            />

            {/* Scanning line animation */}
            <motion.div
              className="absolute left-0 right-0 h-[1px] pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)" }}
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            {/* Zone markers */}
            {ZONES.map((z) => (
              <motion.button
                key={z.id}
                className="absolute"
                style={{ left: `${z.x}%`, top: `${z.y}%`, transform: "translate(-50%, -50%)" }}
                onClick={() => setActiveZone(activeZone === z.id ? null : z.id)}
                whileHover={{ scale: 1.2 }}
              >
                {/* Pulse rings */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: z.color }}
                  animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: z.color }}
                  animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                {/* Dot */}
                <div
                  className="relative w-4 h-4 rounded-full flex items-center justify-center"
                  style={{
                    background: z.color,
                    boxShadow: `0 0 12px ${z.color}, 0 0 24px ${z.color}66`,
                    border: activeZone === z.id ? `2px solid white` : "none",
                  }}
                />
                {/* Label */}
                <div
                  className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5"
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.55rem",
                    color: z.color,
                    letterSpacing: "0.1em",
                    background: "rgba(5,5,8,0.8)",
                    border: `1px solid ${z.color}33`,
                  }}
                >
                  {z.name}
                </div>
              </motion.button>
            ))}

            {/* Map legend */}
            <div
              className="absolute bottom-4 left-4 space-y-1"
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em" }}
            >
              {[
                { color: "#ff0055", label: "CONTESTED" },
                { color: "#00d4ff", label: "ACTIVE" },
                { color: "#ff6600", label: "UNSTABLE" },
                { color: "#22ff88", label: "SECURE" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span style={{ color: "rgba(232,234,240,0.5)" }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Coordinates readout */}
            <div
              className="absolute top-4 right-4"
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: "rgba(0,212,255,0.4)", letterSpacing: "0.1em" }}
            >
              <div>LAT: 23.4°N</div>
              <div>LON: 118.7°E</div>
              <div>ALT: 248m</div>
            </div>
          </motion.div>

          {/* Zone info panel */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {zone ? (
                <motion.div
                  key={zone.id}
                  className="p-6 h-full"
                  style={{ background: "rgba(0,0,0,0.6)", border: `1px solid ${zone.color}44` }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div
                    className="mb-1 text-xs tracking-widest"
                    style={{ fontFamily: "'Share Tech Mono', monospace", color: zone.color, letterSpacing: "0.2em" }}
                  >
                    {zone.code}
                  </div>
                  <h3
                    className="mb-3"
                    style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.1rem", fontWeight: 900, color: "#ffffff" }}
                  >
                    {zone.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: zone.statusColor }} />
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: zone.statusColor, letterSpacing: "0.15em" }}>{zone.status}</span>
                    <span className="ml-auto" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "rgba(232,234,240,0.4)" }}>
                      {zone.players} ACTIVE
                    </span>
                  </div>

                  <p
                    className="mb-4 text-sm leading-relaxed"
                    style={{ fontFamily: "'Exo 2', sans-serif", color: "rgba(232,234,240,0.7)" }}
                  >
                    {zone.desc}
                  </p>

                  <p
                    className="mb-5 text-xs leading-relaxed italic"
                    style={{ fontFamily: "'Exo 2', sans-serif", color: "rgba(232,234,240,0.4)" }}
                  >
                    "{zone.lore}"
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {zone.modes.map((mode) => (
                      <span
                        key={mode}
                        className="px-2 py-1 text-xs"
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "0.55rem",
                          background: `${zone.color}0f`,
                          border: `1px solid ${zone.color}33`,
                          color: zone.color,
                          letterSpacing: "0.1em",
                        }}
                      >
                        {mode}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="p-6 flex flex-col items-center justify-center text-center"
                  style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(0,212,255,0.1)", minHeight: 300 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div
                    className="mb-4 text-4xl"
                    style={{ fontFamily: "'Orbitron', monospace", color: "rgba(0,212,255,0.15)", fontWeight: 900 }}
                  >
                    ◎
                  </div>
                  <p
                    style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "rgba(0,212,255,0.4)", letterSpacing: "0.2em" }}
                  >
                    SELECT A ZONE ON THE MAP
                  </p>
                  <div className="mt-6 space-y-2 w-full">
                    {ZONES.map((z) => (
                      <button
                        key={z.id}
                        onClick={() => setActiveZone(z.id)}
                        className="w-full text-left px-3 py-2 flex items-center gap-2 transition-all duration-200 hover:opacity-80"
                        style={{ border: `1px solid ${z.color}22`, background: `${z.color}08` }}
                      >
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: z.color }} />
                        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: z.color, letterSpacing: "0.1em" }}>{z.name}</span>
                        <span className="ml-auto" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: z.statusColor }}>{z.status}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
