import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components-hero/Hero";
import About from "./components-about/About";
import Service from "./components-service/Service";
import Pricing from "./components-price/Pricing";
// Helper to reset scroll position on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      
      <main className="min-h-screen bg-black text-white overflow-x-hidden pt-20 md:pt-24">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/services" element={<Service />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </main>

      <Footer />

      {/* Global HUD Decoration - Desktop Only */}
      <div className="hidden lg:block fixed bottom-4 left-4 z-50 pointer-events-none">
        <span className="text-[8px] font-mono text-cyan-500/40 tracking-[1em]">
          SCRIPT_STYLE_v4.0
        </span>
      </div>
    </Router>
  );
}

export default App;