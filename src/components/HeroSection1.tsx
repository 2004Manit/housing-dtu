import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const cards = [
  { img: "/images/ban.jpeg", title: "Baneeta PG", sub: "2025" },
  { img: "/images/gov.webp", title: "Govindam PG", sub: "2025" },
  { img: "/images/whi.jpeg", title: "White House PG", sub: "2025" },
  { img: "/images/ysg.png", title: "YS Girls PG", sub: "2025" },
  { img: "/images/aas.jpeg", title: "Aashirvaad PG", sub: "2025" },
  { img: "/images/ys.jpeg", title: "YS PG", sub: "2025" },
  { img: "/images/prem.jpeg", title: "Prem Arya PG", sub: "2025" },
  { img: "/images/vib.webp", title: "Vibzy Space PG", sub: "2025" },
  { img: "/images/sun.jpeg", title: "Sunrise PG", sub: "2025" },
  { img: "/images/sat.jpeg", title: "Satpal PG", sub: "2025" },
  { img: "/images/hos.png", title: "The Host PG", sub: "2025" },
  { img: "/images/dev.jpeg", title: "Devta Homes PG", sub: "2025" },
];

const heights = ["200px", "240px", "280px"];

const CardItem = ({ card, heightIndex }: { card: typeof cards[0]; heightIndex: number }) => (
  <div style={{
    width: "170px",
    flexShrink: 0,
    borderRadius: "18px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.07)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    position: "relative",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
  }}>
    <div style={{
      width: "100%",
      height: heights[heightIndex],
      overflow: "hidden",
    }}>
      <img
        src={card.img}
        alt={card.title}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
    <div style={{
      position: "absolute", top: "10px", right: "10px",
      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)",
      fontSize: "9px", fontWeight: 500, padding: "3px 9px",
      borderRadius: "100px", letterSpacing: "0.8px", textTransform: "uppercase" as const,
    }}>{card.sub}</div>
    <div style={{ padding: "12px 14px", background: "rgba(14,14,22,0.9)", backdropFilter: "blur(10px)" }}>
      <div style={{ fontSize: "12px", fontWeight: 500, color: "#f0ede8" }}>{card.title}</div>
      <div style={{ fontSize: "10px", color: "#5a576a", marginTop: "2px" }}>{card.sub}</div>
    </div>
  </div>
);

