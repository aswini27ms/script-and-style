import React from 'react';

const pricingStyles = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
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

  .pricing-card {
    position: relative;
    background: linear-gradient(145deg, rgba(15, 15, 20, 0.95), rgba(10, 10, 15, 0.98));
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    overflow: hidden;
    backdrop-filter: blur(20px);
  }

  .pricing-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent);
    transition: left 0.6s;
  }

  .pricing-card:hover::before {
    left: 100%;
  }

  /* Premium Glow Effect */
  .pricing-glow {
    position: absolute;
    inset: -3px;
    background: linear-gradient(145deg, var(--glow-color), transparent, var(--glow-color));
    z-index: -1;
    opacity: 0;
    filter: blur(40px);
    transition: opacity 0.6s ease;
  }

  .pricing-card:hover .pricing-glow {
    opacity: 0.4;
  }

  .pricing-card:hover {
    transform: translateY(-12px) scale(1.02);
    border-color: var(--glow-color);
    box-shadow: 
      0 30px 60px -12px rgba(0, 0, 0, 0.5),
      0 0 60px -10px var(--glow-color),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  /* Featured Card Special Treatment */
  .featured-card {
    background: linear-gradient(145deg, rgba(20, 20, 30, 0.95), rgba(15, 15, 25, 0.98));
    border: 2px solid rgba(240, 42, 162, 0.3);
    transform: scale(1.05);
  }

  .featured-badge {
    position: absolute;
    top: 20px;
    right: -35px;
    background: linear-gradient(135deg, #f02aa2, #ff6b9d);
    color: white;
    padding: 8px 50px;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.15em;
    transform: rotate(45deg);
    box-shadow: 0 4px 15px rgba(240, 42, 162, 0.4);
  }

  .price-text {
    background: linear-gradient(135deg, var(--glow-color), white);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 20px var(--glow-color));
  }

  .feature-item {
    transition: all 0.3s ease;
    padding-left: 0;
  }

  .feature-item:hover {
    padding-left: 8px;
    color: white;
  }

  .check-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--glow-color);
    color: black;
    font-size: 11px;
    font-weight: 900;
    flex-shrink: 0;
  }

  .cta-button {
    position: relative;
    overflow: hidden;
    transition: 
      background-color 0.4s ease,
      color 0.4s ease,
      transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
      box-shadow 0.4s ease;
    background: transparent;
  }

  .cta-button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--glow-color);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
  }

  .cta-button span {
    position: relative;
    z-index: 1;
    transition: color 0.4s ease;
  }

  .cta-button:hover::before {
    opacity: 1;
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px -8px var(--glow-color);
    color: black;
    background: var(--glow-color);
  }

  .cta-button:hover span {
    color: black;
  }


  /* Table Styling */
  .cyber-table tr {
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    transition: all 0.3s;
  }
  
  .cyber-table tr:hover {
    background: rgba(34, 211, 238, 0.05);
    transform: translateX(4px);
  }

  .trust-pill {
    background: rgba(255, 0, 0, 0.05);
    border: 1px solid rgba(255, 0, 0, 0.2);
    color: #ff4444;
    transition: all 0.3s;
  }

  .trust-pill:hover {
    background: rgba(255, 0, 0, 0.1);
    border-color: rgba(255, 0, 0, 0.4);
  }

  /* Decorative Elements */
  .corner-accent {
    position: absolute;
    width: 40px;
    height: 40px;
    border: 2px solid var(--glow-color);
    opacity: 0.3;
    transition: all 0.4s;
  }

  .corner-top-left { top: 0; left: 0; border-right: none; border-bottom: none; }
  .corner-bottom-right { bottom: 0; right: 0; border-left: none; border-top: none; }

  .pricing-card:hover .corner-accent {
    opacity: 0.8;
    width: 50px;
    height: 50px;
  }
      /* --- REAL TALK EFFECT --- */
  .real-talk-card {
    position: relative;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .real-talk-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      transparent 20%,
      rgba(255, 255, 255, 0.06),
      transparent 80%
    );
    transform: translateX(-100%);
    transition: transform 0.8s ease;
  }

  .real-talk-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      to bottom,
      rgba(255,255,255,0.04) 0px,
      rgba(255,255,255,0.04) 1px,
      transparent 2px,
      transparent 6px
    );
    opacity: 0.15;
    pointer-events: none;
  }

  .real-talk-card:hover::before {
    transform: translateX(100%);
  }

  .real-talk-card:hover {
    transform: perspective(800px) rotateX(3deg) translateY(-6px);
    border-color: rgba(34, 211, 238, 0.4);
    box-shadow:
      0 30px 60px -20px rgba(0,0,0,0.6),
      0 0 40px -10px rgba(34, 211, 238, 0.4);
  }

  .real-talk-text {
    transition: color 0.4s ease, text-shadow 0.4s ease;
  }

  .real-talk-card:hover .real-talk-text {
    color: #ffffff;
    text-shadow: 0 0 18px rgba(34, 211, 238, 0.35);
  }

  .real-talk-highlight {
    color: #22d3ee;
    font-weight: 700;
  }

