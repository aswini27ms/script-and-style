import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-cyan-500/20">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="py-12 md:py-20 border-b border-white/5">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-orbitron uppercase tracking-tighter">
              READY TO BUILD
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                SOMETHING GREAT?
              </span>
            </h2>
            <p className="text-gray-400 font-mono text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Let's transform your vision into a scalable, high-performance digital product.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a
                href="mailto:hello@scriptstyle.com"
                className="w-full sm:w-auto px-8 md:px-12 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-orbitron font-black text-xs md:text-sm tracking-wider hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                GET IN TOUCH
              </a>
              <a
                href="#pricing"
                className="w-full sm:w-auto px-8 md:px-12 py-4 border-2 border-white text-white font-orbitron font-black text-xs md:text-sm tracking-wider hover:bg-white hover:text-black transition-all"
              >
                VIEW PRICING
              </a>
            </div>
          </div>
        </div>

        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-cyan-400 rotate-45 flex items-center justify-center">
                <div className="w-4 h-4 border border-pink-500 rotate-45" />
              </div>
              <span className="text-lg font-black font-orbitron">
                S<span className="text-cyan-400">&</span>S
              </span>
            </div>
            <p className="text-gray-500 text-sm font-mono leading-relaxed">
              Building digital products that are fast, reliable, and visually refined.
            </p>
          </div>

          <div>
            <h3 className="font-orbitron font-bold text-sm mb-4 text-cyan-400 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'About', path: '/about' },
                { label: 'Services', path: '/services' },
                { label: 'Pricing', path: '/pricing' }
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white text-sm font-mono transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-orbitron font-bold text-sm mb-4 text-cyan-400 uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-2 text-sm font-mono text-gray-400">
              <li>Full-Stack Development</li>
              <li>UI/UX Design</li>
              <li>Performance Optimization</li>
              <li>Cloud Deployment</li>
            </ul>
          </div>

          <div>
            <h3 className="font-orbitron font-bold text-sm mb-4 text-cyan-400 uppercase tracking-wider">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@scriptstyle.com"
                  className="text-gray-400 hover:text-cyan-400 text-sm font-mono transition-colors"
                >
                  hello@scriptstyle.com
                </a>
              </li>
              <li className="text-gray-400 text-sm font-mono">
                Available: Mon-Fri, 9AM-9PM
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 border border-gray-700 hover:border-cyan-400 flex items-center justify-center text-gray-600 hover:text-cyan-400 transition-colors text-xs"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600">
            <p>2025 Script & Style. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
