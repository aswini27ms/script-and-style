import React, { useState } from 'react';

const cyberStyles = `
  @keyframes line-glow {
    0% { transform: translateX(-100%); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 5px rgba(34, 211, 238, 0.3); }
    50% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.6), 0 0 30px rgba(34, 211, 238, 0.3); }
  }

  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }

  @keyframes flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes grid-move {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
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

  .service-card {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    border: 2px solid;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    overflow: hidden;
  }

  .service-card.cyan-card {
    border-image: linear-gradient(135deg, #22d3ee, #06b6d4) 1;
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
  }

  .service-card.magenta-card {
    border-image: linear-gradient(135deg, #d946ef, #a855f7) 1;
    clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
  }

  .service-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
  }

  .service-card:hover::before {
    opacity: 1;
  }

  .service-card:hover {
    transform: translateY(-8px) scale(1.02);
    animation: pulse-glow 2s infinite;
  }

  .service-card.cyan-card:hover {
    box-shadow: 0 10px 40px rgba(34, 211, 238, 0.4);
  }

  .service-card.magenta-card:hover {
    box-shadow: 0 10px 40px rgba(217, 70, 239, 0.4);
  }

  .service-card:hover .glow-line {
    animation: line-glow 1.5s infinite linear;
  }

  .service-card:hover .card-number {
    animation: glitch 0.3s infinite;
  }

  .grid-bg {
    background-image: 
      linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: grid-move 20s linear infinite;
  }

  .text-glitch {
    position: relative;
  }

  .text-glitch::after {
    content: attr(data-text);
    position: absolute;
    left: 2px;
    text-shadow: -2px 0 #ff00ff;
    top: 0;
    color: #00ffff;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: glitch 3s infinite linear alternate-reverse;
    opacity: 0;
  }

  .service-card:hover .text-glitch::after {
    opacity: 0.8;
  }

  .hologram {
    background: linear-gradient(180deg, 
      transparent 0%, 
      rgba(34, 211, 238, 0.03) 50%, 
      transparent 100%);
    background-size: 100% 200%;
    animation: hologram-move 3s linear infinite;
  }

  @keyframes hologram-move {
    0% { background-position: 0% 0%; }
    100% { background-position: 0% 100%; }
  }

  .corner-cut-tl {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background: #000;
  }

  .corner-cut-br {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background: #000;
  }

  .corner-line {
    position: absolute;
    background: currentColor;
    transition: all 0.3s;
  }

  .service-card:hover .corner-line {
    filter: brightness(1.5) drop-shadow(0 0 8px currentColor);
  }
`;

