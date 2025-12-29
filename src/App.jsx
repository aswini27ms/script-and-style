import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components-hero/Hero";
import About from "./components-about/About"; 
import Service from "./components-service/Service";
import Pricing from "./components-price/Pricing"; // New Import
import Contact from "./components-contact/Contact";
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
      
      <main className="min-h-screen bg-black text-white overflow-x-hidden pt-28">
        <Routes>
          {/* HOME PAGE ROUTE - Concentrated Brand Impact */}
          <Route 
            path="/" 
            element={<Hero />} 
          />

          {/* DEDICATED SERVICE PAGE - Full Capabilities */}
          <Route path="/services" element={<Service />} />

          {/* ABOUT PAGE ROUTE - The Collective Identity */}
          <Route path="/about" element={<About />} />

          {/* PRICING PAGE ROUTE - Scalable Tiers */}
          <Route path="/pricing" element={<Pricing />} />

          {/* CONTACT PAGE ROUTE - Placeholder */}
          <Route 
            path="/contact" 
            element={<Contact />} 
          />
        </Routes>
      </main>

      {/* Global HUD Decoration */}
      <div className="fixed bottom-4 left-4 z-50 pointer-events-none">
        <span className="text-[8px] font-mono text-cyan-500/40 vertical-text tracking-[1em]">
          SCRIPT_STYLE_SYSTEM_v4.0
        </span>
      </div>
    </Router>
  );
}

export default App;