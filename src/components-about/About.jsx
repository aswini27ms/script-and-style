import React, { useState, useRef } from 'react';

// --- ULTIMATE IMPROVISED STYLES ---
const aboutStyles = `
  .about-bg { background-color: #020204; cursor: crosshair; }

  /* Global Ambient Glow */
  .glow-ring {
    position: fixed; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
    opacity: 0.08; filter: blur(80px); z-index: 0; pointer-events: none;
    transition: background 1s ease;
  }

  /* High-Intensity Circuitry */
  .circuit-path {
    fill: none; stroke: var(--accent); stroke-width: 1.5;
    stroke-dasharray: 1000; stroke-dashoffset: 1000;
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    opacity: 0.1;
  }
  .holo-card:hover .circuit-path {
    stroke-dashoffset: 0; opacity: 1; stroke: #fff;
    filter: drop-shadow(0 0 8px var(--accent));
  }

  /* Data Flow */
  .data-packet {
    fill: #fff; offset-path: var(--path);
    animation: flow 2.5s infinite linear;
    filter: drop-shadow(0 0 10px var(--accent));
    visibility: hidden;
  }
  .holo-card:hover .data-packet { visibility: visible; }

  @keyframes flow {
    0% { offset-distance: 0%; opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { offset-distance: 100%; opacity: 0; }
  }

  /* Physical Mass & Bloom Effect */
  .holo-card-container { perspective: 1200px; }
  .holo-card {
    position: relative; background: rgba(10, 10, 15, 0.9);
    backdrop-filter: blur(40px); border: 1px solid rgba(255, 255, 255, 0.05);
    transform-style: preserve-3d; transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .holo-card::before {
    content: ''; position: absolute; inset: -2px;
    background: var(--accent); filter: blur(25px);
    opacity: 0; transition: opacity 0.5s ease; z-index: -1;
  }
  .holo-card:hover::before { opacity: 0.4; }
  .holo-card:hover {
    background: rgba(15, 15, 25, 0.95);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-10px) scale(1.02);
  }

  /* Theme Definitions */
  .cyan-theme { --accent: #22d3ee; }
  .pink-theme { --accent: #f02aa2; }
  .lime-theme { --accent: #a3e635; }
  .gold-theme { --accent: #fbbf24; }

  /* Brackets */
  .bracket {
    position: absolute; width: 14px; height: 14px;
    border: 2px solid var(--accent); opacity: 0.1;
    transition: all 0.4s ease;
  }
  .holo-card:hover .bracket { 
    opacity: 1; width: 32px; height: 32px; 
    border-color: #fff; filter: drop-shadow(0 0 5px var(--accent));
  }

  /* --- ULTIMATE DESCRIPTION BOX IMPROVISATION --- */
  .description-box {
    position: relative;
    background: linear-gradient(135deg, #050507 0%, #0a0a0f 100%);
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  /* Animated Border Gradient */
  .description-box::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, #22d3ee, #d946ef, #22d3ee, #d946ef);
    background-size: 300% 300%;
    border-radius: 8px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.6s;
    animation: gradient-shift 4s ease infinite;
  }

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .description-box:hover::before {
    opacity: 0.6;
  }

  /* Neural Border Pulse */
  .description-box::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid transparent;
    background: linear-gradient(90deg, #22d3ee, #fff, #f02aa2) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    opacity: 0.15;
    transition: opacity 0.5s;
    border-radius: 8px;
  }

  /* Multiple Moving Sparks */
  .spark {
    position: absolute;
    width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, #22d3ee, #fff, #22d3ee, transparent);
    z-index: 20;
    transition: all 0.8s cubic-bezier(0.65, 0, 0.35, 1);
    box-shadow: 0 0 10px rgba(34, 211, 238, 0.8);
  }

  .spark-top {
    top: 0; left: -100%;
  }

  .spark-bottom {
    bottom: 0; right: -100%;
    background: linear-gradient(90deg, transparent, #d946ef, #fff, #d946ef, transparent);
    box-shadow: 0 0 10px rgba(217, 70, 239, 0.8);
  }

  .spark-vertical-left {
    width: 2px; height: 100%;
    left: 0; top: -100%;
    background: linear-gradient(180deg, transparent, #a3e635, #fff, #a3e635, transparent);
    box-shadow: 0 0 10px rgba(163, 230, 53, 0.8);
  }

  .spark-vertical-right {
    width: 2px; height: 100%;
    right: 0; bottom: -100%;
    background: linear-gradient(180deg, transparent, #fbbf24, #fff, #fbbf24, transparent);
    box-shadow: 0 0 10px rgba(251, 191, 36, 0.8);
  }

  .description-box:hover .spark-top {
    left: 100%;
  }

  .description-box:hover .spark-bottom {
    right: 100%;
  }

  .description-box:hover .spark-vertical-left {
    top: 100%;
  }

  .description-box:hover .spark-vertical-right {
    bottom: 100%;
  }

  .description-box:hover {
    transform: perspective(1000px) rotateY(-2deg) rotateX(1deg) scale(1.02);
    box-shadow: 
      -15px 15px 60px -10px rgba(34, 211, 238, 0.3),
      15px -15px 60px -10px rgba(217, 70, 239, 0.3),
      0 0 40px rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .description-box:hover::after {
    opacity: 0.8;
  }

  .description-inner {
    position: relative;
    z-index: 10;
    background: radial-gradient(circle at top left, rgba(34, 211, 238, 0.05), transparent 60%);
    padding: 3rem;
    transition: all 0.5s ease;
  }

  .description-box:hover .description-inner {
    background: 
      radial-gradient(circle at top left, rgba(34, 211, 238, 0.12), transparent 50%),
      radial-gradient(circle at bottom right, rgba(217, 70, 239, 0.08), transparent 50%);
  }

  /* Floating Particles Inside Box */
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #22d3ee;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.5s;
    box-shadow: 0 0 10px currentColor;
  }

  .description-box:hover .particle {
    opacity: 0.6;
    animation: particle-float 3s ease-in-out infinite;
  }

  @keyframes particle-float {
    0%, 100% { transform: translate(0, 0); }
    33% { transform: translate(10px, -15px); }
    66% { transform: translate(-5px, -8px); }
  }

  .description-box p {
    transition: transform 0.4s ease, opacity 0.4s ease, color 0.4s ease;
  }

  .description-box:hover p {
    transform: translateX(4px);
    color: #f1f5f9;
  }

  /* Scan Line Effect */
  .scan-line {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.5), transparent);
    top: -100%;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .description-box:hover .scan-line {
    opacity: 1;
    animation: scan 2s linear infinite;
  }

  @keyframes scan {
    0% { top: -10%; }
    100% { top: 110%; }
  }

  /* Corner Brackets for Description Box */
  .corner-bracket {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(34, 211, 238, 0.3);
    transition: all 0.5s ease;
    z-index: 15;
  }

  .corner-bracket.tl { top: 10px; left: 10px; border-right: none; border-bottom: none; }
  .corner-bracket.tr { top: 10px; right: 10px; border-left: none; border-bottom: none; }
  .corner-bracket.bl { bottom: 10px; left: 10px; border-right: none; border-top: none; }
  .corner-bracket.br { bottom: 10px; right: 10px; border-left: none; border-top: none; }

  .description-box:hover .corner-bracket {
    border-color: #fff;
    width: 30px;
    height: 30px;
    filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.8));
  }

  .description-box:hover .corner-bracket.tl { top: 5px; left: 5px; }
  .description-box:hover .corner-bracket.tr { top: 5px; right: 5px; }
  .description-box:hover .corner-bracket.bl { bottom: 5px; left: 5px; }
  .description-box:hover .corner-bracket.br { bottom: 5px; right: 5px; }

  /* Glitch Effect on Keywords */
  .keyword {
    position: relative;
    display: inline-block;
    transition: all 0.3s;
  }

  .description-box:hover .keyword {
    animation: glitch-text 0.3s infinite;
  }

  @keyframes glitch-text {
    0%, 100% { transform: translate(0); }
    25% { transform: translate(-1px, 1px); }
    50% { transform: translate(1px, -1px); }
    75% { transform: translate(-1px, -1px); }
  }

  /* Grid Pattern Overlay */
  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0;
    transition: opacity 0.5s;
    pointer-events: none;
  }

  .description-box:hover .grid-overlay {
    opacity: 1;
    animation: grid-shift 10s linear infinite;
  }

  @keyframes grid-shift {
    0% { background-position: 0 0; }
    100% { background-position: 20px 20px; }
  }

  @keyframes glitch-skew {
    0%, 100% { transform: skew(0deg); }
    33% { transform: skew(3deg) translateX(-2px); }
    66% { transform: skew(-3deg) translateX(2px); }
  }

  /* Background Grid Drift - Moving Grid Effect */
  @keyframes grid-drift {
    from { background-position: 0 0; }
    to { background-position: 60px 60px; }
  }

  .chaos-grid {
    background-image: 
      linear-gradient(rgba(217,70,239,0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: grid-drift 3s linear infinite;
  }

  /* Status Bar */
  .status-bar {
    display: flex;
    gap: 8px;
    align-items: center;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.5s ease;
  }

  .description-box:hover .status-bar {
    opacity: 1;
    transform: translateY(0);
  }

  .status-indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    animation: pulse-status 2s infinite;
  }

  @keyframes pulse-status {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.3); }
  }

  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
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
    animation: gradient-shift 3s ease infinite;
    filter: drop-shadow(0 0 20px rgba(34, 211, 238, 0.6)) drop-shadow(0 0 40px rgba(217, 70, 239, 0.4));
    text-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
    letter-spacing: 0.02em;
  }
`;

