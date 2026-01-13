import React from 'react';
import { Link } from 'react-router-dom';

const serviceStyles = `
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

  .service-card {
    background: rgba(10, 10, 15, 0.6);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.05);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }

  .service-card::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: var(--accent-color);
    filter: blur(20px);
    opacity: 0;
    transition: opacity 0.4s;
    z-index: -1;
  }

  .service-card:hover {
    border-color: var(--accent-color);
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  }

  .service-card:hover::before {
    opacity: 0.3;
  }

  @keyframes grid-drift {
    from { background-position: 0 0; }
    to { background-position: 60px 60px; }
  }

  .grid-bg {
    background-image:
      linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
  }

  @media (min-width: 768px) {
    .grid-bg {
      animation: grid-drift 20s linear infinite;
    }
  }

  .corner-line {
    position: absolute;
    background: currentColor;
    transition: all 0.3s;
  }

  .service-card:hover .corner-line {
    filter: brightness(1.5);
  }
`;

const ServiceCard = ({ number, title, description, tags, accentColor }) => (
  <div
    className="service-card p-6 md:p-8"
    style={{ '--accent-color': accentColor }}
  >
    <div className="corner-line absolute top-0 right-0 w-8 h-[2px]" style={{ color: accentColor }} />
    <div className="corner-line absolute top-0 right-0 w-[2px] h-8" style={{ color: accentColor }} />
    <div className="corner-line absolute bottom-0 left-0 w-8 h-[2px]" style={{ color: accentColor }} />
    <div className="corner-line absolute bottom-0 left-0 w-[2px] h-8" style={{ color: accentColor }} />

    <div className="flex justify-between items-start mb-6 relative z-10">
      <span className="font-mono text-xs opacity-40 transition-opacity" style={{ color: accentColor }}>
        SYSTEM_ID: 0{number}
      </span>
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
    </div>

    <h3 className="text-xl md:text-2xl font-black font-orbitron text-white mb-4 uppercase tracking-tighter relative z-10">
      {title}
    </h3>

    <p className="font-mono text-sm text-gray-400 mb-6 md:mb-8 leading-relaxed relative z-10">
      {description}
    </p>

    <div className="flex flex-wrap gap-2 mt-auto relative z-10">
      {tags.map((tag, idx) => (
        <span
          key={idx}
          className="text-[9px] font-mono border px-2 py-1 text-gray-500 uppercase"
          style={{ borderColor: `${accentColor}40` }}
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const Services = () => {
  const servicesData = [
    {
      title: "FULL-STACK DEVELOPMENT",
      description: "Scalable and secure applications built with clean architecture. End-to-end systems that integrate seamlessly.",
      tags: ["DATABASES", "API DESIGN", "DEVOPS"],
      accentColor: "#22d3ee"
    },
    {
      title: "UI/UX FRONTEND",
      description: "Simple, intuitive interfaces focused on user experience. Fast-loading and optimized.",
      tags: ["RESPONSIVE", "LIGHTHOUSE", "PERF"],
      accentColor: "#f02aa2"
    },
    {
      title: "PERFORMANCE OPT",
      description: "Every design choice optimized for speed. More functionality per action, less cost per result.",
      tags: ["PAGE LOAD", "CODE SPLIT", "LAZY LOAD"],
      accentColor: "#a3e635"
    },
    {
      title: "SECURITY & RELIABILITY",
      description: "Secure authentication, data integrity, and real-world security testing.",
      tags: ["AUTH", "PENETRATION", "AUDIT"],
      accentColor: "#d946ef"
    },
    {
      title: "DEPLOYMENT OPT",
      description: "Instant production turnarounds with high-end infrastructure and full uptime.",
      tags: ["CI/CD", "CLOUD", "ZERO DOWN"],
      accentColor: "#22d3ee"
    },
    {
      title: "CLOUD ARCHITECTURE",
      description: "Scalable cloud solutions designed for growth and reliability.",
      tags: ["AWS", "DOCKER", "K8S"],
      accentColor: "#fbbf24"
    }
  ];

  return (
    <section className="bg-black text-white py-16 md:py-32 relative overflow-hidden">
      <style>{serviceStyles}</style>

      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-orbitron uppercase tracking-tighter italic">
              OUR <span className="connection-text">SERVICES</span>
            </h2>
            <p className="mt-6 font-mono text-gray-500 uppercase text-xs md:text-sm tracking-wider leading-relaxed">
              Building digital products that are fast, reliable, and visually refined
            </p>
          </div>

          <div className="hidden md:block text-right font-mono text-[10px] text-cyan-500/40 space-y-1">
            <p className="animate-pulse">STATUS: OPERATIONAL</p>
            <p>NODES: 06_READY</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              number={index + 1}
              title={service.title}
              description={service.description}
              tags={service.tags}
              accentColor={service.accentColor}
            />
          ))}
        </div>

        <div className="mt-16 md:mt-32 pt-12 md:pt-20 border-t border-white/5 relative">
          <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-cyan-500 via-cyan-400 to-transparent animate-pulse" />
          <div className="absolute top-0 right-0 w-32 h-px bg-gradient-to-l from-fuchsia-500 via-fuchsia-400 to-transparent animate-pulse" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h3 className="text-2xl md:text-4xl font-black font-orbitron uppercase mb-6 md:mb-10 tracking-tighter italic relative inline-block">
                HOW WE WORK
                <div className="absolute -bottom-2 left-0 h-1 w-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 group-hover:w-32 transition-all duration-500" />
              </h3>

              <div className="space-y-4 md:space-y-6 relative">
                {[
                  "Understand your idea and requirements",
                  "Design a clear technical plan",
                  "Build with clean and maintainable code",
                  "Test, optimize, and deploy",
                  "Support future growth"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group/step">
                    <div className="w-4 h-4 rounded-full border-2 border-cyan-400 bg-black flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-cyan-400 text-xs font-bold">
                          0{i + 1}_
                        </span>
                      </div>
                      <p className="font-mono text-sm text-gray-400 group-hover/step:text-white transition-colors">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent p-8 md:p-12 border-2 border-cyan-500/30 backdrop-blur-sm rounded-lg">
              <h3 className="text-xl md:text-2xl font-orbitron uppercase mb-6 md:mb-8 text-cyan-400 italic font-black">
                WHO WE WORK WITH
              </h3>

              <ul className="font-mono text-gray-300 space-y-4 md:space-y-5 text-sm mb-8 md:mb-12">
                {[
                  "Startups and founders",
                  "Growing businesses",
                  "Teams that value quality and scalability"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 hover:text-cyan-300 transition-all">
                    <div className="w-2 h-2 bg-fuchsia-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/pricing"
                className="block w-full text-center font-mono text-[11px] tracking-[0.3em] uppercase bg-gradient-to-r from-white to-gray-100 text-black px-8 md:px-10 py-4 md:py-5 hover:from-cyan-400 hover:to-cyan-300 transition-all font-bold"
              >
                VIEW PRICING
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
