import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { Play, X, Maximize2, Volume2, VolumeX } from "lucide-react";

export function TrailerSection() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden" style={{ background: "#06060a" }}>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(180,0,255,0.08) 0%, transparent 60%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div
            className="inline-block mb-4 text-xs tracking-widest px-4 py-1"
            style={{ fontFamily: "'Share Tech Mono', monospace", color: "#b400ff", border: "1px solid rgba(180,0,255,0.3)", letterSpacing: "0.3em" }}
          >
            OFFICIAL MEDIA
          </div>
          <h2
            style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#ffffff" }}
          >
            CINEMATIC
            <span style={{ color: "#b400ff", textShadow: "0 0 30px rgba(180,0,255,0.6)" }}> TRAILER</span>
          </h2>
        </motion.div>

        {/* Video player */}
        <motion.div
          className="relative overflow-hidden cursor-pointer group"
          style={{ border: "1px solid rgba(180,0,255,0.2)", aspectRatio: "16/9" }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          onClick={() => setPlaying(true)}
        >
          {/* Thumbnail */}
          <img
            src="https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?w=1200&h=675&fit=crop&auto=format"
            alt="Trailer thumbnail — cinematic cityscape"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
            style={{ filter: "brightness(0.4) saturate(0.8)" }}
          />

          {/* Color overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(180,0,255,0.15), rgba(0,212,255,0.05))" }}
          />

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)" }}
          />

          {/* Center play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Outer pulse */}
              <motion.div
                className="absolute rounded-full"
                style={{ width: 120, height: 120, border: "1px solid rgba(180,0,255,0.4)" }}
                animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute rounded-full"
                style={{ width: 100, height: 100, border: "1px solid rgba(180,0,255,0.5)" }}
                animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              />
              {/* Main button */}
              <div
                className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(180,0,255,0.2)",
                  border: "2px solid rgba(180,0,255,0.8)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 0 40px rgba(180,0,255,0.4)",
                }}
              >
                <Play size={24} fill="white" style={{ marginLeft: 4 }} />
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div
            className="absolute bottom-0 left-0 right-0 px-6 py-4 flex items-center justify-between"
            style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.9), transparent)" }}
          >
            <div>
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.85rem", fontWeight: 700, color: "#ffffff" }}>
                NEON STRIKE: REBIRTH — OFFICIAL CINEMATIC TRAILER
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "rgba(232,234,240,0.4)", letterSpacing: "0.1em", marginTop: 2 }}>
                3:47 • DOLBY VISION • 4K HDR
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
                className="p-2 transition-colors hover:text-white"
                style={{ color: "rgba(232,234,240,0.5)" }}
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                className="p-2 transition-colors hover:text-white"
                style={{ color: "rgba(232,234,240,0.5)" }}
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          {/* Duration progress */}
          <div className="absolute top-4 left-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div
              className="text-xs"
              style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(232,234,240,0.6)", fontSize: "0.6rem" }}
            >
              0:00
            </div>
            <div className="flex-1 h-[2px]" style={{ background: "rgba(255,255,255,0.2)" }}>
              <div className="h-full w-0" style={{ background: "#b400ff" }} />
            </div>
            <div
              className="text-xs"
              style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(232,234,240,0.6)", fontSize: "0.6rem" }}
            >
              3:47
            </div>
          </div>
        </motion.div>

        {/* Dynamic subtitles preview */}
        <motion.div
          className="mt-6 p-4 flex items-start gap-3"
          style={{ border: "1px solid rgba(180,0,255,0.15)", background: "rgba(0,0,0,0.4)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span
            className="shrink-0 text-xs px-2 py-0.5 mt-0.5"
            style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: "#b400ff", border: "1px solid rgba(180,0,255,0.4)", letterSpacing: "0.1em" }}
          >
            INTEL
          </span>
          <p
            style={{ fontFamily: "'Exo 2', sans-serif", color: "rgba(232,234,240,0.6)", fontSize: "0.85rem", fontStyle: "italic" }}
          >
            "They thought the war was over. They thought the machines had lost. They were wrong. The Rebirth Protocol has been activated — and this time, there are no rules."
          </p>
        </motion.div>

        {/* Modal overlay when playing */}
        <AnimatePresence>
          {playing && (
            <motion.div
              className="fixed inset-0 z-[200] flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                className="absolute top-6 right-6 p-2 transition-colors hover:text-white z-10"
                style={{ color: "rgba(232,234,240,0.5)" }}
                onClick={() => setPlaying(false)}
              >
                <X size={28} />
              </button>
              <div className="w-full max-w-5xl px-4">
                <div
                  className="relative flex items-center justify-center"
                  style={{ aspectRatio: "16/9", background: "#000", border: "1px solid rgba(180,0,255,0.3)" }}
                >
                  <div className="text-center">
                    <div
                      style={{ fontFamily: "'Orbitron', monospace", fontSize: "1rem", color: "rgba(180,0,255,0.6)", letterSpacing: "0.2em" }}
                    >
                      VIDEO PLAYER
                    </div>
                    <p
                      className="mt-2"
                      style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "rgba(232,234,240,0.3)" }}
                    >
                      Connect a real video source to enable playback
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