const Column = ({ cards, duration, delay }: { cards: typeof import("./HeroSection")["default"] extends any ? any[] : any[]; duration: string; delay: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px", flexShrink: 0, width: "170px" }}>
    <div style={{
      display: "flex", flexDirection: "column", gap: "16px",
      animation: `heroScrollUp ${duration} linear ${delay} infinite`,
    }}>
      {cards.map((card, i) => <CardItem key={i} card={card} heightIndex={i % 3} />)}
      {cards.map((card, i) => <CardItem key={`d${i}`} card={card} heightIndex={i % 3} />)}
    </div>
  </div>
);

const brands = [
  { name: "Sentry", bg: "#362D59", color: "#E1567C" },
  { name: "Supabase", bg: "#1C1C1C", color: "#3ECF8E" },
  { name: "Cloudflare", bg: "#F6821F", color: "white" },
  { name: "Antigravity", bg: "#0A0A0A", color: "white" },
  { name: "Claude", bg: "#CC785C", color: "white" },
  { name: "Vercel", bg: "#000", color: "white" },
  { name: "Figma", bg: "#1E1E1E", color: "white" },
  { name: "Canva", bg: "#7D2AE8", color: "white" },
];

export default function HeroSection() {
  const col1 = cards.slice(0, 3);
  const col2 = cards.slice(3, 6);
  const col3 = cards.slice(6, 9);
  const col4 = cards.slice(9, 12);

  return (
    <>
      <style>{`
        @keyframes heroScrollUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-section-root {
          height: 100vh;
          display: grid;
          grid-template-columns: 58% 42%;
          align-items: center;
          background: #0d1f26;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }
                .hero-section-root::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
  z-index: 0;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
}
        .hero-left-panel {
          padding: 0 48px 0 52px;
          animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both;
          position: relative;
  z-index: 1;
        }
        .hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(44px, 5vw, 72px);
          font-weight: 900;
          line-height: 1.06;
          letter-spacing: -2px;
          margin-bottom: 22px;
          color: #f0ede8;
          animation: heroFadeUp 0.9s 0.14s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-h1 em {
          font-style: italic;
          color: #07BA8D;
          display: block;
        }
        .hero-desc {
          font-size: 16px;
          line-height: 1.75;
          color: #5a576a;
          max-width: 420px;
          margin-bottom: 40px;
          font-weight: 300;
          animation: heroFadeUp 0.9s 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 18px;
          animation: heroFadeUp 0.9s 0.26s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-btn-primary {
          background: #e8ff47;
          color: #080810;
          border: none;
          padding: 15px 34px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
        }
        .hero-btn-primary:hover {
          transform: scale(1.06) translateY(-2px);
          box-shadow: 0 10px 40px rgba(232,255,71,0.22);
        }
        .hero-btn-outline {
          background: transparent;
          color: #f0ede8;
          border: 1px solid rgba(255,255,255,0.25);
          padding: 15px 34px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, background 0.3s;
        }
        .hero-btn-outline:hover {
          transform: scale(1.06) translateY(-2px);
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.05);
        }
        .hero-marquee-wrap {
          margin-top: 52px;
          padding-top: 36px;
          border-top: 1px solid rgba(255,255,255,0.07);
          overflow: hidden;
          position: relative;
          animation: heroFadeUp 0.9s 0.32s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-marquee-wrap::before,
        .hero-marquee-wrap::after {
          content: '';
          position: absolute;
          top: 36px; bottom: 0;
          width: 60px; z-index: 2;
          pointer-events: none;
        }
        .hero-marquee-wrap::before {
          left: 0;
          background: linear-gradient(to right, #0d1f26, transparent);
        }
        .hero-marquee-wrap::after {
          right: 0;
          background: linear-gradient(to left, #0d1f26, transparent);
        }
        .hero-marquee-label {
          font-size: 11px;
          color: #5a576a;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .hero-marquee-track {
          display: flex;
          width: max-content;
          animation: heroMarquee 22s linear infinite;
        }
        .hero-marquee-track:hover { animation-play-state: paused; }
        .hero-brand-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-right: 36px;
          color: #5a576a;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          transition: color 0.2s;
          flex-shrink: 0;
          cursor: pointer;
        }
        .hero-brand-item:hover { color: #f0ede8; }
        .hero-brand-icon {
          width: 22px; height: 22px;
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; opacity: 0.7;
        }
        .hero-brand-dot {
          width: 1px; height: 16px;
          background: rgba(255,255,255,0.07);
          margin-right: 0; flex-shrink: 0;
        }
        .hero-right-panel {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }
        .hero-right-panel::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0; width: 100px;
          background: linear-gradient(to right, #0d1f26, transparent);
          z-index: 20; pointer-events: none;
        }
        .hero-right-panel::after {
          content: '';
          position: absolute; left: 0; right: 0; top: 0; height: 180px;
          background: linear-gradient(to bottom, #0d1f26, transparent);
          z-index: 20; pointer-events: none;
        }
        .hero-fade-bottom {
          position: absolute; left: 0; right: 0; bottom: 0; height: 180px;
          background: linear-gradient(to top, #0d1f26, transparent);
          z-index: 20; pointer-events: none;
        }
        .hero-columns-wrap {
          position: absolute;
          inset: -60px -60px -60px -20px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          transform: rotate(-8deg);
          transform-origin: center center;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .hero-section-root {
            grid-template-columns: 1fr;
            height: auto;
            min-height: 100svh;
            align-items: center;
            justify-items: center;
            overflow-y: auto;
            overflow-x: hidden;
          }
          .hero-right-panel { display: none; }
          .hero-left-panel {
            width: 100%;
            max-width: 600px;
            padding: 80px 32px 64px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-h1 { font-size: clamp(38px, 8vw, 58px); letter-spacing: -1.5px; }
          .hero-desc { max-width: 100%; font-size: 15px; }
          .hero-cta-group { flex-wrap: wrap; justify-content: center; gap: 14px; }
          .hero-marquee-wrap { width: 100%; margin-top: 40px; padding-top: 28px; }
          .hero-marquee-label { text-align: center; }
        }
        @media (max-width: 480px) {
  .hero-section-root {
    overflow-x: hidden;
    width: 100%;
  }
  .hero-left-panel {
    padding: 56px 20px 48px;
    width: 100%;
    box-sizing: border-box;
    max-width: 100vw;
  }
  .hero-h1 {
    font-size: clamp(28px, 9vw, 40px);
    letter-spacing: -1px;
    word-break: break-word;
  }
  .hero-desc {
    font-size: 13px;
    line-height: 1.65;
  }
  .hero-btn-primary, .hero-btn-outline {
    padding: 13px 24px;
    font-size: 14px;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
  }
  .hero-cta-group {
    flex-direction: column;
    width: 100%;
  }
  .hero-marquee-wrap {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }
}
      `}</style>

      <section className="hero-section-root">
        {/* LEFT */}
        <div className="hero-left-panel">
          <h1 className="hero-h1">
            Student housing
            <em>made easy by</em>
            housing DTU.
          </h1>
          <p className="hero-desc">
            Need a Pg, a flat or a Flatmate? We've got you covered with our verified listings and seamless experience.
          </p>
          <div className="hero-cta-group">
            <Link to="/properties" className="hero-btn-primary" style={{ textDecoration: 'none' }}>Browse Properties →</Link>
            <Link to="/about" className="hero-btn-outline" style={{ textDecoration: 'none' }}>Learn more</Link>
          </div>

          {/* Marquee */}
          <div className="hero-marquee-wrap">
            <div className="hero-marquee-label">Tools we use</div>
            <div className="hero-marquee-track">
              {[...brands, ...brands].map((b, i) => (
                <>
                  <span key={`brand-${i}`} className="hero-brand-item">
                    <span className="hero-brand-icon" style={{ background: b.bg }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5" stroke={b.color} strokeWidth="1.5" fill="none" />
                        <circle cx="7" cy="7" r="2" fill={b.color} />
                      </svg>
                    </span>
                    {b.name}
                  </span>
                  <span key={`dot-${i}`} className="hero-brand-dot" />
                </>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right-panel">
          <div className="hero-fade-bottom" />
          <div className="hero-columns-wrap">
            <Column cards={col1} duration="22s" delay="0s" />
            <Column cards={col2} duration="28s" delay="-8s" />
            <Column cards={col3} duration="20s" delay="-14s" />
            <Column cards={col4} duration="26s" delay="-5s" />
          </div>
        </div>
      </section>
    </>
  );
}