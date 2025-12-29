import React, { useEffect, useState } from "react";

/* ---------------- THE CHAOS STYLES ---------------- */
const cyberStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Space+Mono&family=Playfair+Display:ital,wght@1,900&display=swap');

  @keyframes font-chaos {
    0% { font-family: 'Orbitron', sans-serif; transform: skewX(0deg); }
    20% { font-family: 'Space Mono', monospace; transform: skewX(10deg); color: #22d3ee; }
    40% { font-family: 'Playfair Display', serif; transform: skewX(-10deg); color: #f5d0fe; }
    100% { font-family: 'Orbitron', sans-serif; transform: skewX(0deg); }
  }
  .font-morph:hover { animation: font-chaos 0.4s steps(1) infinite; text-shadow: 4px 0 #ff00c1, -4px 0 #00fff9; }
  .shard-btn-primary { clip-path: polygon(0 0, 100% 15%, 85% 100%, 10% 90%); transition: all 0.2s; }
  .shard-btn-primary:hover { clip-path: polygon(15% 10%, 90% 0, 100% 85%, 0 100%); transform: scale(1.05) rotate(2deg); }
  .shard-btn-secondary { clip-path: polygon(10% 0, 90% 10%, 100% 90%, 0% 100%); transition: all 0.2s; }
  .shard-btn-secondary:hover { clip-path: polygon(0 15%, 100% 0, 85% 100%, 15% 85%); transform: scale(1.05) rotate(-2deg); }
  @keyframes grid-drift { from { background-position: 0 0; } to { background-position: 60px 60px; } }
  .chaos-grid {
    background-image: linear-gradient(rgba(217,70,239,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px);
    background-size: 60px 60px; animation: grid-drift 3s linear infinite;
  }

  /* ENHANCED NEURAL TEAM CARDS */
  .neural-card {
    height: 580px;
    background: #000;
    position: relative;
    overflow: hidden;
    perspective: 1500px;
    border: 2px solid rgba(255,255,255,0.05);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .neural-card:hover {
    border-color: rgba(34, 211, 238, 0.4);
    transform: translateY(-10px);
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.8),
      0 0 50px rgba(34, 211, 238, 0.2),
      inset 0 0 50px rgba(34, 211, 238, 0.05);
  }

  @keyframes pixel-glitch {
    0% { clip-path: inset(40% 0 61% 0); transform: scale(1.12) translateX(-8px) translateY(-3px); }
    20% { clip-path: inset(92% 0 1% 0); transform: scale(1.12) translateX(8px) translateY(3px); }
    40% { clip-path: inset(43% 0 1% 0); transform: scale(1.12) translateX(-5px) translateY(-2px); }
    60% { clip-path: inset(25% 0 58% 0); transform: scale(1.12) translateX(5px) translateY(2px); }
    80% { clip-path: inset(54% 0 7% 0); transform: scale(1.12) translateX(-3px) translateY(-4px); }
    100% { clip-path: inset(40% 0 61% 0); transform: scale(1.12) translateX(8px) translateY(3px); }
  }

  @keyframes color-shift {
    0%, 100% { filter: hue-rotate(0deg) saturate(1.5); }
    50% { filter: hue-rotate(20deg) saturate(2); }
  }

  @keyframes scan-line {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 5px rgba(34, 211, 238, 0.5); }
    50% { box-shadow: 0 0 20px rgba(34, 211, 238, 1); }
  }

  .dev-img-base {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: grayscale(1) contrast(1.3) brightness(0.3);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .dev-img-glitch {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    display: none;
    z-index: 2;
  }

  .neural-card:hover .dev-img-base {
    filter: grayscale(0) brightness(0.6) saturate(1.2);
    transform: scale(1.08) rotate(1deg);
    animation: color-shift 3s ease-in-out infinite;
  }

  .neural-card:hover .dev-img-glitch {
    display: block;
    animation: pixel-glitch 0.35s steps(3) infinite;
    opacity: 0.5;
    mix-blend-mode: screen;
  }

  .card-shard {
    position: absolute;
    width: 40px; height: 40px;
    border: 2px solid #22d3ee;
    opacity: 0.2;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 10;
  }
  .neural-card:hover .card-shard {
    opacity: 1;
    border-color: #f02aa2;
    transform: translateZ(60px);
    animation: pulse-glow 1.5s ease-in-out infinite;
  }
  .shard-tl { top: 20px; left: 20px; border-right: 0; border-bottom: 0; }
  .shard-tr { top: 20px; right: 20px; border-left: 0; border-bottom: 0; }
  .shard-bl { bottom: 20px; left: 20px; border-right: 0; border-top: 0; }
  .shard-br { bottom: 20px; right: 20px; border-left: 0; border-top: 0; }
  .neural-card:hover .shard-tl { top: 10px; left: 10px; }
  .neural-card:hover .shard-tr { top: 10px; right: 10px; }
  .neural-card:hover .shard-bl { bottom: 10px; left: 10px; }
  .neural-card:hover .shard-br { bottom: 10px; right: 10px; }

  .dev-name-main {
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    line-height: 0.85;
    transition: all 0.5s ease;
    position: relative;
    z-index: 5;
  }
  .neural-card:hover .dev-name-main {
    text-shadow: 
      4px 4px 0px #f02aa2,
      -4px -4px 0px #22d3ee,
      0 0 30px rgba(34, 211, 238, 0.5);
    transform: skewX(-3deg) translateX(-5px);
    letter-spacing: 0.05em;
  }

  .dev-load-bar {
    width: 0%;
    height: 2px;
    background: linear-gradient(90deg, #22d3ee, #f02aa2);
    transition: width 1s ease;
    box-shadow: 0 0 15px #22d3ee;
    position: relative;
  }
  .dev-load-bar::after {
    content: '';
    position: absolute;
    right: 0;
    top: -3px;
    width: 8px;
    height: 8px;
    background: #22d3ee;
    border-radius: 50%;
    box-shadow: 0 0 10px #22d3ee;
  }
  .neural-card:hover .dev-load-bar { width: 100%; }

  .scan-line {
    position: absolute;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, transparent, #22d3ee, transparent);
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 15;
  }
  .neural-card:hover .scan-line {
    opacity: 0.8;
    animation: scan-line 2s linear infinite;
  }

  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(34, 211, 238, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.5s;
    z-index: 3;
  }
  .neural-card:hover .card-overlay {
    opacity: 1;
  }

  /* WORKS SECTION */
  .work-card {
    position: relative;
    height: 450px;
    background: #0a0a0a;
    border: 2px solid rgba(255, 255, 255, 0.05);
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    cursor: pointer;
  }

  .work-card:hover {
    border-color: rgba(240, 42, 162, 0.5);
    transform: translateY(-15px) scale(1.02);
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.8),
      0 0 60px rgba(240, 42, 162, 0.3);
  }

  .work-img {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: grayscale(0.8) brightness(0.4);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .work-card:hover .work-img {
    filter: grayscale(0) brightness(0.8);
    transform: scale(1.1) rotate(2deg);
  }

  .work-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.95) 100%);
    z-index: 2;
  }

  .work-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s ease 0.1s;
  }

  .work-card:hover .work-tags {
    opacity: 1;
    transform: translateY(0);
  }

  .tech-tag {
    padding: 4px 12px;
    background: rgba(34, 211, 238, 0.1);
    border: 1px solid rgba(34, 211, 238, 0.3);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #22d3ee;
    transition: all 0.3s;
  }

  .tech-tag:hover {
    background: rgba(34, 211, 238, 0.2);
    border-color: #22d3ee;
    box-shadow: 0 0 15px rgba(34, 211, 238, 0.3);
  }

  .work-number {
    font-family: 'Orbitron', sans-serif;
    font-size: 120px;
    font-weight: 900;
    position: absolute;
    top: 20px;
    right: 20px;
    color: rgba(255, 255, 255, 0.03);
    z-index: 1;
    transition: all 0.5s;
  }

  .work-card:hover .work-number {
    color: rgba(240, 42, 162, 0.1);
    transform: scale(1.2) rotate(5deg);
  }

  @keyframes data-stream {
    0% { transform: translateY(0); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(100px); opacity: 0; }
  }

  .data-particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: #22d3ee;
    opacity: 0;
    z-index: 5;
  }

  .neural-card:hover .data-particle {
    animation: data-stream 2s linear infinite;
  }
