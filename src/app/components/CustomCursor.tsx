import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setHovering(
        !!(
          target.closest("button") ||
          target.closest("a") ||
          target.closest("[data-hoverable]")
        )
      );
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  useEffect(() => {
    let raf: number;
    const animate = () => {
      setTrail((t) => ({
        x: t.x + (pos.x - t.x) * 0.12,
        y: t.y + (pos.y - t.y) * 0.12,
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  return (
    <>
      {/* Crosshair dot */}
      <motion.div
        className="fixed pointer-events-none z-[10000]"
        style={{
          left: pos.x,
          top: pos.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          style={{
            width: clicking ? 6 : 8,
            height: clicking ? 6 : 8,
            borderRadius: "50%",
            background: hovering ? "#b400ff" : "#00d4ff",
            boxShadow: hovering ? "0 0 12px #b400ff" : "0 0 12px #00d4ff",
            transition: "width 0.1s, height 0.1s, background 0.2s, box-shadow 0.2s",
          }}
        />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: trail.x,
          top: trail.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          style={{
            width: hovering ? 48 : clicking ? 28 : 36,
            height: hovering ? 48 : clicking ? 28 : 36,
            borderRadius: "50%",
            border: `1px solid ${hovering ? "rgba(180,0,255,0.6)" : "rgba(0,212,255,0.4)"}`,
            boxShadow: hovering ? "0 0 20px rgba(180,0,255,0.2)" : "0 0 20px rgba(0,212,255,0.1)",
            transition: "width 0.2s, height 0.2s, border-color 0.2s",
          }}
        />
      </motion.div>
    </>
  );
}