`;

const PricingCard = ({ title, price, subtitle, features, color, label, bonus, featured }) => (
  <div 
    className={`pricing-card p-10 md:p-12 flex flex-col h-full rounded-2xl ${featured ? 'featured-card' : ''}`} 
    style={{ '--glow-color': color }}
  >
    <div className="pricing-glow" />
    <div className="corner-accent corner-top-left" />
    <div className="corner-accent corner-bottom-right" />
    
    {featured && <div className="featured-badge">POPULAR</div>}
    
    <div className="flex justify-between items-start mb-6">
      <span className="font-mono text-[9px] tracking-[0.3em] text-gray-500 uppercase font-bold">
        {label}
      </span>
      <div 
        className="w-2.5 h-2.5 rounded-full animate-pulse" 
        style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }} 
      />
    </div>

    <h3 className="text-3xl md:text-4xl font-black font-orbitron text-white mb-3 uppercase tracking-tight">
      {title}
    </h3>
    <p className="font-mono text-[11px] text-gray-500 mb-8 uppercase tracking-wide">
      {subtitle}
    </p>

    <div className="mb-12">
      <div className="flex items-baseline gap-2">
        <span className="text-5xl md:text-6xl font-black font-orbitron price-text">
          {price}
        </span>
        {price !== "Custom" && (
          <span className="text-gray-600 font-mono text-xs uppercase tracking-wider">
            Fixed
          </span>
        )}
      </div>
    </div>

    <ul className="space-y-5 mb-12 flex-grow">
      {features.map((f, i) => (
        <li 
          key={i} 
          className="flex items-start gap-3 font-mono text-sm text-gray-400 feature-item"
        >
          <span className="check-icon">✓</span>
          <span className="leading-relaxed">{f}</span>
        </li>
      ))}
      {bonus && (
        <li className="pt-6 mt-6 border-t border-white/10 flex items-start gap-3">
          <span className="text-lg">🎁</span>
          <span className="font-mono text-xs text-fuchsia-400 leading-relaxed tracking-tight">
            <strong>BONUS:</strong> {bonus}
          </span>
        </li>
      )}
    </ul>

    <button 
      className="cta-button w-full py-4 px-6 font-orbitron font-black uppercase tracking-wider border-2 rounded-lg transition-all duration-300"
      style={{ borderColor: color, color: color }}
    >
      <span>Get Started</span>
    </button>
  </div>
);

const Pricing = () => {
  return (
    <section className="bg-black text-white py-24 md:py-32 relative overflow-hidden">
      <style>{pricingStyles}</style>

      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-20 md:mb-32 text-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-orbitron uppercase tracking-tighter leading-none mb-6">
            PRICING{' '}
            <span className="italic connection-text">
              STRUCTURE
            </span>
          </h2>
          <p className="text-gray-400 font-mono text-sm md:text-base max-w-2xl mx-auto mt-8 leading-relaxed">
            Fixed pricing. No hourly rates. No surprises. Just pure execution.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-32 md:mb-40 max-w-7xl mx-auto">
          <PricingCard 
            title="Starter" 
            label="Launch"
            price="₹25k" 
            subtitle="Personal Brands & Portfolios"
            color="#22d3ee"
            features={[
              "Up to 5 custom pages",
              "Modern UI with dark mode",
              "Smooth micro-animations",
              "SEO optimization",
              "Responsive design",
              "Contact form integration"
            ]}
          />
          <PricingCard 
            title="Growth" 
            label="Scale"
            price="₹75k" 
            subtitle="Startups & Businesses"
            color="#f02aa2"
            featured={true}
            features={[
              "Custom UI/UX design",
              "Next.js or React build",
              "Performance optimized",
              "Advanced animations",
              "API integrations",
              "CMS setup (optional)"
            ]}
            bonus="1 Month Free Support"
          />
          <PricingCard 
            title="Enterprise" 
            label="Impact"
            price="Custom" 
            subtitle="SaaS & Complex Products"
            color="#a78bfa"
            features={[
              "Product architecture",
              "Full-stack development",
              "Scalable infrastructure",
              "Auth & dashboards",
              "Cloud deployment",
              "Ongoing maintenance"
            ]}
            bonus="Tech Strategy Consultation"
          />
        </div>

        {/* Add-ons & Trust Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-7xl mx-auto">
          {/* Add-ons Table */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-8 md:p-10 rounded-2xl border border-white/5 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-orbitron font-black uppercase mb-8 text-cyan-400">
              Add-On Modules
            </h3>
            <table className="w-full cyber-table font-mono text-sm">
              <thead>
                <tr className="text-left text-gray-600 uppercase text-[10px] tracking-widest">
                  <th className="pb-6 font-bold">Service</th>
                  <th className="pb-6 text-right font-bold">Investment</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Extra Pages", "₹2,000/page"],
                  ["Advanced Animations", "₹5,000+"],
                  ["Admin Dashboard", "₹10,000+"],
                  ["API Integrations", "₹5,000+"],
                  ["Monthly Maintenance", "₹3,000/mo"],
                  ["UI Redesign", "₹15,000+"],
                ].map(([service, price], i) => (
                  <tr key={i}>
                    <td className="py-5 text-gray-300">{service}</td>
                    <td className="py-5 text-right text-cyan-400 font-semibold">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Trust & Values */}
          <div className="space-y-10">
          <div className="real-talk-card bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-8 md:p-10 rounded-2xl border border-dashed border-white/10 backdrop-blur-sm">

               <h3 className="text-2xl font-orbitron font-black uppercase mb-4">
                 Real Talk
               </h3>
               <p className="real-talk-text font-mono text-gray-400 text-sm leading-relaxed">
  If your project doesn’t fit a box — <span className="real-talk-highlight">perfect</span>.  
  Neither do our solutions. Custom pricing for <span className="real-talk-highlight">MVPs</span>,  
  <span className="real-talk-highlight">SaaS platforms</span>, and complex architectures that  
  demand <span className="real-talk-highlight">strategic thinking</span> beyond templates.
</p>

               <div className="flex gap-3 mt-6">
                  <div className="h-1 flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent rounded" />
                  <div className="h-1 flex-1 bg-gradient-to-r from-fuchsia-500/30 to-transparent rounded" />
               </div>
            </div>

            <div className="space-y-6">
               <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-400 font-black">
                 Zero Bloat Guarantee
               </h4>
               <div className="grid grid-cols-2 gap-3">
                  {[
                    "No Templates", 
                    "No Bloated Code", 
                    "No Missed Deadlines", 
                    "No Empty Promises"
                  ].map((text, i) => (
                    <div key={i} className="trust-pill px-4 py-3 rounded-lg font-mono text-[10px] uppercase tracking-tight text-center">
                      ❌ {text}
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 md:mt-40 text-center">
            <h3 className="text-3xl md:text-4xl font-orbitron font-black uppercase mb-10">
              Ready to Build?
            </h3>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6">
               <button className="px-10 md:px-12 py-4 md:py-5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-black font-orbitron uppercase tracking-wider hover:shadow-[0_0_60px_rgba(34,211,238,0.5)] transition-all rounded-lg">
                  Get a Quote
               </button>
               <button className="px-10 md:px-12 py-4 md:py-5 border-2 border-white text-white font-black font-orbitron uppercase tracking-wider hover:bg-white hover:text-black transition-all rounded-lg">
                  Book Strategy Call
               </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;