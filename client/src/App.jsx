import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Predict from './pages/Predict';
import History from './pages/History';
import About from './pages/About';

// A wrapper to handle exit animations on route changes
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-black text-neutral-50 font-sans selection:bg-neutral-800">
                <Navbar />
                
                {/* Global Background Effects */}
                <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[128px] rounded-full pointer-events-none" />
                <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-dark/20 blur-[128px] rounded-full pointer-events-none" />
                
                {/* Main Content Area (offset by navbar height) */}
                <main className="pt-16 pb-12 relative z-10">
                    <AnimatedRoutes />
                </main>
            </div>
        </Router>
    );
};

export default App;