`;

const DeveloperCard = ({ name, role, imgUrl, index }) => (
  <div className="neural-card group">
    {/* Corner Shards - All 4 corners */}
    <div className="card-shard shard-tl" />
    <div className="card-shard shard-tr" />
    <div className="card-shard shard-bl" />
    <div className="card-shard shard-br" />
    
    {/* Scan Line */}
    <div className="scan-line" />
    
    {/* Data Particles */}
    {[...Array(8)].map((_, i) => (
      <div 
        key={i}
        className="data-particle"
        style={{
          left: `${10 + i * 12}%`,
          top: '0',
          animationDelay: `${i * 0.2}s`
        }}
      />
    ))}
    
    {/* Visual Layers */}
    <div className="dev-img-base" style={{ backgroundImage: `url(${imgUrl})` }} />
    <div className="dev-img-glitch" style={{ backgroundImage: `url(${imgUrl})` }} />
    <div className="card-overlay" />
    
    {/* Card Content */}
    <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10">
      {/* Status Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-end mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 10px #4ade80' }} />
            <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-[0.4em] font-bold">Active</span>
          </div>
          <span className="font-mono text-[9px] text-white/30 font-bold">ID_00{index + 1}</span>
        </div>
        <div className="dev-load-bar" />
      </div>

      {/* Name */}
      <h3 className="dev-name-main text-5xl uppercase italic text-white mb-2">
        {name.split(' ')[0]}<br/>
        <span className="text-2xl font-light opacity-70 not-italic tracking-normal">
          {name.split(' ').slice(1).join(' ')}
        </span>
      </h3>
      
      {/* Role */}
      <p className="font-mono text-[11px] text-gray-500 group-hover:text-fuchsia-400 transition-colors uppercase tracking-[0.2em] mb-4">
        // {role}
      </p>

      {/* Tech Stack Pills */}
      <div className="flex gap-2 flex-wrap">
        {['React', 'Node.js', 'TypeScript'].map((tech, i) => (
          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-[8px] text-gray-600 group-hover:text-cyan-400 group-hover:border-cyan-400/30 transition-all font-mono uppercase tracking-wider">
            {tech}
          </span>
        ))}
      </div>
    </div>

    {/* Border Glow */}
    <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-cyan-500/20 transition-all duration-500" />
  </div>
);

const WorkCard = ({ title, description, imgUrl, tags, link, number }) => (
  <div className="work-card group" onClick={() => window.open(link, '_blank')}>
    {/* Background Number */}
    <div className="work-number">{number}</div>
    
    {/* Image */}
    <div className="work-img" style={{ backgroundImage: `url(${imgUrl})` }} />
    <div className="work-overlay" />
    
    {/* Content */}
    <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10">
      {/* Title */}
      <h3 className="text-3xl md:text-4xl font-black font-orbitron uppercase text-white mb-3 group-hover:text-cyan-400 transition-colors italic tracking-tight">
        {title}
      </h3>
      
      {/* Description */}
      <p className="font-mono text-sm text-gray-400 mb-6 leading-relaxed max-w-md">
        {description}
      </p>
      
      {/* Tech Tags */}
      <div className="work-tags mb-6">
        {tags.map((tag, i) => (
          <span key={i} className="tech-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* View Link */}
      <div className="flex items-center gap-3 font-mono text-xs text-fuchsia-400 uppercase tracking-wider">
        <span>View Project</span>
        <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>

    {/* Hover Corner Accents */}
    <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
);

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const team = [
    { name: "Aswini M S", role: "Frontend Architect", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070" },
    { name: "Aswin Krishna C P", role: "Fullstack Engineer", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070" },
    { name: "Bala Mugesh M K", role: "Systems Designer", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974" }
  ];

  const works = [
    {
      title: "TechFlow SaaS",
      description: "AI-powered workflow automation platform with real-time collaboration features",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      tags: ["React", "Node.js", "PostgreSQL", "AI/ML"],
      link: "#"
    },
    {
      title: "NeoBank Dashboard",
      description: "Modern banking interface with advanced analytics and transaction tracking",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
      tags: ["Next.js", "TypeScript", "Stripe", "Charts"],
      link: "#"
    },
    {
      title: "CreativeHub Studio",
      description: "Portfolio and project management system for creative agencies",
      img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064",
      tags: ["React", "Firebase", "Framer Motion", "CMS"],
      link: "#"
    },
    {
      title: "QuantumStore",
      description: "High-performance e-commerce platform with headless architecture",
      img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070",
      tags: ["Next.js", "Shopify", "Tailwind", "SEO"],
      link: "#"
    },
    {
      title: "MindSpace App",
      description: "Mental wellness tracking with personalized insights and community support",
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070",
      tags: ["React Native", "Node.js", "MongoDB", "WebSocket"],
      link: "#"
    },
    {
      title: "DevForge Platform",
      description: "Code collaboration and deployment platform for development teams",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
      tags: ["Vue.js", "Docker", "Kubernetes", "CI/CD"],
      link: "#"
    }
  ];

  return (
    <section className="relative w-full min-h-screen overflow-x-hidden bg-black text-white pt-24 pb-20">
      <style>{cyberStyles}</style>

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 chaos-grid opacity-30" />
      <div className="fixed inset-0 z-10 pointer-events-none" 
           style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,0.1), transparent 80%)` }} />

      <div className="relative z-20 container mx-auto px-6">
        {/* TITLES */}
        <div className="space-y-[-1rem] md:space-y-[-3rem]">
          <h1 className="text-[5rem] sm:text-[9rem] md:text-[13rem] font-black leading-none tracking-tighter uppercase">
            <span className="block font-morph hover:text-cyan-400 transition-all">SCRIPT</span>
            <span className="block font-morph text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600 italic ml-6 md:ml-20">& STYLE</span>
          </h1>
        </div>

        {/* SUBTITLE */}
        <div className="mt-10 flex flex-col md:flex-row gap-6 md:items-center">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1 h-6 bg-cyan-500/40 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <p className="max-w-md font-mono text-sm text-gray-400 leading-tight uppercase">// Chaos engineered for the next web iteration.</p>
        </div>

        {/* BUTTONS */}
        <div className="mt-16 flex flex-wrap gap-8 mb-40">
          <button className="shard-btn-primary px-14 py-8 bg-cyan-400 text-black font-black text-xs tracking-[0.3em] uppercase">Break_The_Code</button>
          <button className="shard-btn-secondary px-14 py-8 border-2 border-fuchsia-600 text-fuchsia-500 font-black text-xs tracking-[0.3em] uppercase hover:bg-fuchsia-600 hover:text-white">Access_Archive</button>
        </div>

        {/* TEAM SECTION */}
        <div className="relative mb-40">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="font-orbitron text-2xl md:text-3xl tracking-[0.5em] text-white uppercase italic">The_TEAM</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500 to-transparent opacity-30" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {team.map((member, idx) => (
              <DeveloperCard key={idx} name={member.name} role={member.role} imgUrl={member.img} index={idx} />
            ))}
          </div>
        </div>

        {/* WORKS SECTION */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="font-orbitron text-2xl md:text-3xl tracking-[0.5em] text-white uppercase italic">Selected_WORKS</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-fuchsia-500 to-transparent opacity-30" />
          </div>

          <p className="font-mono text-sm text-gray-500 mb-12 max-w-2xl uppercase tracking-wide">
            // Showcasing our latest projects - from SaaS platforms to creative studios
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work, idx) => (
              <WorkCard 
                key={idx}
                title={work.title}
                description={work.description}
                imgUrl={work.img}
                tags={work.tags}
                link={work.link}
                number={`0${idx + 1}`}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-20">
            <button className="shard-btn-primary px-12 py-6 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-black text-xs tracking-[0.3em] uppercase hover:shadow-[0_0_40px_rgba(240,42,162,0.5)] transition-all">
              View_All_Projects →
            </button>
          </div>
        </div>
      </div>

      {/* CURSOR */}
      <div className="fixed w-8 h-8 border border-white rounded-full pointer-events-none z-50 mix-blend-difference"
           style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' }} />
    </section>
  );
};

export default Hero;