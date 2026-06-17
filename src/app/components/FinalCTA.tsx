import { useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { ShoppingCart, Gamepad2 } from "lucide-react";

function EmberParticles() {
  const embers = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    startY: 100 + Math.random() * 20,
    color: i % 3 === 0 ? "#ff6600" : i % 3 === 1 ? "#ff0055" : "#ffcc00",
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 6,
    driftX: (Math.random() - 0.5) * 60,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {embers.map((e) => (
        <motion.div
          key={e.id}
          className="absolute rounded-full"
          style={{
            left: `${e.x}%`,
            bottom: `-${e.size}px`,
            width: e.size,
            height: e.size,
            background: e.color,
            boxShadow: `0 0 ${e.size * 3}px ${e.color}`,
          }}
          animate={{
            y: [0, -window.innerHeight * 0.8],
            x: [0, e.driftX],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function SmokeEffect() {
  const puffs = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 10 + i * 11,
    delay: i * 0.8,
    duration: 6 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {puffs.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${p.x}%`,
            width: "200px",
            height: "200px",
            background: "radial-gradient(ellipse, rgba(100,100,120,0.15) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
          animate={{
            y: [0, -120],
            scale: [0.5, 2],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export function FinalCTA() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#020205" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&auto=format"
          alt="Burning futuristic battlefield"
          className="w-full h-full object-cover"
          style={{ opacity: 0.25, filter: "saturate(0.6) brightness(0.5)" }}
        />
        {/* Deep atmospheric overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(2,2,5,0.6) 0%, rgba(2,2,5,0.3) 40%, rgba(2,2,5,0.8) 80%, #020205 100%)",
          }}
        />
        {/* Red horizon glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-96"
          style={{
            background: "linear-gradient(0deg, rgba(255,0,85,0.12) 0%, transparent 100%)",
          }}
        />
      </div>

      <EmberParticles />
      <SmokeEffect />

      {/* Flickering light effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0, 0.03, 0, 0.05, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 4 }}
        style={{ background: "#ffffff" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Character silhouette hint (text-based) */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 2 }}
        >
          <div
            className="text-[8rem] leading-none select-none"
            style={{ color: "rgba(255,0,85,0.05)", fontFamily: "'Orbitron', monospace", fontWeight: 900 }}
          >
            ▼
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          className="inline-flex items-center gap-3 mb-8 px-5 py-2"
          style={{ border: "1px solid rgba(255,0,85,0.3)", background: "rgba(255,0,85,0.05)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: "#ff0055" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span
            style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "#ff0055", letterSpacing: "0.3em" }}
          >
            PRE-ORDER OPEN — LIMITED SLOTS
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="mb-6 leading-none"
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(2rem, 6vw, 5rem)",
            fontWeight: 900,
            color: "#ffffff",
            textShadow: "0 0 80px rgba(255,0,85,0.3), 0 0 40px rgba(255,0,85,0.15)",
            letterSpacing: "0.02em",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 1 }}
        >
          THE FUTURE WILL NOT
          <br />
          <span style={{ color: "#ff0055", textShadow: "0 0 60px rgba(255,0,85,0.8)" }}>SAVE ITSELF.</span>
        </motion.h2>

        {/* Sub headline */}
        <motion.p
          className="mb-14"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            color: "rgba(232,234,240,0.6)",
            letterSpacing: "0.25em",
            fontWeight: 500,
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          "CHOOSE YOUR SIDE. REWRITE DESTINY."
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <button
            className="group relative overflow-hidden flex items-center gap-3 px-10 py-4 text-sm font-bold tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Orbitron', monospace",
              background: "linear-gradient(135deg, #ff0055, #cc0044)",
              color: "#ffffff",
              clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
              boxShadow: "0 0 40px rgba(255,0,85,0.5), 0 0 80px rgba(255,0,85,0.2)",
              letterSpacing: "0.15em",
            }}
          >
            <ShoppingCart size={16} />
            PRE-ORDER NOW
          </button>

          <button
            className="group flex items-center gap-3 px-10 py-4 text-sm font-bold tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Orbitron', monospace",
              background: "transparent",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.25)",
              clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
              letterSpacing: "0.15em",
            }}
          >
            <Gamepad2 size={16} />
            JOIN THE BETA
          </button>
        </motion.div>

        {/* Platform badges */}
        <motion.div
          className="mt-14 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {["PC", "PS5", "XBOX SERIES X|S"].map((platform) => (
            <div
              key={platform}
              className="px-4 py-2"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.6rem",
                color: "rgba(232,234,240,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                letterSpacing: "0.2em",
              }}
            >
              {platform}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