const CircuitSystem = () => {
  const path1 = "M 0 60 L 50 60 L 70 30 L 140 30";
  const path2 = "M 340 340 L 290 340 L 270 380 L 200 380";
  return (
    <svg className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] pointer-events-none z-10" viewBox="0 0 340 440">
      <path className="circuit-path" d={path1} />
      <path className="circuit-path" d={path2} />
      <circle r="3" className="data-packet" style={{ '--path': `path('${path1}')` }} />
      <circle r="3" className="data-packet" style={{ '--path': `path('${path2}')`, animationDelay: '1.2s' }} />
    </svg>
  );
};

const PrincipleCard = ({ p, i }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: y * 15, y: -x * 15 });
  };

  return (
    <div className="holo-card-container" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={() => setRotation({ x: 0, y: 0 })}>
      <div className={`holo-card ${p.theme} p-8 h-full flex flex-col justify-between group rounded-sm`} 
           style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}>
        <CircuitSystem />
        <div className="bracket top-0 left-0 border-r-0 border-b-0" />
        <div className="bracket top-0 right-0 border-l-0 border-b-0" />
        <div className="bracket bottom-0 left-0 border-r-0 border-t-0" />
        <div className="bracket bottom-0 right-0 border-l-0 border-t-0" />
        <div className="relative z-20">
          <div className="flex justify-between items-start mb-12">
            <div className="px-3 py-1 border border-[var(--accent)]/40 bg-[var(--accent)]/5 group-hover:border-white transition-all">
              <span className="text-[10px] font-mono text-[var(--accent)] group-hover:text-white font-bold uppercase tracking-[0.2em]">{p.code}</span>
            </div>
            <span className="text-5xl font-black font-orbitron text-white/5 group-hover:text-white/20 transition-all italic">0{i+1}</span>
          </div>
          <h3 className="text-2xl font-bold font-orbitron mb-4 group-hover:text-white transition-colors uppercase italic">{p.title}</h3>
          <p className="text-gray-400 group-hover:text-gray-200 text-sm leading-relaxed font-mono transition-colors">{p.desc}</p>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const principles = [
    { title: "Clarity over complexity", desc: "Modular architecture designed for high-concurrency scaling.", code: "SYS_CLN", theme: "cyan-theme" },
    { title: "Design with intent", desc: "Every pixel has a purpose. Precision-engineered UI.", code: "UX_INTENT", theme: "pink-theme" },
    { title: "Code that lasts", desc: "Future-proof, maintainable, and optimized codebases.", code: "DEV_CORE", theme: "lime-theme" },
    { title: "Outcome-driven", desc: "Business metrics drive every deployment decision.", code: "ROI_SYNC", theme: "gold-theme" }
  ];

  return (
    <div className="about-bg relative min-h-screen w-full text-white overflow-hidden selection:bg-white selection:text-black font-sans">
      <style>{aboutStyles}</style>

      {/* Moving Grid Pattern */}
      <div className="absolute inset-0 chaos-grid opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        
        {/* --- HERO --- */}
        <section className="mb-48">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-4 px-5 py-2 border border-cyan-500/40 bg-cyan-500/5 text-cyan-400 text-[11px] font-bold tracking-[0.5em] uppercase font-mono">
                <span className="w-2 h-2 bg-cyan-400 animate-ping"></span>
                CORE_ENGINE // UPLINK_STABLE
              </div>
              <h1 className="text-8xl md:text-9xl font-black font-orbitron tracking-tighter leading-[0.8] cursor-default">
                ABOUT <br />
                <span className="inline-block pr-8 italic uppercase connection-text">
                  US
                </span>
              </h1>
            </div>

            {/* SUPER ENHANCED DESCRIPTION BOX */}
            <div className="description-box">
               {/* Multiple Directional Sparks */}
               <div className="spark spark-top" />
               <div className="spark spark-bottom" />
               <div className="spark spark-vertical-left" />
               <div className="spark spark-vertical-right" />
               
               {/* Scan Line */}
               <div className="scan-line" />
               
               {/* Grid Overlay */}
               <div className="grid-overlay" />
               
               {/* Corner Brackets */}
               <div className="corner-bracket tl" />
               <div className="corner-bracket tr" />
               <div className="corner-bracket bl" />
               <div className="corner-bracket br" />
               
               {/* Floating Particles */}
               <div className="particle" style={{ top: '20%', left: '15%', animationDelay: '0s' }} />
               <div className="particle" style={{ top: '60%', right: '20%', backgroundColor: '#d946ef', animationDelay: '1s' }} />
               <div className="particle" style={{ bottom: '30%', left: '70%', backgroundColor: '#a3e635', animationDelay: '2s' }} />
               <div className="particle" style={{ top: '45%', left: '40%', backgroundColor: '#fbbf24', animationDelay: '1.5s' }} />
               
               <div className="description-inner">
                 {/* Status Bar */}
                 <div className="status-bar mb-6 font-mono text-[9px] text-cyan-400/60">
                   <div className="status-indicator bg-green-400" />
                   <span>SYSTEM_OPERATIONAL</span>
                   <div className="status-indicator bg-cyan-400" style={{ animationDelay: '0.3s' }} />
                   <span>DATA_STREAM_ACTIVE</span>
                   <div className="status-indicator bg-fuchsia-500" style={{ animationDelay: '0.6s' }} />
                   <span>NEURAL_LINK_ESTABLISHED</span>
                 </div>

                 <div className="space-y-6 text-gray-400 font-mono text-sm leading-relaxed">
                    <p>
                      <span className="keyword text-white font-bold tracking-wider">Script & Style</span> is a digital-first startup focused on building smart, scalable, and visually compelling web solutions. We believe great products are born at the intersection of clean code (<span className="keyword text-cyan-400">Script</span>) and meaningful design (<span className="keyword text-fuchsia-500">Style</span>).
                    </p>
                    <p>
                      We don't just develop websites or applications—we <span className="keyword text-white">engineer digital experiences</span> that solve real business problems. From idea to execution, our approach is simple: <span className="text-cyan-400">build fast</span>, <span className="text-lime-400">build right</span>, and <span className="text-amber-400">build with purpose</span>.
                    </p>
                    <p className="border-l-2 border-cyan-500/40 pl-4 italic bg-cyan-500/5 py-3 pr-3 rounded-r">
                      Founded by an <span className="keyword text-white">engineering-driven team</span> with strong full-stack expertise, Script & Style blends modern technologies, performance-focused architecture, and user-centric design to deliver solutions that are <span className="text-green-400">reliable</span>, <span className="text-blue-400">secure</span>, and <span className="text-purple-400">future-ready</span>.
                    </p>
                 </div>

                 {/* Bottom Metrics */}
                 <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-gray-500">
                   <div className="flex gap-4">
                     <span className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-cyan-400 animate-pulse" />
                       LATENCY: 12ms
                     </span>
                     <span className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-green-400 animate-pulse" />
                       UPTIME: 99.9%
                     </span>
                   </div>
                   <span className="text-cyan-400/40">v2.0.1_stable</span>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* --- GRID --- */}
        <section className="mb-48">
          <div className="flex items-center gap-8 mb-20">
            <h2 className="text-sm font-mono text-cyan-500 tracking-[0.8em] uppercase flex-shrink-0">// ARCHITECTURAL_PILLARS</h2>
            <div className="h-px w-full bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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