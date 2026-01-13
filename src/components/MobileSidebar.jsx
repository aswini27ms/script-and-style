import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Pricing', path: '/pricing' }
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-black border-l border-cyan-500/20 z-[120] transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-cyan-400 rotate-45 flex items-center justify-center">
                <div className="w-4 h-4 border border-pink-500 rotate-45" />
              </div>
              <span className="text-sm font-black font-orbitron text-white">
                S<span className="text-cyan-400">&</span>S
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`block px-4 py-4 font-orbitron text-sm font-bold tracking-wider transition-all ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-400/10 border-l-2 border-cyan-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10">
            <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-orbitron font-black text-xs tracking-wider hover:shadow-lg transition-all">
              GET IN TOUCH
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">
              v4.0_Mobile
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
