import React from 'react';

const pricingStyles = `
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

  .pricing-card {
    position: relative;
    background: linear-gradient(145deg, rgba(15, 15, 20, 0.95), rgba(10, 10, 15, 0.98));
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.4s ease;
    overflow: hidden;
    backdrop-filter: blur(20px);
  }

  .pricing-card::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: var(--glow-color);
    z-index: -1;
    opacity: 0;
    filter: blur(30px);
    transition: opacity 0.4s;
  }

  .pricing-card:hover::before {
    opacity: 0.3;
  }

  .pricing-card:hover {
    transform: translateY(-8px);
    border-color: var(--glow-color);
    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.5);
  }

  @media (min-width: 768px) {
    .pricing-card:hover {
      box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5);
    }
  }

  .featured-card {
    background: linear-gradient(145deg, rgba(20, 20, 30, 0.95), rgba(15, 15, 25, 0.98));
    border: 2px solid rgba(240, 42, 162, 0.3);
  }

  @media (min-width: 768px) {
    .featured-card {
      transform: scale(1.05);
    }
  }

  .featured-badge {
    position: absolute;
    top: 20px;
    right: -35px;
    background: linear-gradient(135deg, #f02aa2, #ff6b9d);
    color: white;
    padding: 6px 40px;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.15em;
    transform: rotate(45deg);
    box-shadow: 0 4px 15px rgba(240, 42, 162, 0.4);
  }

  .cta-button {
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
  }

  .cta-button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--glow-color);
    opacity: 0;
    transition: opacity 0.4s;
    z-index: 0;
  }

  .cta-button span {
    position: relative;
    z-index: 1;
  }

  .cta-button:hover::before {
    opacity: 1;
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px -8px var(--glow-color);
    color: black;
  }
`;

const PricingCard = ({ title, price, subtitle, features, color, label, bonus, featured }) => (
  <div
    className={`pricing-card p-8 md:p-10 lg:p-12 flex flex-col h-full rounded-2xl ${
      featured ? 'featured-card' : ''
    }`}
    style={{ '--glow-color': color }}
  >
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

    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black font-orbitron text-white mb-3 uppercase tracking-tight">
      {title}
    </h3>
    <p className="font-mono text-[11px] text-gray-500 mb-6 md:mb-8 uppercase tracking-wide">
      {subtitle}
    </p>

    <div className="mb-8 md:mb-12">
      <div className="flex items-baseline gap-2">
        <span
          className="text-4xl md:text-5xl lg:text-6xl font-black font-orbitron"
          style={{ color: color }}
        >
          {price}
        </span>
        {price !== 'Custom' && (
          <span className="text-gray-600 font-mono text-xs uppercase tracking-wider">Fixed</span>
        )}
      </div>
    </div>

    <ul className="space-y-4 md:space-y-5 mb-8 md:mb-12 flex-grow">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 font-mono text-sm text-gray-400">
          <span
            className="inline-flex items-center justify-center w-5 h-5 rounded-full font-black text-[11px] flex-shrink-0"
            style={{ backgroundColor: color, color: 'black' }}
          >
            ✓
          </span>
          <span className="leading-relaxed">{f}</span>
        </li>
      ))}
      {bonus && (
        <li className="pt-4 md:pt-6 mt-4 md:mt-6 border-t border-white/10 flex items-start gap-3">
          <span className="text-lg">🎁</span>
          <span className="font-mono text-xs leading-relaxed tracking-tight" style={{ color: color }}>
            <strong>BONUS:</strong> {bonus}
          </span>
        </li>
      )}
    </ul>

    <button
      className="cta-button w-full py-3 md:py-4 px-6 font-orbitron font-black uppercase tracking-wider text-xs md:text-sm border-2 rounded-lg"
      style={{ borderColor: color, color: color }}
    >
      <span>GET STARTED</span>
    </button>
  </div>
);

