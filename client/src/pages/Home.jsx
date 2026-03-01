import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, Activity, FileText, BarChart4 } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.015, y: -4 }}
        className="group relative bg-[#0a0a0a] rounded-[24px] p-8 sm:p-10 hover:bg-[#111111] transition-all duration-300 shadow-2xl shadow-black/50 overflow-hidden"
    >
        {/* Animated Gradient Border using pseudo-element technique */}
        <div className="absolute inset-0 rounded-[24px] border border-white/[0.04] group-hover:border-transparent transition-colors duration-300 pointer-events-none" />
        <div className="absolute inset-[-1px] rounded-[25px] bg-gradient-to-br from-white/[0.1] to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none" />
        <div className="absolute inset-0 rounded-[24px] bg-[#0a0a0a] group-hover:bg-[#111111] transition-colors duration-300 -z-0 pointer-events-none" />

        {/* Soft Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px] pointer-events-none z-0" />
        
        <div className="relative z-10 flex flex-col h-full">
            <div className="w-14 h-14 bg-white/[0.02] border border-white/[0.05] rounded-[16px] flex items-center justify-center mb-8 overflow-hidden group-hover:border-brand/30 group-hover:bg-brand/5 group-hover:shadow-[0_0_20px_rgba(107,190,182,0.15)] transition-all duration-300">
                <Icon className="w-6 h-6 text-neutral-400 group-hover:text-brand-light transition-colors duration-300 relative z-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-neutral-100 mb-3 tracking-tight group-hover:text-brand-light transition-colors duration-300">{title}</h3>
            <p className="text-neutral-500 font-normal text-[15px] leading-[1.6] flex-grow group-hover:text-neutral-400 transition-colors duration-300">
                {description}
            </p>
        </div>
    </motion.div>
);

const Home = () => {
    return (
        <div className="flex flex-col items-center overflow-x-hidden min-h-screen bg-black text-neutral-50 pb-32">
            
            {/* Extremely Subtle Background Gradient - Apple style */}
            <div className="fixed inset-0 pointer-events-none z-0 flex justify-center items-start pt-[10vh]">
                <div className="w-[1000px] h-[500px] bg-gradient-to-b from-brand-dark/20 to-transparent blur-[120px] rounded-[100%] opacity-50 mix-blend-screen" />
            </div>

            {/* Hero Section */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[95vh] text-center px-6 w-full pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto flex flex-col items-center"
                >
                    {/* Top Pill / Badge */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center justify-center gap-2 mb-10 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl text-xs font-semibold tracking-wide text-neutral-400 hover:bg-brand/10 hover:border-brand/30 hover:shadow-[0_0_15px_rgba(107,190,182,0.15)] transition-all duration-300 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        tabIndex={0}
                    >
                        <Sparkles className="w-3.5 h-3.5 text-neutral-400 group-hover:text-brand transition-colors duration-300" />
                        <span className="group-hover:text-brand-light transition-colors duration-300">Introducing the new Engine</span>
                    </motion.div>
                    
                    {/* Typography - Apple-esque */}
                    <h1 className="text-[3.5rem] sm:text-[5.5rem] lg:text-[7rem] font-medium tracking-[-0.03em] mb-8 leading-[1.05] text-white">
                        Risk analysis. <br className="hidden sm:block" />
                        <span className="text-neutral-500">
                            Reimagined.
                        </span>
                    </h1>
                    
                    <p className="text-neutral-400 text-[1.1rem] sm:text-[1.3rem] font-normal max-w-2xl mx-auto mb-14 leading-[1.6] tracking-tight">
                        Evaluate creditworthiness with absolute precision. Advanced machine learning models, beautifully designed for modern financial teams.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-2">
                        <Link
                            to="/predict"
                            className="group relative flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-[#e6e6e6] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto shadow-[0_4px_14px_0_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            <span className="relative z-10 flex items-center gap-2 text-[15px]">
                                Start Analysis
                            </span>
                            <div className="absolute inset-0 rounded-full border border-black/10 group-hover:border-black/20 transition-colors duration-300" />
                        </Link>
                        
                        <Link
                            to="/about"
                            className="flex items-center justify-center gap-2 bg-transparent text-white border border-white/[0.15] px-8 py-4 rounded-full font-medium hover:bg-white/[0.05] hover:border-white/[0.3] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black text-[15px]"
                        >
                            Learn more
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <motion.div 
                        initial={{ opacity: 0, filter: "blur(5px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                        className="mt-24 w-full max-w-2xl"
                    >
                        <p className="text-[11px] text-neutral-500 uppercase tracking-[0.2em] font-semibold mb-8">Powered by Industry Standards</p>
                        <div className="flex items-center justify-center gap-10 sm:gap-16 opacity-40 mix-blend-luminosity hover:opacity-70 transition-opacity duration-500">
                            <div className="text-xl font-bold tracking-tight">scikit-learn</div>
                            <div className="text-xl font-bold tracking-tight">pandas</div>
                            <div className="text-xl font-bold tracking-tight">flask</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Features Section */}
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 mt-16 sm:mt-32">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-6 text-white leading-tight">
                        Built for <span className="text-neutral-500">velocity.</span>
                    </h2>
                    <p className="text-neutral-400 font-normal text-lg sm:text-xl leading-[1.6] tracking-tight">
                        The performance of native machine learning, seamlessly integrated into an elegant workflow.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    <FeatureCard 
                        icon={Activity}
                        title="Sub-50ms Inference"
                        description="Optimized routing combined with serialized models deliver risk assessments instantly without any perceived latency."
                        delay={0.1}
                    />
                    <FeatureCard 
                        icon={ShieldCheck}
                        title="Fairness Calibrated"
                        description="Actively mitigates historical biases using advanced oversampling and strictly calibrated decision thresholds."
                        delay={0.2}
                    />
                    <FeatureCard 
                        icon={BarChart4}
                        title="Transparent Data"
                        description="Outputs exact probability percentages alongside categoric risks, providing complete contextual clarity for underwriting."
                        delay={0.3}
                    />
                </div>
            </div>

        </div>
    );
};

export default Home;
