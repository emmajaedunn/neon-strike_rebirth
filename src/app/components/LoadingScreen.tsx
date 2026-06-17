import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const SYSTEM_MESSAGES = [
  "INITIALIZING NEURAL INTERFACE...",
  "LOADING COMBAT PROTOCOLS...",
  "SYNCING OPERATIVE DATA...",
  "ESTABLISHING SECURE CHANNEL...",
  "CALIBRATING WEAPONS SYSTEM...",
  "DECRYPTING MISSION BRIEFING...",
  "SCANNING BIOMETRIC SIGNATURE...",
  "CONNECTING TO NEON GRID...",
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  const [logoExplode, setLogoExplode] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 1800);

    const scanInterval = setInterval(() => {
      setScanLine((p) => (p + 1) % 100);
    }, 30);

    const msgInterval = setInterval(() => {
      setCurrentMessage((p) => (p + 1) % SYSTEM_MESSAGES.length);
    }, 600);

    let p = 0;
    intervalRef.current = setInterval(() => {
      p += Math.random() * 3 + 0.5;
      if (p >= 100) {
        p = 100;
        clearInterval(intervalRef.current!);
        clearInterval(glitchInterval);
        clearInterval(msgInterval);
        setTimeout(() => {
          setLogoExplode(true);
          setTimeout(() => {
            setDone(true);
            onComplete();
          }, 900);
        }, 400);
      }
      setProgress(Math.min(p, 100));
    }, 60);

    return () => {
      clearInterval(intervalRef.current!);
      clearInterval(glitchInterval);
      clearInterval(scanInterval);
      clearInterval(msgInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#050508" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-[2px] pointer-events-none"
            style={{
              top: `${scanLine}%`,
              background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)",
              transition: "top 0.03s linear",
            }}
          />

          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Corner brackets */}
          {[
            "top-6 left-6 border-l-2 border-t-2",
            "top-6 right-6 border-r-2 border-t-2",
            "bottom-6 left-6 border-l-2 border-b-2",
            "bottom-6 right-6 border-r-2 border-b-2",
          ].map((cls, i) => (
            <div
              key={i}
              className={`absolute w-12 h-12 ${cls}`}
              style={{ borderColor: "rgba(0,212,255,0.6)" }}
            />
          ))}

          {/* Logo */}
          <motion.div
            className="relative mb-12 text-center"
            animate={
              logoExplode
                ? { scale: [1, 1.3, 0], opacity: [1, 1, 0] }
                : glitchActive
                ? { x: [0, -4, 4, -2, 0], skewX: [0, -3, 3, 0] }
                : {}
            }
            transition={{ duration: logoExplode ? 0.8 : 0.15 }}
          >
            <div
              className="relative"
              style={{
                fontFamily: "'Orbitron', monospace",
                letterSpacing: "0.25em",
              }}
            >
              {glitchActive && (
                <>
                  <div
                    className="absolute inset-0 flex flex-col items-center"
                    style={{
                      clipPath: "polygon(0 30%, 100% 30%, 100% 50%, 0 50%)",
                      transform: "translateX(4px)",
                      color: "#ff0055",
                      opacity: 0.8,
                    }}
                  >
                    <p className="text-5xl md:text-7xl font-black">NEON STRIKE</p>
                    <p className="text-xl md:text-3xl font-bold mt-1">REBIRTH</p>
                  </div>
                  <div
                    className="absolute inset-0 flex flex-col items-center"
                    style={{
                      clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
                      transform: "translateX(-4px)",
                      color: "#00d4ff",
                      opacity: 0.8,
                    }}
                  >
                    <p className="text-5xl md:text-7xl font-black">NEON STRIKE</p>
                    <p className="text-xl md:text-3xl font-bold mt-1">REBIRTH</p>
                  </div>
                </>
              )}
              <p
                className="text-5xl md:text-7xl font-black"
                style={{ color: "#00d4ff", textShadow: "0 0 40px rgba(0,212,255,0.8), 0 0 80px rgba(0,212,255,0.4)" }}
              >
                NEON STRIKE
              </p>
              <p
                className="text-xl md:text-3xl font-bold mt-2 tracking-[0.5em]"
                style={{ color: "#b400ff", textShadow: "0 0 30px rgba(180,0,255,0.8)" }}
              >
                REBIRTH
              </p>
            </div>
          </motion.div>

          {/* System messages */}
          <div
            className="h-6 mb-8 text-center"
            style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(0,212,255,0.7)", fontSize: "0.75rem", letterSpacing: "0.15em" }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentMessage}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {SYSTEM_MESSAGES[currentMessage]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="w-80 md:w-96 relative">
            <div
              className="w-full h-[2px] mb-2"
              style={{ background: "rgba(0,212,255,0.15)" }}
            >
              <motion.div
                className="h-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #00d4ff, #b400ff)",
                  boxShadow: "0 0 12px rgba(0,212,255,0.8)",
                }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(0,212,255,0.5)", fontSize: "0.65rem", letterSpacing: "0.2em" }}
              >
                CONNECTING TO SERVERS
              </span>
              <span
                style={{ fontFamily: "'Orbitron', monospace", color: "#00d4ff", fontSize: "0.85rem", fontWeight: 700, textShadow: "0 0 10px rgba(0,212,255,0.8)" }}
              >
                {Math.floor(progress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
