import React, { useState, useRef } from 'react';

const aboutStyles = `
  .about-bg {
    background-color: #020204;
  }

  .principle-card {
    position: relative;
    background: linear-gradient(145deg, rgba(15, 15, 20, 0.95), rgba(10, 10, 15, 0.98));
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.4s ease;
    overflow: hidden;
  }

  .principle-card:hover {
    border-color: var(--accent-color);
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  }

  @media (min-width: 768px) {
    .principle-card:hover {
      box-shadow: 0 30px 60px -10px var(--accent-glow);
    }
  }

  .principle-card::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: var(--accent-color);
    filter: blur(20px);
    opacity: 0;
    transition: opacity 0.4s;
    z-index: -1;
  }

  .principle-card:hover::before {
    opacity: 0.3;
  }

  .corner-bracket {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid var(--accent-color);
    opacity: 0.2;
    transition: all 0.3s;
  }

  .principle-card:hover .corner-bracket {
    opacity: 1;
    width: 20px;
    height: 20px;
  }

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .connection-text {
    background: linear-gradient(
      135deg,
      #22d3ee 0%,
      #06b6d4 15%,
      #a78bfa 35%,
      #f02aa2 50%,
      #ec4899 65%,
      #d946ef 80%,
      #22d3ee 100%
    );
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 0.02em;
  }

  @media (min-width: 768px) {
    .connection-text {
      animation: gradient-shift 3s ease infinite;
      filter: drop-shadow(0 0 20px rgba(34, 211, 238, 0.6));
    }
  }

  @keyframes grid-drift {
    from { background-position: 0 0; }
    to { background-position: 60px 60px; }
  }

  .chaos-grid {
    background-image:
      linear-gradient(rgba(217,70,239,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  @media (min-width: 768px) {
    .chaos-grid {
      animation: grid-drift 3s linear infinite;
      opacity: 0.4;
    }
  }
`;

const PrincipleCard = ({ p, i }) => {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="principle-card p-6 md:p-8 h-full flex flex-col justify-between rounded-lg"
      style={{
        '--accent-color': p.color,
        '--accent-glow': p.glow
      }}
    >
      <div className="corner-bracket top-0 left-0 border-r-0 border-b-0" />
      <div className="corner-bracket top-0 right-0 border-l-0 border-b-0" />
      <div className="corner-bracket bottom-0 left-0 border-r-0 border-t-0" />
      <div className="corner-bracket bottom-0 right-0 border-l-0 border-t-0" />

      <div className="relative z-20">
        <div className="flex justify-between items-start mb-8 md:mb-12">
          <div className="px-3 py-1 border" style={{ borderColor: `${p.color}40`, backgroundColor: `${p.color}05` }}>
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
              style={{ color: p.color }}
            >
              {p.code}
            </span>
          </div>
          <span className="text-3xl md:text-5xl font-black font-orbitron text-white/5 italic">
            0{i + 1}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-orbitron mb-3 md:mb-4 uppercase italic text-white">
          {p.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed font-mono">{p.desc}</p>
      </div>
    </div>
  );
};

const About = () => {
  const principles = [
    {
      title: "Clarity over complexity",
      desc: "Modular architecture designed for high-concurrency scaling.",
      code: "SYS_CLN",
      color: "#22d3ee",
      glow: "rgba(34, 211, 238, 0.4)"
    },
    {
      title: "Design with intent",
      desc: "Every pixel has a purpose. Precision-engineered UI.",
      code: "UX_INTENT",
      color: "#f02aa2",
      glow: "rgba(240, 42, 162, 0.4)"
    },
    {
      title: "Code that lasts",
      desc: "Future-proof, maintainable, and optimized codebases.",
      code: "DEV_CORE",
      color: "#a3e635",
      glow: "rgba(163, 230, 53, 0.4)"
    },
    {
      title: "Outcome-driven",
      desc: "Business metrics drive every deployment decision.",
      code: "ROI_SYNC",
      color: "#fbbf24",
      glow: "rgba(251, 191, 36, 0.4)"
    }
  ];

  return (
    <div className="about-bg relative min-h-screen w-full text-white overflow-hidden selection:bg-white selection:text-black">
      <style>{aboutStyles}</style>

      <div className="absolute inset-0 chaos-grid pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
        <section className="mb-24 md:mb-40">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-6 md:space-y-10">
              <div className="inline-flex items-center gap-3 md:gap-4 px-4 md:px-5 py-2 border border-cyan-500/40 bg-cyan-500/5 text-cyan-400 text-[10px] md:text-[11px] font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase font-mono">
                <span className="w-2 h-2 bg-cyan-400 animate-ping" />
                CORE ENGINE
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-orbitron tracking-tighter leading-[0.9]">
                ABOUT
                <br />
                <span className="inline-block italic uppercase connection-text">US</span>
              </h1>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-6 md:p-10 border border-white/10 rounded-lg backdrop-blur-sm">
              <div className="space-y-4 md:space-y-6 text-gray-400 font-mono text-sm leading-relaxed">
                <p>
                  <span className="text-white font-bold tracking-wider">Script & Style</span> is a
                  digital-first startup focused on building smart, scalable, and visually compelling web
                  solutions. We believe great products are born at the intersection of clean code (
                  <span className="text-cyan-400">Script</span>) and meaningful design (
                  <span className="text-fuchsia-500">Style</span>).
                </p>
                <p>
                  We don't just develop websites or applications—we{' '}
                  <span className="text-white">engineer digital experiences</span> that solve real business
                  problems. From idea to execution, our approach is simple:{' '}
                  <span className="text-cyan-400">build fast</span>,{' '}
                  <span className="text-lime-400">build right</span>, and{' '}
                  <span className="text-amber-400">build with purpose</span>.
                </p>
                <p className="border-l-2 border-cyan-500/40 pl-4 italic bg-cyan-500/5 py-3 pr-3 rounded-r">
                  Founded by an <span className="text-white">engineering-driven team</span> with strong
                  full-stack expertise, Script & Style blends modern technologies, performance-focused
                  architecture, and user-centric design to deliver solutions that are{' '}
                  <span className="text-green-400">reliable</span>,{' '}
                  <span className="text-blue-400">secure</span>, and{' '}
                  <span className="text-purple-400">future-ready</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-12 md:mb-20">
            <h2 className="text-xs md:text-sm font-mono text-cyan-500 tracking-[0.5em] md:tracking-[0.8em] uppercase flex-shrink-0">
              ARCHITECTURAL PILLARS
            </h2>
            <div className="h-px w-full bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            {principles.map((p, i) => (
              <PrincipleCard key={i} p={p} i={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
