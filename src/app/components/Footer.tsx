export function Footer() {
  return (
    <footer
      className="py-12 px-6"
      style={{ background: "#020205", borderTop: "1px solid rgba(0,212,255,0.08)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div
            className="text-xl font-black tracking-widest mb-1"
            style={{ fontFamily: "'Orbitron', monospace", color: "#00d4ff", textShadow: "0 0 15px rgba(0,212,255,0.5)" }}
          >
            NEON STRIKE: REBIRTH
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: "rgba(232,234,240,0.3)", letterSpacing: "0.2em" }}>
            © 2025 GHOST PROTOCOL STUDIOS. ALL RIGHTS RESERVED.
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {["PRIVACY POLICY", "TERMS OF SERVICE", "SUPPORT", "PRESS KIT", "CAREERS"].map((link) => (
            <button
              key={link}
              className="transition-colors hover:text-white"
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "rgba(232,234,240,0.35)", letterSpacing: "0.15em" }}
            >
              {link}
            </button>
          ))}
        </div>
        <div
          className="flex items-center gap-2"
          style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: "rgba(232,234,240,0.25)", letterSpacing: "0.1em" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          ALL SYSTEMS NOMINAL
        </div>
      </div>
    </footer>
  );
}
