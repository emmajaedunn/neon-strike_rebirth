import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = ["STORY", "CHARACTERS", "WEAPONS", "ESPORTS", "COMMUNITY"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5,5,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,212,255,0.1)" : "none",
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="text-xl font-black tracking-widest cursor-pointer"
          style={{
            fontFamily: "'Orbitron', monospace",
            color: "#00d4ff",
            textShadow: "0 0 20px rgba(0,212,255,0.8)",
          }}
        >
          NSR
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className="relative group text-xs tracking-widest transition-colors duration-200"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "rgba(232,234,240,0.6)", fontWeight: 600 }}
            >
              <span className="group-hover:text-white transition-colors duration-200">{link}</span>
              <span
                className="absolute -bottom-1 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300"
                style={{ background: "#00d4ff", boxShadow: "0 0 8px #00d4ff" }}
              />
            </button>
          ))}
        </div>

        <button
          className="hidden md:block px-5 py-2 text-xs font-bold tracking-widest transition-all duration-200 hover:scale-105"
          style={{
            fontFamily: "'Orbitron', monospace",
            background: "linear-gradient(135deg, #00d4ff, #b400ff)",
            color: "#050508",
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}
        >
          PRE-ORDER
        </button>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: "rgba(5,5,8,0.98)" }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className="text-left text-sm tracking-widest py-2"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "rgba(232,234,240,0.7)", fontWeight: 600, borderBottom: "1px solid rgba(0,212,255,0.1)" }}
              onClick={() => setMobileOpen(false)}
            >
              {link}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
