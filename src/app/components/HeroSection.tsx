import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Play, ShoppingCart } from "lucide-react";

interface HeroSectionProps {
  onWatchTrailer: () => void;
}

function RainEffect() {
  const drops = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 1.5 + 1,
    opacity: Math.random() * 0.4 + 0.1,
    width: Math.random() * 1.5 + 0.5,
    height: Math.random() * 60 + 40,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {drops.map((d) => (
        <motion.div
          key={d.id}
          className="absolute top-0"
          style={{
            left: `${d.left}%`,
            width: d.width,
            height: d.height,
            background: `linear-gradient(180deg, transparent, rgba(0,212,255,${d.opacity}))`,
            borderRadius: "9999px",
          }}
          animate={{ y: ["0vh", "110vh"] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    color: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#b400ff" : "#ff0055",
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          animate={{ y: [0, -40, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function HeroSection({ onWatchTrailer }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [scrambled, setScrambled] = useState("NEON STRIKE: REBIRTH");

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!$%&";
    const target = "NEON STRIKE: REBIRTH";
    let iteration = 0;
    let raf: number;

    const scramble = () => {
      const result = target
        .split("")
        .map((char, idx) => {
          if (idx < iteration) return char;
          if (char === " " || char === ":") return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      setScrambled(result);
      iteration += 0.3;
      if (iteration < target.length) {
        raf = requestAnimationFrame(scramble);
      } else {
        setScrambled(target);
      }
    };

    const delay = setTimeout(() => {
      raf = requestAnimationFrame(scramble);
    }, 300);

    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouseX((e.clientX - cx) / cx);
      setMouseY((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#050508" }}
    >
      {/* Parallax background */}
      <div
        ref={parallaxRef}
        className="absolute inset-[-5%] transition-transform duration-100"
        style={{ transform: `translate(${mouseX * -20}px, ${mouseY * -20}px)` }}
      >
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop&auto=format"
          alt="Futuristic city under siege"
          className="w-full h-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(5,5,8,0.3) 0%, rgba(5,5,8,0.1) 40%, rgba(5,5,8,0.7) 80%, #050508 100%)",
          }}
        />
        {/* Neon color overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at ${50 + mouseX * 5}% ${50 + mouseY * 5}%, rgba(0,212,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at ${30 - mouseX * 5}% 70%, rgba(180,0,255,0.08) 0%, transparent 50%)`,
          }}
        />
      </div>

      <RainEffect />
      <FloatingParticles />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        }}
      />

      {/* HUD elements */}
      <div className="absolute top-24 left-6 md:left-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(0,212,255,0.5)", fontSize: "0.6rem", letterSpacing: "0.2em" }}>
            <div>SYS.STATUS: ONLINE</div>
            <div>OPERATIVE: UNIDENTIFIED</div>
            <div className="mt-1" style={{ color: "#00d4ff" }}>▶ MISSION ACTIVE</div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-24 right-6 md:right-10 text-right pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(0,212,255,0.5)", fontSize: "0.6rem", letterSpacing: "0.2em" }}>
            <div>SECTOR: NEON DISTRICT</div>
            <div>THREAT LEVEL: CRITICAL</div>
            <div className="mt-1" style={{ color: "#ff0055" }}>⚠ HOSTILES DETECTED</div>
          </div>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Rating badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5"
          style={{
            border: "1px solid rgba(0,212,255,0.3)",
            background: "rgba(0,212,255,0.05)",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.65rem",
            color: "rgba(0,212,255,0.8)",
            letterSpacing: "0.25em",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          SERVERS ONLINE — BETA ENROLLMENT OPEN
        </motion.div>

        {/* Title */}
        <motion.h1
          className="mb-6 leading-none tracking-tight"
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(2.5rem, 8vw, 7rem)",
            fontWeight: 900,
            color: "#ffffff",
            textShadow: "0 0 60px rgba(0,212,255,0.5), 0 0 120px rgba(0,212,255,0.2)",
            letterSpacing: "0.05em",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        >
          {scrambled}
        </motion.h1>

        <motion.p
          className="mb-12 mx-auto"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            color: "rgba(232,234,240,0.7)",
            fontWeight: 500,
            letterSpacing: "0.2em",
            maxWidth: "600px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          "THE WAR FOR THE FUTURE BEGINS NOW."
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <button
            className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Orbitron', monospace",
              background: "linear-gradient(135deg, #00d4ff, #0088cc)",
              color: "#050508",
              clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
              boxShadow: "0 0 30px rgba(0,212,255,0.4)",
            }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #33ddff, #00aaff)" }}
            />
            <ShoppingCart size={16} className="relative z-10" />
            <span className="relative z-10">PRE-ORDER NOW</span>
          </button>

          <button
            className="group flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Orbitron', monospace",
              background: "transparent",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.3)",
              clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
            }}
            onClick={onWatchTrailer}
          >
            <span
              className="relative flex items-center justify-center w-8 h-8 rounded-full"
              style={{ border: "1px solid rgba(255,255,255,0.5)" }}
            >
              <Play size={12} fill="white" />
            </span>
            WATCH TRAILER
          </button>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(0,212,255,0.5)", fontSize: "0.6rem", letterSpacing: "0.3em" }}>
          SCROLL
        </div>
        <div className="w-[1px] h-10" style={{ background: "linear-gradient(180deg, rgba(0,212,255,0.6), transparent)" }} />
      </motion.div>
    </section>
  );
}
