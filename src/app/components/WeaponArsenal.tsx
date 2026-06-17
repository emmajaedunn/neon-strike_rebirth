import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";

const WEAPONS = [
  {
    id: "assault",
    name: "PHANTOM-X9",
    type: "Assault Rifle",
    desc: "Adaptive recoil compensation with neural-link targeting. Standard issue for front-line operatives.",
    color: "#00d4ff",
    stats: { damage: 72, accuracy: 81, fireRate: 88, mobility: 74 },
    ammo: "5.56 × 45mm SMART",
    rpm: "800 RPM",
    range: "400m EFFECTIVE",
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=600&h=300&fit=crop&auto=format",
  },
  {
    id: "sniper",
    name: "VOID LANCE",
    type: "Energy Sniper",
    desc: "Plasma-charged bolt that phases through light cover. One shot — zero survivors.",
    color: "#b400ff",
    stats: { damage: 99, accuracy: 95, fireRate: 22, mobility: 38 },
    ammo: "PLASMA CELL × 6",
    rpm: "20 RPM",
    range: "2400m EFFECTIVE",
    image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=600&h=300&fit=crop&auto=format",
  },
  {
    id: "smg",
    name: "VORTEX SMG",
    type: "Plasma SMG",
    desc: "Micro-plasma bursts with zero falloff at close range. Built for CQB and corridor carnage.",
    color: "#ff6600",
    stats: { damage: 58, accuracy: 64, fireRate: 98, mobility: 95 },
    ammo: "PLASMA MAG × 40",
    rpm: "1400 RPM",
    range: "150m EFFECTIVE",
    image: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=600&h=300&fit=crop&auto=format",
  },
  {
    id: "shotgun",
    name: "GRAVEDIGGER",
    type: "Smart Shotgun",
    desc: "Target-tracking fragmentation shells. At close range, there are no survivors.",
    color: "#ff0055",
    stats: { damage: 96, accuracy: 55, fireRate: 42, mobility: 60 },
    ammo: "12G SMART FRAG × 8",
    rpm: "100 RPM",
    range: "80m EFFECTIVE",
    image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&h=300&fit=crop&auto=format",
  },
];

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-20 shrink-0"
        style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "rgba(232,234,240,0.5)", letterSpacing: "0.1em" }}
      >
        {label}
      </span>
      <div className="flex-1 h-[3px]" style={{ background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          className="h-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 8px ${color}` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
      <motion.span
        className="w-8 text-right shrink-0"
        style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.65rem", color, fontWeight: 700 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {value}
      </motion.span>
    </div>
  );
}