const Pricing = () => {
  return (
    <section className="bg-black text-white py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <style>{pricingStyles}</style>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto mb-16 md:mb-24 lg:mb-32 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-orbitron uppercase tracking-tighter leading-none mb-6">
            PRICING{' '}
            <span className="italic connection-text block mt-2">STRUCTURE</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm md:text-base max-w-2xl mx-auto mt-8 leading-relaxed">
            Fixed pricing. No hourly rates. No surprises. Just pure execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-32 lg:mb-40 max-w-7xl mx-auto">
          <PricingCard
            title="Starter"
            label="Launch"
            price="₹25k"
            subtitle="Personal Brands & Portfolios"
            color="#22d3ee"
            features={[
              'Up to 5 custom pages',
              'Modern UI with dark mode',
              'Smooth micro-animations',
              'SEO optimization',
              'Responsive design',
              'Contact form integration'
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
              'Custom UI/UX design',
              'Next.js or React build',
              'Performance optimized',
              'Advanced animations',
              'API integrations',
              'CMS setup (optional)'
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
              'Product architecture',
              'Full-stack development',
              'Scalable infrastructure',
              'Auth & dashboards',
              'Cloud deployment',
              'Ongoing maintenance'
            ]}
            bonus="Tech Strategy Consultation"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-7xl mx-auto mb-20 md:mb-32 lg:mb-40">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-6 md:p-8 lg:p-10 rounded-2xl border border-white/5 backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-orbitron font-black uppercase mb-6 md:mb-8 text-cyan-400">
              Add-On Modules
            </h3>
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="text-left text-gray-600 uppercase text-[10px] tracking-widest">
                  <th className="pb-4 md:pb-6 font-bold">Service</th>
                  <th className="pb-4 md:pb-6 text-right font-bold">Investment</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Extra Pages', '₹2,000/page'],
                  ['Advanced Animations', '₹5,000+'],
                  ['Admin Dashboard', '₹10,000+'],
                  ['API Integrations', '₹5,000+'],
                  ['Monthly Maintenance', '₹3,000/mo'],
                  ['UI Redesign', '₹15,000+']
                ].map(([service, price], i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4 md:py-5 text-gray-300">{service}</td>
                    <td className="py-4 md:py-5 text-right text-cyan-400 font-semibold">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-8 md:space-y-10">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-6 md:p-8 lg:p-10 rounded-2xl border border-dashed border-white/10 backdrop-blur-sm">
              <h3 className="text-xl md:text-2xl font-orbitron font-black uppercase mb-4">Real Talk</h3>
              <p className="font-mono text-gray-400 text-sm leading-relaxed">
                If your project doesn't fit a box —{' '}
                <span className="text-cyan-400 font-bold">perfect</span>. Neither do our solutions.
                Custom pricing for <span className="text-cyan-400 font-bold">MVPs</span>,{' '}
                <span className="text-cyan-400 font-bold">SaaS platforms</span>, and complex
                architectures that demand{' '}
                <span className="text-cyan-400 font-bold">strategic thinking</span> beyond templates.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-400 font-black">
                Zero Bloat Guarantee
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {['No Templates', 'No Bloated Code', 'No Missed Deadlines', 'No Empty Promises'].map(
                  (text, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 bg-red-500/5 border border-red-500/20 rounded-lg font-mono text-[10px] uppercase tracking-tight text-center text-red-400"
                    >
                      ✕ {text}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-orbitron font-black uppercase mb-8 md:mb-10">
            Ready to Build?
          </h3>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6">
            <a
              href="mailto:hello@scriptstyle.com"
              className="px-8 md:px-10 lg:px-12 py-4 md:py-5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-black font-orbitron uppercase tracking-wider text-xs md:text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              GET A QUOTE
            </a>
            <button className="px-8 md:px-10 lg:px-12 py-4 md:py-5 border-2 border-white text-white font-black font-orbitron uppercase tracking-wider text-xs md:text-sm hover:bg-white hover:text-black transition-all">
              BOOK STRATEGY CALL
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
