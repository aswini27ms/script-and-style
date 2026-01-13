import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const cyberStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');

  @keyframes grid-drift {
    from { background-position: 0 0; }
    to { background-position: 60px 60px; }
  }

  .chaos-grid {
    background-image: linear-gradient(rgba(217,70,239,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  @media (min-width: 768px) {
    .chaos-grid {
      animation: grid-drift 3s linear infinite;
      background-image: linear-gradient(rgba(217,70,239,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px);
    }
  }

  .work-card {
    position: relative;
    background: #0a0a0a;
    border: 2px solid rgba(255, 255, 255, 0.05);
    overflow: hidden;
    transition: all 0.4s ease;
  }

  .work-card:hover {
    border-color: rgba(240, 42, 162, 0.5);
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  }

  .work-img {
    background-size: cover;
    background-position: center;
    filter: grayscale(0.8) brightness(0.4);
    transition: all 0.6s ease;
  }

  .work-card:hover .work-img {
    filter: grayscale(0) brightness(0.7);
    transform: scale(1.05);
  }

  .team-card {
    background: #000;
    border: 2px solid rgba(255,255,255,0.05);
    overflow: hidden;
    transition: all 0.4s ease;
  }

  .team-card:hover {
    border-color: rgba(34, 211, 238, 0.4);
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  }

  .team-img {
    background-size: cover;
    background-position: center;
    filter: grayscale(1) brightness(0.3);
    transition: all 0.6s ease;
  }

  .team-card:hover .team-img {
    filter: grayscale(0) brightness(0.6);
  }
`;

const WorkCard = ({ title, description, imgUrl, tags, number }) => (
  <div className="work-card h-[400px] md:h-[450px]">
    <div className="absolute inset-0">
      <div className="work-img absolute inset-0" style={{ backgroundImage: `url(${imgUrl})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
    </div>

    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
      <span className="text-6xl md:text-8xl font-black font-orbitron text-white/5 absolute top-4 right-4">
        {number}
      </span>

      <h3 className="text-2xl md:text-3xl font-black font-orbitron uppercase text-white mb-3 tracking-tight">
        {title}
      </h3>

      <p className="font-mono text-xs md:text-sm text-gray-400 mb-4 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, i) => (
          <span key={i} className="text-[9px] font-mono border border-cyan-500/30 px-2 py-1 text-cyan-400 uppercase">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const TeamCard = ({ name, role, imgUrl, index }) => (
  <div className="team-card h-[450px] md:h-[500px]">
    <div className="absolute inset-0">
      <div className="team-img absolute inset-0" style={{ backgroundImage: `url(${imgUrl})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
    </div>

    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-wider">Active</span>
          </div>
          <span className="font-mono text-[9px] text-white/30">ID_00{index + 1}</span>
        </div>
        <div className="w-full h-[2px] bg-gradient-to-r from-cyan-500 to-fuchsia-500" />
      </div>

      <h3 className="text-3xl md:text-4xl font-black font-orbitron uppercase text-white mb-2 tracking-tighter">
        {name.split(' ')[0]}
      </h3>

      <p className="font-mono text-[11px] text-gray-500 uppercase tracking-wider mb-4">
        {role}
      </p>

      <div className="flex gap-2 flex-wrap">
        {['React', 'Node.js', 'TypeScript'].map((tech, i) => (
          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-[8px] text-gray-600 font-mono uppercase">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!isMobile) {
      const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener('resize', checkMobile);
      };
    }
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  const team = [
    { name: "Aswini M S", role: "Frontend Architect", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070" },
    { name: "Aswin Krishna C P", role: "Fullstack Engineer", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070" },
    { name: "Bala Mugesh M K", role: "Systems Designer", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974" },
    { name: "Kruthika S", role: "UI/UX Designer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974" }
  ];

  const works = [
    {
      title: "TechFlow SaaS",
      description: "AI-powered workflow automation platform with real-time collaboration",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      tags: ["React", "Node", "AI"],
      number: "01"
    },
    {
      title: "NeoBank",
      description: "Modern banking interface with advanced analytics",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
      tags: ["Next.js", "Stripe"],
      number: "02"
    },
    {
      title: "CreativeHub",
      description: "Portfolio system for creative agencies",
      img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064",
      tags: ["React", "Firebase"],
      number: "03"
    },
    {
      title: "QuantumStore",
      description: "High-performance e-commerce platform",
      img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070",
      tags: ["Next.js", "Shopify"],
      number: "04"
    },
    {
      title: "MindSpace",
      description: "Mental wellness tracking with insights",
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070",
      tags: ["React Native", "Node"],
      number: "05"
    },
    {
      title: "DevForge",
      description: "Code collaboration platform for teams",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
      tags: ["Vue", "Docker"],
      number: "06"
    }
  ];

  return (
    <section className="relative w-full min-h-screen overflow-x-hidden bg-black text-white py-12 md:py-20">
      <style>{cyberStyles}</style>

      <div className="absolute inset-0 z-0 chaos-grid opacity-30" />

      {!isMobile && (
        <div
          className="fixed inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,0.1), transparent 80%)`
          }}
        />
      )}

      <div className="relative z-20 container mx-auto px-4 md:px-6">
        <div className="mb-16 md:mb-24">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter uppercase">
            <span className="block">SCRIPT</span>
            <span className="block bg-gradient-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent italic mt-2">
              & STYLE
            </span>
          </h1>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 md:items-center">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-4 md:h-6 bg-cyan-500/40" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <p className="max-w-md font-mono text-xs md:text-sm text-gray-400 leading-tight uppercase">
              Building fast, scalable web solutions for the modern era
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 mb-20 md:mb-32">
          <Link
            to="/services"
            className="px-8 md:px-12 py-4 md:py-6 bg-cyan-400 text-black font-black text-xs md:text-sm tracking-widest uppercase hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-center"
          >
            EXPLORE SERVICES
          </Link>
          <Link
            to="/pricing"
            className="px-8 md:px-12 py-4 md:py-6 border-2 border-fuchsia-600 text-fuchsia-500 font-black text-xs md:text-sm tracking-widest uppercase hover:bg-fuchsia-600 hover:text-white transition-all text-center"
          >
            VIEW PRICING
          </Link>
        </div>

        <div className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-10 md:mb-16">
            <h2 className="font-orbitron text-xl md:text-3xl tracking-wider text-white uppercase italic font-black">
              THE TEAM
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500 to-transparent opacity-30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, idx) => (
              <TeamCard key={idx} name={member.name} role={member.role} imgUrl={member.img} index={idx} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-10 md:mb-16">
            <h2 className="font-orbitron text-xl md:text-3xl tracking-wider text-white uppercase italic font-black">
              SELECTED WORKS
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-fuchsia-500 to-transparent opacity-30" />
          </div>

          <p className="font-mono text-xs md:text-sm text-gray-500 mb-8 md:mb-12 uppercase tracking-wide">
            Recent projects showcasing our approach
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {works.map((work, idx) => (
              <WorkCard
                key={idx}
                title={work.title}
                description={work.description}
                imgUrl={work.img}
                tags={work.tags}
                number={work.number}
              />
            ))}
          </div>

          <div className="flex justify-center mt-12 md:mt-16">
            <Link
              to="/services"
              className="px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-black text-xs md:text-sm tracking-widest uppercase hover:shadow-lg hover:shadow-fuchsia-500/50 transition-all"
            >
              VIEW ALL PROJECTS
            </Link>
          </div>
        </div>
      </div>

      {!isMobile && (
        <div
          className="fixed w-8 h-8 border border-white rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' }}
        />
      )}
    </section>
  );
};

export default Hero;