const ServiceCard = ({ number, title, description, tags, variant, isHovered, onHover }) => {
  const isCyan = variant === 'cyan';
  const cornerColor = isCyan ? '#22d3ee' : '#d946ef';
  
  return (
    <div 
      className={`service-card p-8 group ${isCyan ? 'cyan-card' : 'magenta-card'}`}
      onMouseEnter={() => onHover(number)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Animated HUD line on hover */}
      <div className="glow-line absolute top-0 left-0 w-full h-[2px] bg-current opacity-0 pointer-events-none" style={{ color: cornerColor }} />
      
      {/* Hologram effect overlay */}
      <div className="hologram absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Corner decorations based on variant */}
      {isCyan ? (
        <>
          {/* Top-right corner lines */}
          <div className="corner-line absolute top-0 right-0 w-8 h-[2px]" style={{ color: cornerColor }} />
          <div className="corner-line absolute top-0 right-0 w-[2px] h-8" style={{ color: cornerColor }} />
          
          {/* Bottom-left corner lines */}
          <div className="corner-line absolute bottom-0 left-0 w-8 h-[2px]" style={{ color: cornerColor }} />
          <div className="corner-line absolute bottom-0 left-0 w-[2px] h-8" style={{ color: cornerColor }} />
        </>
      ) : (
        <>
          {/* Top-left corner lines */}
          <div className="corner-line absolute top-0 left-0 w-8 h-[2px]" style={{ color: cornerColor }} />
          <div className="corner-line absolute top-0 left-0 w-[2px] h-8" style={{ color: cornerColor }} />
          
          {/* Bottom-right corner lines */}
          <div className="corner-line absolute bottom-0 right-0 w-8 h-[2px]" style={{ color: cornerColor }} />
          <div className="corner-line absolute bottom-0 right-0 w-[2px] h-8" style={{ color: cornerColor }} />
        </>
      )}
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <span className="card-number font-mono text-xs opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: cornerColor }}>
          SYSTEM_ID: 0{number}
        </span>
        <div className="relative">
          <div className="w-2 h-2 rounded-full group-hover:animate-ping" style={{ backgroundColor: cornerColor }} />
          <div className="w-2 h-2 rounded-full absolute top-0 left-0" style={{ backgroundColor: cornerColor }} />
        </div>
      </div>

      <h3 
        className="text-glitch text-2xl font-black font-orbitron text-white mb-4 uppercase tracking-tighter group-hover:transition-colors relative z-10"
        style={{ '--hover-color': cornerColor }}
        data-text={title}
      >
        {title}
      </h3>
      
      <p className="font-mono text-sm text-gray-400 mb-8 leading-relaxed group-hover:text-gray-200 transition-colors relative z-10">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
        {tags.map((tag, idx) => (
          <span 
            key={idx} 
            className="text-[9px] font-mono border px-2 py-1 text-gray-500 uppercase group-hover:text-gray-300 transition-all hover:scale-105"
            style={{ 
              borderColor: `${cornerColor}40`,
              transitionDelay: `${idx * 50}ms` 
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const servicesData = [
    {
      title: "FULL-STACK WEB DEV",
      description: "Scalable and secure applications built with clean architecture. End-to-end systems for the enterprise that integrate. Authenticity, security, integrity: all our production.",
      tags: ["DATABASES", "API DESIGN", "DEVOPS", "ARCHITECTURE"],
      variant: "cyan"
    },
    {
      title: "FULL-STACK WEB",
      description: "Complex, end-to-end solutions built in modern terms. 3rd-tier design with multi-tenant, cloud, and secure-by-default guarantees.",
      tags: ["DATABASES", "MICROSERV", "SECURITY"],
      variant: "magenta"
    },
    {
      title: "UI/UX FRONTEND",
      description: "Simple, intuitive, purpose-keyed interfaces focused neatly on your desired user experiences above all else. Fast-loading, elite.",
      tags: ["RESPONSIVE", "LIGHTHOUSE", "PERF AUDIT"],
      variant: "cyan"
    },
    {
      title: "PERFORMANCE OPT",
      description: "Every design choice and technique we do, it can be run sluggish and turn inefficient. More functionality per token; less expensive per action result too.",
      tags: ["PAGE LOAD", "CODE SPLIT", "LAZY LOAD"],
      variant: "magenta"
    },
    {
      title: "SECURITY & RELIABILITY",
      description: "Secure, authenticated, and defend for data integrity and most every token authentication and real-world secure testing.",
      tags: ["AUTH", "PENETRATION", "AUDIT TRAIL"],
      variant: "cyan"
    },
    {
      title: "DEPLOYMENE OPT",
      description: "Instant production turnarounds neatly developed easily launched simple, also high-end infrastructure: all via full-range uptime.",
      tags: ["CI/CD", "CLOUD INFRA", "ZERO DOWN"],
      variant: "magenta"
    }
  ];

  return (
    <section className="bg-black text-white py-32 relative overflow-hidden">
      <style>{cyberStyles}</style>
      
      {/* Animated Grid Background */}
      <div className="grid-bg absolute inset-0 opacity-40" />
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60" />
      
      {/* Top border glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      
      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full" style={{ animation: 'float 4s infinite ease-in-out' }} />
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-fuchsia-500 rounded-full" style={{ animation: 'float 5s infinite ease-in-out 1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-500 rounded-full" style={{ animation: 'float 6s infinite ease-in-out 2s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-black font-orbitron uppercase tracking-tighter italic" style={{ animation: 'flicker 3s infinite' }}>
              OUR <span className="connection-text">SERVICES</span>
            </h2>
            <p className="mt-6 font-mono text-gray-500 uppercase text-sm tracking-widest leading-relaxed">
              &gt; BUILDING DIGITAL PRODUCTS THAT ARE FAST, RELIABLE, AND VISUALLY REFINED. FOCUSING ON LONG-TERM VALUE, NOT QUICK FIXES.
            </p>
          </div>
          <div className="hidden md:block text-right font-mono text-[10px] text-cyan-500/40 space-y-1">
            <p className="animate-pulse">STATUS: OPERATIONAL</p>
            <p style={{ animation: 'flicker 2s infinite' }}>LOAD_BALANCER: ACTIVE</p>
            <p>NODES: 06_READY</p>
            <div className="mt-2 flex justify-end gap-1">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full ${hoveredCard === i + 1 ? 'bg-cyan-400' : 'bg-cyan-900'}`}
                  style={{ transition: 'background-color 0.3s' }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={index} 
              number={index + 1} 
              title={service.title} 
              description={service.description} 
              tags={service.tags}
              variant={service.variant}
              isHovered={hoveredCard === index + 1}
              onHover={setHoveredCard}
            />
          ))}
        </div>

        {/* Workflow Section */}
        <div className="mt-32 pt-20 border-t border-white/5 relative">
          {/* Decorative lines */}
          <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-cyan-500 via-cyan-400 to-transparent animate-pulse" />
          <div className="absolute top-0 right-0 w-32 h-px bg-gradient-to-l from-fuchsia-500 via-fuchsia-400 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* HOW WE WORK Section */}
            <div className="relative">
              {/* Background accent */}
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <h3 className="text-4xl font-black font-orbitron uppercase mb-10 tracking-tighter italic relative group">
                <span className="relative z-10">HOW WE WORK</span>
                <div className="absolute -bottom-2 left-0 h-1 w-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 group-hover:w-32 transition-all duration-500" />
              </h3>
              
              <div className="space-y-6 relative">
                {/* Connecting vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/20 via-cyan-500/50 to-transparent" />
                
                {[
                  { step: "Understand your idea and requirements", icon: "📋" },
                  { step: "Design a clear technical plan", icon: "🎯" },
                  { step: "Build with clean and maintainable code", icon: "⚡" },
                  { step: "Test, optimize, and deploy", icon: "🚀" },
                  { step: "Support future growth", icon: "📈" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6 group/step cursor-pointer relative pl-4">
                    {/* Step circle indicator */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-4 h-4 rounded-full border-2 border-cyan-400 bg-black group-hover/step:bg-cyan-400 transition-all duration-300 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover/step:bg-black transition-all duration-300" />
                      </div>
                      {/* Pulsing ring on hover */}
                      <div className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-0 group-hover/step:opacity-100 group-hover/step:scale-150 transition-all duration-500" />
                    </div>
                    
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-cyan-400 text-xs font-bold group-hover/step:text-cyan-300 transition-colors">
                          0{i+1}_
                        </span>
                        <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/20 to-transparent group-hover/step:from-cyan-500/60 group-hover/step:to-cyan-500/20 transition-all" />
                      </div>
                      <p className="font-mono text-sm text-gray-400 group-hover/step:text-white transition-colors duration-300 group-hover/step:translate-x-2 transform">
                        {item.step}
                      </p>
                      {/* Progress bar effect */}
                      <div className="mt-2 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 group-hover/step:w-full transition-all duration-500" />
                    </div>
                    
                    {/* Icon appears on hover */}
                    <div className="text-2xl opacity-0 group-hover/step:opacity-100 transition-all duration-300 transform group-hover/step:scale-110">
                      {item.icon}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Bottom accent */}
              <div className="mt-8 flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 animate-pulse" />
                <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/50 to-transparent" />
              </div>
            </div>

            {/* WHO WE WORK WITH Section */}
            <div className="bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent p-12 border-2 border-cyan-500/30 relative overflow-hidden group/box backdrop-blur-sm" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-fuchsia-500/10 to-cyan-500/0 opacity-0 group-hover/box:opacity-100 transition-opacity duration-500" />
              
              {/* Corner accents with glow */}
              <div className="absolute top-0 left-0 w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent group-hover/box:shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all" />
              <div className="absolute top-0 left-0 w-[2px] h-12 bg-gradient-to-b from-cyan-400 to-transparent group-hover/box:shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all" />
              <div className="absolute bottom-0 right-0 w-12 h-[2px] bg-gradient-to-l from-cyan-400 to-transparent group-hover/box:shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all" />
              <div className="absolute bottom-0 right-0 w-[2px] h-12 bg-gradient-to-t from-cyan-400 to-transparent group-hover/box:shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all" />
              
              {/* Floating orbs */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-20 left-10 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl" style={{ animation: 'float 6s infinite ease-in-out' }} />
              
              <div className="relative z-10">
                <h3 className="text-xl font-orbitron uppercase mb-8 text-cyan-400 italic font-black relative inline-block">
                  WHO WE WORK WITH
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 animate-pulse" />
                </h3>
                
                <ul className="font-mono text-gray-300 space-y-5 text-sm mb-12">
                  {[
                    { text: "Startups and founders", delay: "0ms" },
                    { text: "Growing businesses", delay: "100ms" },
                    { text: "Teams that value quality and scalability", delay: "200ms" }
                  ].map((item, i) => (
                    <li 
                      key={i} 
                      className="flex items-center gap-4 group/item hover:text-cyan-300 transition-all cursor-pointer transform hover:translate-x-2"
                      style={{ transitionDelay: item.delay }}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-2 h-2 bg-fuchsia-600 group-hover/item:animate-ping" />
                        <div className="w-2 h-2 bg-fuchsia-600 absolute top-0 left-0 group-hover/item:shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
                      </div>
                      <span className="relative">
                        {item.text}
                        <div className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-fuchsia-500 group-hover/item:w-full transition-all duration-300" />
                      </span>
                      <div className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <div className="w-1 h-1 bg-cyan-400 animate-pulse" />
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Divider line */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-1 h-1 bg-cyan-400 animate-pulse" />
                  <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/50 via-fuchsia-500/50 to-transparent" />
                  <div className="w-1 h-1 bg-fuchsia-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
                
                <div className="relative">
                  <button className="font-mono text-[11px] tracking-[0.3em] uppercase bg-gradient-to-r from-white to-gray-100 text-black px-10 py-5 hover:from-cyan-400 hover:to-cyan-300 transition-all duration-300 font-bold relative overflow-hidden group/btn w-full shadow-lg hover:shadow-cyan-400/50 transform hover:scale-105">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity">&gt;&gt;</span>
                      INITIATE_COLLABORATION
                      <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity">&lt;&lt;</span>
                    </span>
                    {/* Sweeping light effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    {/* Corner highlights */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </button>
                  
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity -z-10" />
                </div>

                {/* Status indicator */}
                <div className="mt-6 flex items-center justify-center gap-2 font-mono text-[9px] text-cyan-500/60">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span>SYSTEM_READY_FOR_CONNECTION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;