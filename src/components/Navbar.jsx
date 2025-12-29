import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;900&family=JetBrains+Mono:wght@300;700&display=swap');

        /* 1. BALANCED MODULAR LINKS */
        .nav-module {
          position: relative;
          padding: 12px 20px;
          color: #777;
          font-family: 'Orbitron', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 3px;
          transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none; /* Reset Link underline */
        }

        .nav-module::before, .nav-module::after {
          content: '';
          position: absolute;
          width: 0px;
          height: 100%;
          border: 1.5px solid #00f3ff;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .nav-module::before { left: 0; border-right: none; }
        .nav-module::after { right: 0; border-left: none; }

        .nav-module:hover {
          color: #fff;
          text-shadow: 0 0 10px rgba(0, 243, 255, 0.8);
          background: rgba(0, 243, 255, 0.05);
        }

        .nav-module:hover::before, .nav-module:hover::after {
          width: 10px;
          opacity: 1;
        }

        .module-scan {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #00f3ff;
          box-shadow: 0 0 15px #00f3ff;
          opacity: 0;
          pointer-events: none;
        }

        .nav-module:hover .module-scan {
          animation: scan-move 0.8s linear infinite;
          opacity: 0.7;
        }

        @keyframes scan-move {
          0% { top: -10%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }

        /* 2. THE FRAGMENT BUTTON */
        .btn-fragment {
          position: relative;
          background: transparent;
          color: #00f3ff;
          font-family: 'Orbitron', sans-serif;
          font-size: 11px;
          font-weight: 900;
          padding: 14px 35px;
          border: 1px solid rgba(0, 243, 255, 0.3);
          cursor: pointer;
          transition: all 0.4s ease;
          overflow: hidden;
          clip-path: polygon(15% 0, 100% 0, 85% 100%, 0% 100%);
        }

        .btn-fragment::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #00f3ff;
          clip-path: polygon(15% 0, 100% 0, 85% 100%, 0% 100%);
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: -1;
        }

        .btn-fragment:hover::before { transform: translateX(0); }

        .btn-fragment:hover {
          color: #000;
          border-color: #00f3ff;
          box-shadow: 0 0 40px rgba(0, 243, 255, 0.4);
        }

        /* 3. LOGO STYLING */
        .logo-diamond-outer {
          border: 2px solid #00f3ff;
          transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .logo-group:hover .logo-diamond-outer {
          transform: rotate(225deg);
          border-color: #ff00ff;
          box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
        }

        .bg-black-void { background-color: #000000; }
      `}</style>

      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 bg-black-void ${scrolled ? 'h-20 border-b border-cyan-500/20' : 'h-28'}`}>
        
        {/* Ambient Mouse Glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 243, 255, 0.08) 0%, transparent 70%)`
          }}
        />

        <div className="container mx-auto px-6 lg:px-12 h-full flex items-center justify-between relative">
          
          {/* --- LEFT: LOGO --- */}
          <Link to="/" className="flex items-center gap-4 logo-group cursor-pointer min-w-[250px] no-underline">
            <div className="relative">
              <div className="w-10 h-10 logo-diamond-outer rotate-45 flex items-center justify-center">
                <div className="w-6 h-6 border border-pink-500 rotate-45 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black font-orbitron text-white tracking-tighter">
                SCRIPT<span className="text-cyan-400">&</span>STYLE
              </span>
              <span className="text-[7px] font-mono text-cyan-500/30 tracking-[0.4em] uppercase">Void_Protocol_v4</span>
            </div>
          </Link>

          {/* --- CENTER: NAVIGATION --- */}
          <div className="hidden lg:flex items-center justify-center gap-2 xl:gap-8 flex-1">
            {[
              { label: 'Home', path: '/' },
              { label: 'About Us', path: '/about' },
              { label: 'Services', path: '/services' },
              { label: 'Pricing', path: '/pricing' },
              { label: 'Contact Us', path: '/contact' }
            ].map((item) => (
              <Link key={item.label} to={item.path} className="nav-module group/mod">
                <div className="module-scan" />
                <span className="relative z-10">{item.label}</span>
                <span className="absolute -bottom-2 text-[6px] text-pink-500 opacity-0 group-hover/mod:opacity-100 transition-all duration-300">
                  //SEC_FILE
                </span>
              </Link>
            ))}
          </div>

          {/* --- RIGHT: CTA --- */}
          <div className="flex items-center justify-end min-w-[250px]">
            <button className="btn-fragment">
              <span className="relative z-10">SYNC_INTERFACE</span>
            </button>
          </div>
        </div>

        {/* HUD Bottom Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </nav>
    </>
  );
};

export default Navbar;