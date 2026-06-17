import { useState, useCallback, useRef } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { CharacterReveal } from "./components/CharacterReveal";
import { WeaponArsenal } from "./components/WeaponArsenal";
import { GameplayFeatures } from "./components/GameplayFeatures";
import { BattleZones } from "./components/BattleZones";
import { EsportsSection } from "./components/EsportsSection";
import { TrailerSection } from "./components/TrailerSection";
import { CommunitySection } from "./components/CommunitySection";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const trailerRef = useRef<HTMLElement | null>(null);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  const scrollToTrailer = useCallback(() => {
    const el = document.getElementById("trailer");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#050508",
        cursor: "none",
        fontFamily: "'Exo 2', sans-serif",
      }}
    >
      {/* Custom cursor — hidden on touch devices */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Loading screen */}
      <LoadingScreen onComplete={handleLoadComplete} />

      {/* Main content — shown after loading */}
      {loaded && (
        <>
          <Navbar />

          <main>
            <section id="hero">
              <HeroSection onWatchTrailer={scrollToTrailer} />
            </section>

            <section id="characters">
              <CharacterReveal />
            </section>

            <section id="weapons">
              <WeaponArsenal />
            </section>

            <section id="gameplay">
              <GameplayFeatures />
            </section>

            <section id="battlezones">
              <BattleZones />
            </section>

            <section id="esports">
              <EsportsSection />
            </section>

            <section id="trailer" ref={trailerRef}>
              <TrailerSection />
            </section>

            <section id="community">
              <CommunitySection />
            </section>

            <section id="cta">
              <FinalCTA />
            </section>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}
