import React, { useState, useEffect } from 'react';

const contactStyles = `
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }

  @keyframes glow-pulse {
    0%, 100% { 
      text-shadow: 0 0 20px rgba(34, 211, 238, 0.5),
                   0 0 40px rgba(34, 211, 238, 0.3),
                   0 0 60px rgba(34, 211, 238, 0.2);
    }
    50% { 
      text-shadow: 0 0 30px rgba(34, 211, 238, 0.8),
                   0 0 60px rgba(34, 211, 238, 0.5),
                   0 0 90px rgba(34, 211, 238, 0.3);
    }
  }

  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes float-up {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 200%; }
  }

  @keyframes border-flow {
    0% { border-image-source: linear-gradient(90deg, #22d3ee, #f02aa2, #22d3ee); }
    50% { border-image-source: linear-gradient(90deg, #f02aa2, #a78bfa, #f02aa2); }
    100% { border-image-source: linear-gradient(90deg, #22d3ee, #f02aa2, #22d3ee); }
  }

  .connection-text {
    background: linear-gradient(
      135deg,
      #22d3ee 0%,
      #06b6d4 20%,
      #a78bfa 40%,
      #f02aa2 60%,
      #ec4899 80%,
      #22d3ee 100%
    );
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradient-shift 3s ease infinite;
    filter: drop-shadow(0 0 30px rgba(34, 211, 238, 0.5));
  }

  @keyframes input-glow {
    0%, 100% {
      box-shadow: 
        0 0 20px rgba(34, 211, 238, 0.3),
        inset 0 0 20px rgba(34, 211, 238, 0.05);
    }
    50% {
      box-shadow: 
        0 0 40px rgba(34, 211, 238, 0.6),
        inset 0 0 30px rgba(34, 211, 238, 0.1);
    }
  }

  @keyframes typing-cursor {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  .terminal-input {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
    border: 2px solid rgba(255, 255, 255, 0.1);
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    color: white;
    position: relative;
    overflow: hidden;
  }

  .terminal-input::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.15), rgba(240, 42, 162, 0.1), transparent);
    transition: left 0.8s;
    z-index: 0;
  }

  .terminal-input::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      rgba(34, 211, 238, 0.1) 90deg,
      transparent 180deg,
      rgba(240, 42, 162, 0.1) 270deg,
      transparent 360deg
    );
    opacity: 0;
    transition: opacity 0.5s;
    z-index: -1;
    border-radius: inherit;
    animation: rotate-border 4s linear infinite;
  }

  .terminal-input:focus::before {
    left: 100%;
  }

  .terminal-input:focus::after {
    opacity: 1;
  }

  .terminal-input:focus {
    outline: none;
    border-color: #22d3ee;
    background: rgba(34, 211, 238, 0.1);
    box-shadow: 
      0 0 30px rgba(34, 211, 238, 0.4),
      inset 0 0 20px rgba(34, 211, 238, 0.08),
      0 0 0 2px rgba(34, 211, 238, 0.2);
    transform: translateY(-3px) scale(1.01);
    animation: input-glow 2s ease-in-out infinite;
  }

  /* Input Corner Accents */
  .input-wrapper {
    position: relative;
  }

  .input-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid rgba(34, 211, 238, 0.2);
    opacity: 0;
    transition: all 0.4s;
    z-index: 10;
    pointer-events: none;
  }

  .input-corner.top-left {
    top: -1px;
    left: -1px;
    border-right: none;
    border-bottom: none;
  }

  .input-corner.top-right {
    top: -1px;
    right: -1px;
    border-left: none;
    border-bottom: none;
  }

  .input-corner.bottom-left {
    bottom: -1px;
    left: -1px;
    border-right: none;
    border-top: none;
  }

  .input-corner.bottom-right {
    bottom: -1px;
    right: -1px;
    border-left: none;
    border-top: none;
  }

  .terminal-input:focus ~ .input-corner,
  .input-wrapper:focus-within .input-corner {
    opacity: 1;
    border-color: rgba(34, 211, 238, 0.8);
    animation: corner-pulse 1.5s ease-in-out infinite;
  }

  /* Label Effects */
  .input-label {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    display: inline-block;
  }

  .input-wrapper:focus-within .input-label,
  .input-wrapper:hover .input-label {
    transform: translateX(4px);
    text-shadow: 0 0 15px rgba(34, 211, 238, 0.6);
  }

  /* Typing Indicator */
  .terminal-input:focus {
    position: relative;
  }

  .terminal-input:focus::placeholder {
    animation: typing-cursor 1s infinite;
  }

  @keyframes hud-pulse {
    0%, 100% {
      box-shadow: 
        0 20px 60px rgba(0, 0, 0, 0.5),
        0 0 0 0 rgba(34, 211, 238, 0.4);
    }
    50% {
      box-shadow: 
        0 20px 60px rgba(0, 0, 0, 0.5),
        0 0 0 20px rgba(34, 211, 238, 0);
    }
  }

  .floating-hud {
    background: linear-gradient(145deg, rgba(20, 20, 30, 0.6), rgba(10, 10, 20, 0.8));
    backdrop-filter: blur(20px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .floating-hud::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -100%;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, transparent, #22d3ee, #f02aa2, transparent);
    animation: shimmer 3s infinite;
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.6);
  }

  .floating-hud::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(145deg, rgba(34, 211, 238, 0.05), rgba(240, 42, 162, 0.05));
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
  }

  .floating-hud:hover {
    border-color: rgba(34, 211, 238, 0.4);
    transform: translateY(-4px);
    animation: hud-pulse 3s ease-in-out infinite;
  }

  .floating-hud:hover::after {
    opacity: 1;
  }

  /* HUD Corner Decorations */
  .floating-hud .hud-corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(34, 211, 238, 0.3);
    opacity: 0;
    transition: all 0.4s;
  }

  .floating-hud .hud-corner.top-left {
    top: -1px;
    left: -1px;
    border-right: none;
    border-bottom: none;
  }

  .floating-hud .hud-corner.top-right {
    top: -1px;
    right: -1px;
    border-left: none;
    border-bottom: none;
  }

  .floating-hud .hud-corner.bottom-left {
    bottom: -1px;
    left: -1px;
    border-right: none;
    border-top: none;
  }

  .floating-hud .hud-corner.bottom-right {
    bottom: -1px;
    right: -1px;
    border-left: none;
    border-top: none;
  }

  .floating-hud:hover .hud-corner {
    opacity: 1;
    border-color: rgba(34, 211, 238, 0.8);
    animation: corner-pulse 2s ease-in-out infinite;
  }

  @keyframes button-pulse {
    0%, 100% {
      box-shadow: 
        0 0 30px rgba(34, 211, 238, 0.5),
        0 0 60px rgba(34, 211, 238, 0.3),
        0 10px 30px rgba(34, 211, 238, 0.2);
    }
    50% {
      box-shadow: 
        0 0 50px rgba(240, 42, 162, 0.8),
        0 0 100px rgba(240, 42, 162, 0.5),
        0 15px 50px rgba(240, 42, 162, 0.4);
    }
  }

  @keyframes button-shimmer {
    0% { transform: translateX(-100%) translateY(-50%); }
    100% { transform: translateX(100%) translateY(-50%); }
  }

  .transmit-btn {
    background: linear-gradient(135deg, #22d3ee, #06b6d4);
    color: #000;
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    overflow: hidden;
    border: 2px solid #22d3ee;
    font-weight: 900;
  }

  .transmit-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(255,255,255,0.8), transparent);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
    z-index: 0;
  }

  .transmit-btn::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -100%;
    width: 100%;
    height: 200%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: translateY(-50%);
    transition: left 0.6s;
    z-index: 1;
  }

  .transmit-btn:hover::before {
    width: 400px;
    height: 400px;
  }

  .transmit-btn:hover::after {
    left: 100%;
    animation: button-shimmer 0.6s ease-in-out;
  }

  .transmit-btn:hover {
    background: linear-gradient(135deg, #f02aa2, #ec4899);
    border-color: #f02aa2;
    box-shadow: 
      0 0 40px rgba(240, 42, 162, 0.6),
      0 10px 30px rgba(240, 42, 162, 0.3),
      inset 0 0 20px rgba(255, 255, 255, 0.1);
    transform: translateY(-4px) scale(1.05);
    animation: button-pulse 2s ease-in-out infinite;
  }

  .transmit-btn:active {
    transform: translateY(-2px) scale(1.02);
  }

  .transmit-btn span {
    position: relative;
    z-index: 2;
    transition: all 0.3s;
  }

  .transmit-btn:hover span {
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    letter-spacing: 0.05em;
  }

  /* Button Corner Accents */
  .transmit-btn .btn-corner {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(34, 211, 238, 0.5);
    opacity: 0;
    transition: all 0.4s;
    z-index: 1;
  }

  .transmit-btn .btn-corner.top-left {
    top: -1px;
    left: -1px;
    border-right: none;
    border-bottom: none;
  }

  .transmit-btn .btn-corner.top-right {
    top: -1px;
    right: -1px;
    border-left: none;
    border-bottom: none;
  }

  .transmit-btn .btn-corner.bottom-left {
    bottom: -1px;
    left: -1px;
    border-right: none;
    border-top: none;
  }

  .transmit-btn .btn-corner.bottom-right {
    bottom: -1px;
    right: -1px;
    border-left: none;
    border-top: none;
  }

  .transmit-btn:hover .btn-corner {
    opacity: 1;
    border-color: rgba(255, 255, 255, 0.8);
    animation: corner-pulse 1.5s ease-in-out infinite;
  }

  @keyframes border-glow {
    0%, 100% { 
      box-shadow: 0 0 10px rgba(34, 211, 238, 0.3),
                  0 0 20px rgba(34, 211, 238, 0.1),
                  inset 0 0 10px rgba(34, 211, 238, 0.05);
    }
    50% { 
      box-shadow: 0 0 20px rgba(34, 211, 238, 0.6),
                  0 0 40px rgba(34, 211, 238, 0.3),
                  inset 0 0 20px rgba(34, 211, 238, 0.1);
    }
  }

  @keyframes scan-line {
    0% { transform: translateY(-100%); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0; }
  }

  @keyframes particle-float {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
    10% { opacity: 1; }
    50% { transform: translate(20px, -30px) scale(1.2); opacity: 0.8; }
    90% { opacity: 1; }
  }

  @keyframes corner-pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }

  @keyframes rotate-border {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .contact-card {
    background: rgba(15, 15, 25, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
    transform-style: preserve-3d;
  }

  .contact-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      rgba(34, 211, 238, 0.1) 90deg,
      transparent 180deg,
      rgba(240, 42, 162, 0.1) 270deg,
      transparent 360deg
    );
    opacity: 0;
    transition: opacity 0.5s;
    animation: rotate-border 3s linear infinite;
  }

  .contact-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(34, 211, 238, 0.2),
      transparent
    );
    transition: left 0.6s;
  }

  .contact-card:hover::before {
    opacity: 1;
  }

  .contact-card:hover::after {
    left: 100%;
  }

  .contact-card:hover {
    background: rgba(20, 20, 30, 0.9);
    border-color: rgba(34, 211, 238, 0.5);
    transform: translateX(8px) translateY(-4px) scale(1.02);
    box-shadow: 
      0 0 30px rgba(34, 211, 238, 0.3),
      0 10px 40px rgba(34, 211, 238, 0.2),
      inset 0 0 20px rgba(34, 211, 238, 0.05);
    animation: border-glow 2s ease-in-out infinite;
  }

  /* Corner Accents */
  .contact-card .corner-accent {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid rgba(34, 211, 238, 0.3);
    opacity: 0;
    transition: all 0.4s;
  }

  .contact-card .corner-accent.top-left {
    top: -1px;
    left: -1px;
    border-right: none;
    border-bottom: none;
  }

  .contact-card .corner-accent.top-right {
    top: -1px;
    right: -1px;
    border-left: none;
    border-bottom: none;
  }

  .contact-card .corner-accent.bottom-left {
    bottom: -1px;
    left: -1px;
    border-right: none;
    border-top: none;
  }

  .contact-card .corner-accent.bottom-right {
    bottom: -1px;
    right: -1px;
    border-left: none;
    border-top: none;
  }

  .contact-card:hover .corner-accent {
    opacity: 1;
    border-color: rgba(34, 211, 238, 0.8);
    animation: corner-pulse 1.5s ease-in-out infinite;
  }

  /* Particle Effect */
  .contact-card .particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: rgba(34, 211, 238, 0.6);
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
  }

  .contact-card:hover .particle {
    animation: particle-float 3s ease-in-out infinite;
  }

  .contact-card:hover .particle:nth-child(1) {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  .contact-card:hover .particle:nth-child(2) {
    top: 50%;
    right: 15%;
    animation-delay: 0.5s;
  }

  .contact-card:hover .particle:nth-child(3) {
    bottom: 20%;
    left: 20%;
    animation-delay: 1s;
  }

  /* Scan Line Effect */
  .contact-card .scan-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(34, 211, 238, 0.8),
      transparent
    );
    opacity: 0;
    pointer-events: none;
  }

  .contact-card:hover .scan-line {
    opacity: 1;
    animation: scan-line 2s linear infinite;
  }

  .status-dot {
    box-shadow: 0 0 20px rgba(34, 255, 100, 0.8);
  }

  .grid-overlay {
    background-image: 
      linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: float-up 8s ease-in-out infinite;
  }

  .orb-1 {
    position: absolute;
    top: 10%;
    left: 5%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(34, 211, 238, 0.15), transparent);
    border-radius: 50%;
    filter: blur(80px);
    animation: float-up 6s ease-in-out infinite;
  }

  .orb-2 {
    position: absolute;
    bottom: 10%;
    right: 10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(240, 42, 162, 0.12), transparent);
    border-radius: 50%;
    filter: blur(100px);
    animation: float-up 8s ease-in-out infinite reverse;
  }

  .orb-3 {
    position: absolute;
    top: 50%;
    right: 20%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(167, 139, 250, 0.1), transparent);
    border-radius: 50%;
    filter: blur(90px);
    animation: float-up 7s ease-in-out infinite;
  }

  .label-glow {
    text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message transmitted successfully!');
  };

  return (
    <section className="bg-black text-white min-h-screen py-24 md:py-32 px-6 relative overflow-hidden">
      <style>{contactStyles}</style>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="orb-1 pointer-events-none" />
      <div className="orb-2 pointer-events-none" />
      <div className="orb-3 pointer-events-none" />

      {/* Mouse Follower Glow */}
      <div 
        className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08), transparent 70%)',
          filter: 'blur(60px)'
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
             <div className="w-16 h-[2px] bg-gradient-to-r from-fuchsia-500 to-transparent shadow-[0_0_15px_#f02aa2]" />
             <span className="font-mono text-[10px] text-fuchsia-400 tracking-[0.5em] uppercase font-bold label-glow">
               Communication_Link
             </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-black font-orbitron uppercase tracking-tighter leading-[0.9] mb-4">
            ESTABLISH
          </h2>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-black font-orbitron uppercase tracking-tighter leading-[0.9] italic connection-text">
            CONNECTION
          </h2>
          
          <p className="text-gray-400 font-mono text-sm mt-8 max-w-2xl leading-relaxed">
            Ready to build something extraordinary? Let's transform your vision into reality.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Form Terminal */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="group input-wrapper">
                  <label className="input-label block font-mono text-[11px] text-cyan-400 uppercase tracking-wider mb-4 font-bold label-glow">
                    Sender_Identity
                  </label>
                  <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    className="terminal-input w-full p-5 font-mono text-sm tracking-wide rounded-xl"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                    <div className="input-corner top-left" />
                    <div className="input-corner top-right" />
                    <div className="input-corner bottom-left" />
                    <div className="input-corner bottom-right" />
                  </div>
                </div>
                <div className="group input-wrapper">
                  <label className="input-label block font-mono text-[11px] text-cyan-400 uppercase tracking-wider mb-4 font-bold label-glow">
                    Response_Address
                  </label>
                  <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="terminal-input w-full p-5 font-mono text-sm tracking-wide rounded-xl"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                    <div className="input-corner top-left" />
                    <div className="input-corner top-right" />
                    <div className="input-corner bottom-left" />
                    <div className="input-corner bottom-right" />
                  </div>
                </div>
              </div>

              <div className="input-wrapper">
                <label className="input-label block font-mono text-[11px] text-cyan-400 uppercase tracking-wider mb-4 font-bold label-glow">
                  Transmission_Details
                </label>
                <div className="relative">
                <textarea 
                  rows="6"
                  placeholder="Describe your project scope, goals, and timeline..."
                  className="terminal-input w-full p-5 font-mono text-sm tracking-wide rounded-xl resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                />
                  <div className="input-corner top-left" />
                  <div className="input-corner top-right" />
                  <div className="input-corner bottom-left" />
                  <div className="input-corner bottom-right" />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleSubmit}
                  className="transmit-btn w-full md:w-auto px-12 py-5 font-orbitron uppercase tracking-wider text-sm rounded-xl relative"
                >
                  <div className="btn-corner top-left" />
                  <div className="btn-corner top-right" />
                  <div className="btn-corner bottom-left" />
                  <div className="btn-corner bottom-right" />
                  <span>Initialize Transmission →</span>
                </button>
              </div>
            </div>

            {/* Quick Contact Pills */}
            <div className="mt-12 flex flex-wrap gap-4">
              <div className="contact-card px-6 py-3 rounded-full relative">
                <div className="corner-accent top-left" />
                <div className="corner-accent top-right" />
                <div className="corner-accent bottom-left" />
                <div className="corner-accent bottom-right" />
                <div className="scan-line" />
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
                <div className="flex items-center gap-3 font-mono text-xs text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer relative z-10">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  hello@scriptstyle.com
                </div>
              </div>
              <div className="contact-card px-6 py-3 rounded-full relative">
                <div className="corner-accent top-left" />
                <div className="corner-accent top-right" />
                <div className="corner-accent bottom-left" />
                <div className="corner-accent bottom-right" />
                <div className="scan-line" />
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
                <div className="flex items-center gap-3 font-mono text-xs text-gray-400 hover:text-fuchsia-400 transition-colors cursor-pointer relative z-10">
                  <span className="w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse" />
                  +91 [Secured]
                </div>
              </div>
            </div>
          </div>

          {/* Side HUD Panel */}
          <div className="lg:col-span-5">
            <div className="floating-hud p-8 md:p-10 space-y-10 rounded-3xl sticky top-8">
              <div className="hud-corner top-left" />
              <div className="hud-corner top-right" />
              <div className="hud-corner bottom-left" />
              <div className="hud-corner bottom-right" />
              
              {/* Status Indicator */}
              <div className="flex items-center justify-between pb-8 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse status-dot" />
                  <span className="font-mono text-[11px] text-green-400 tracking-wider uppercase font-bold">
                    System Online
                  </span>
                </div>
                <div className="font-mono text-[10px] text-gray-600 uppercase tracking-wider">
                  24/7
                </div>
              </div>

              {/* Operating Hours */}
              <div>
                <h4 className="font-orbitron font-black text-sm text-cyan-400 tracking-wider mb-6 uppercase">
                  Operating Hours
                </h4>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between items-center p-4 contact-card rounded-xl relative">
                    <div className="corner-accent top-left" />
                    <div className="corner-accent top-right" />
                    <div className="corner-accent bottom-left" />
                    <div className="corner-accent bottom-right" />
                    <div className="scan-line" />
                    <div className="particle" />
                    <div className="particle" />
                    <div className="particle" />
                    <span className="text-gray-500 text-xs uppercase tracking-wider relative z-10">Mon - Fri</span>
                    <span className="text-white font-bold relative z-10">09:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between items-center p-4 contact-card rounded-xl relative">
                    <div className="corner-accent top-left" />
                    <div className="corner-accent top-right" />
                    <div className="corner-accent bottom-left" />
                    <div className="corner-accent bottom-right" />
                    <div className="scan-line" />
                    <div className="particle" />
                    <div className="particle" />
                    <div className="particle" />
                    <span className="text-gray-500 text-xs uppercase tracking-wider relative z-10">Saturday</span>
                    <span className="text-white font-bold relative z-10">11:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between items-center p-4 contact-card rounded-xl relative">
                    <div className="corner-accent top-left" />
                    <div className="corner-accent top-right" />
                    <div className="corner-accent bottom-left" />
                    <div className="corner-accent bottom-right" />
                    <div className="scan-line" />
                    <div className="particle" />
                    <div className="particle" />
                    <div className="particle" />
                    <span className="text-gray-500 text-xs uppercase tracking-wider relative z-10">Sunday</span>
                    <span className="text-gray-600 font-bold relative z-10">Offline</span>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 border border-cyan-500/20 rounded-2xl backdrop-blur-sm contact-card relative group">
                <div className="corner-accent top-left" />
                <div className="corner-accent top-right" />
                <div className="corner-accent bottom-left" />
                <div className="corner-accent bottom-right" />
                <div className="scan-line" />
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="text-3xl group-hover:animate-pulse">⚡</div>
                  <div>
                    <h5 className="font-orbitron font-bold text-sm text-white mb-2 uppercase">
                      Fast Response
                    </h5>
                    <p className="font-mono text-[11px] text-gray-400 leading-relaxed">
                      Average response time: <span className="text-cyan-400 font-bold">4-6 hours</span>. 
                      All communications encrypted with SSL-256 protocol.
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="p-6 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl contact-card relative group">
                <div className="corner-accent top-left" />
                <div className="corner-accent top-right" />
                <div className="corner-accent bottom-left" />
                <div className="corner-accent bottom-right" />
                <div className="scan-line" />
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <svg className="w-5 h-5 text-green-400 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-orbitron font-bold text-xs text-green-400 uppercase tracking-wider">
                    Secure Connection
                  </span>
                </div>
                <p className="font-mono text-[10px] text-gray-500 leading-relaxed relative z-10">
                  Your data is protected. We never share information with third parties.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Social Links */}
        <div className="mt-24 md:mt-32 text-center">
          <p className="font-mono text-xs text-gray-600 uppercase tracking-wider mb-6">
            Connect on Social
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((social) => (
              <div
                key={social}
                className="contact-card px-6 py-3 rounded-full font-mono text-xs text-gray-400 hover:text-cyan-400 hover:border-cyan-400 transition-all cursor-pointer relative"
              >
                <div className="corner-accent top-left" />
                <div className="corner-accent top-right" />
                <div className="corner-accent bottom-left" />
                <div className="corner-accent bottom-right" />
                <div className="scan-line" />
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
                <span className="relative z-10">{social}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corner Accent Text */}
      <div className="absolute bottom-8 right-8 font-mono text-[6vw] md:text-[4vw] font-black text-white/[0.02] pointer-events-none select-none tracking-tighter">
        CONNECT_
      </div>
    </section>
  );
};

export default Contact;