export function WeaponArsenal() {
  const [selected, setSelected] = useState(WEAPONS[0]);
  const [ammoCount, setAmmoCount] = useState(0);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    let count = 0;
    const target = parseInt(selected.ammo.match(/\d+/)?.[0] || "30");
    const interval = setInterval(() => {
      count += Math.ceil(target / 20);
      if (count >= target) {
        count = target;
        clearInterval(interval);
      }
      setAmmoCount(count);
    }, 50);
    return () => clearInterval(interval);
  }, [selected]);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden" style={{ background: "#06060a" }}>
      {/* BG grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
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
            style={{ fontFamily: "'Share Tech Mono', monospace", color: "#b400ff", border: "1px solid rgba(180,0,255,0.3)", letterSpacing: "0.3em" }}
          >
            COMBAT LOADOUT
          </div>
          <h2
            style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#ffffff" }}
          >
            WEAPON
            <span style={{ color: "#b400ff", textShadow: "0 0 30px rgba(180,0,255,0.6)" }}> ARSENAL</span>
          </h2>
        </motion.div>

        {/* Weapon selector tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {WEAPONS.map((w) => (
            <button
              key={w.id}
              onClick={() => setSelected(w)}
              className="px-5 py-2 text-xs tracking-widest transition-all duration-200"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                background: selected.id === w.id ? w.color : "transparent",
                color: selected.id === w.id ? "#050508" : "rgba(232,234,240,0.5)",
                border: `1px solid ${selected.id === w.id ? w.color : "rgba(255,255,255,0.1)"}`,
                boxShadow: selected.id === w.id ? `0 0 20px ${w.color}44` : "none",
                letterSpacing: "0.2em",
              }}
            >
              {w.type.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Main weapon display */}
        <motion.div
          key={selected.id}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Left: weapon image & holographic info */}
          <div className="relative">
            <div
              className="relative overflow-hidden"
              style={{
                border: `1px solid ${selected.color}33`,
                background: "rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-56 object-cover"
                style={{ filter: `saturate(0.6) brightness(0.7) hue-rotate(${selected.color === "#00d4ff" ? "0" : selected.color === "#b400ff" ? "260" : selected.color === "#ff6600" ? "30" : "330"}deg)` }}
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${selected.color}11 0%, transparent 60%)` }}
              />

              {/* Neon outline pulse */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ boxShadow: `inset 0 0 30px ${selected.color}22` }}
              />

              {/* Crosshair overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-16 h-16">
                  <div className="absolute top-0 left-1/2 w-[1px] h-4 -translate-x-1/2" style={{ background: `${selected.color}88` }} />
                  <div className="absolute bottom-0 left-1/2 w-[1px] h-4 -translate-x-1/2" style={{ background: `${selected.color}88` }} />
                  <div className="absolute left-0 top-1/2 w-4 h-[1px] -translate-y-1/2" style={{ background: `${selected.color}88` }} />
                  <div className="absolute right-0 top-1/2 w-4 h-[1px] -translate-y-1/2" style={{ background: `${selected.color}88` }} />
                  <div className="absolute inset-4 rounded-full" style={{ border: `1px solid ${selected.color}44` }} />
                </div>
              </div>

              {/* Bottom HUD */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3 flex justify-between items-end"
                style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.9), transparent)" }}
              >
                <div>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.2rem", fontWeight: 900, color: selected.color }}>{selected.name}</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em" }}>{selected.type.toUpperCase()}</div>
                </div>
                <div className="text-right">
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.5rem", fontWeight: 900, color: "#ffffff" }}>
                    {ammoCount}
                  </div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
                    ROUNDS
                  </div>
                </div>
              </div>
            </div>

            {/* Small spec tags */}
            <div className="flex gap-3 mt-4">
              {[
                { label: "ROF", value: selected.rpm },
                { label: "RANGE", value: selected.range },
                { label: "AMMO", value: selected.ammo },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="flex-1 p-2"
                  style={{ border: `1px solid ${selected.color}22`, background: "rgba(0,0,0,0.4)" }}
                >
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: "rgba(232,234,240,0.4)", letterSpacing: "0.15em" }}>{spec.label}</div>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.6rem", color: selected.color, fontWeight: 700, marginTop: 2 }}>{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stats panel */}
          <div>
            <div
              className="p-8"
              style={{ border: `1px solid ${selected.color}22`, background: "rgba(0,0,0,0.4)" }}
            >
              <div
                className="mb-2 text-xs tracking-widest"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: selected.color, letterSpacing: "0.25em" }}
              >
                PERFORMANCE METRICS
              </div>
              <p
                className="mb-8 leading-relaxed"
                style={{ fontFamily: "'Exo 2', sans-serif", color: "rgba(232,234,240,0.6)", fontSize: "0.9rem" }}
              >
                {selected.desc}
              </p>

              <div className="space-y-5">
                <StatBar label="DAMAGE" value={selected.stats.damage} color={selected.color} />
                <StatBar label="ACCURACY" value={selected.stats.accuracy} color={selected.color} />
                <StatBar label="FIRE RATE" value={selected.stats.fireRate} color={selected.color} />
                <StatBar label="MOBILITY" value={selected.stats.mobility} color={selected.color} />
              </div>

              <button
                className="mt-8 w-full py-3 text-xs font-bold tracking-widest transition-all duration-200 hover:scale-[1.02]"
                style={{
                  fontFamily: "'Orbitron', monospace",
                  background: `linear-gradient(135deg, ${selected.color}, ${selected.color}88)`,
                  color: "#050508",
                  letterSpacing: "0.2em",
                }}
              >
                EQUIP WEAPON
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
