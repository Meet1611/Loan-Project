import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, BarChart4, Lock, Cpu, Database, Network } from 'lucide-react';

const FeatureCard = ({ icon, title, desc, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: delay, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-[#0a0a0a]/80 backdrop-blur-3xl rounded-[24px] border border-white/[0.04] p-8 sm:p-10 hover:bg-[#0a0a0a] transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col h-full"
        >
            {/* Subtle Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            {/* Icon Block */}
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-white/5 blur-xl rounded-full scale-150 group-hover:bg-white/10 transition-colors duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center relative z-10 shadow-inner group-hover:border-white/10 transition-colors duration-300">
                    <div className="text-neutral-400 group-hover:text-white transition-colors duration-300">
                        {icon}
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-medium text-white mb-3 tracking-tight relative z-10">{title}</h3>
            <p className="text-neutral-500 text-[15px] leading-relaxed relative z-10">{desc}</p>
        </motion.div>
    );
};

const About = () => {
    const features = [
        {
            icon: <Activity className="w-6 h-6" />,
            title: "Advanced ML Pipeline",
            desc: "Powered by Random Forest and XGBoost ensembles, intricately calibrated on thousands of historical financial records for maximum predictive yield."
        },
        {
            icon: <BarChart4 className="w-6 h-6" />,
            title: "Fairness Guaranteed",
            desc: "Our model actively addresses class imbalance through SMOTE and calibrated threshold tuning, ensuring unbiased evaluations."
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: "Absolute Privacy",
            desc: "Locally hosted inferencing guarantees that personal applicant data never leaves your secure network. Zero telemetry, absolute control."
        }
    ];

    const techStack = [
        { icon: <Cpu className="w-4 h-4" />, name: "Scikit-Learn Envelope" },
        { icon: <Database className="w-4 h-4" />, name: "Pandas Data Pipeline" },
        { icon: <Network className="w-4 h-4" />, name: "Flask REST API" }
    ];

    return (
        <div className="flex flex-col items-center min-h-screen px-4 pt-20 pb-24 relative overflow-hidden">
            {/* Deep Ambient Background */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#000000] z-[-5]" />
            <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_80%)] pointer-events-none z-[-4]" /> */}
            
            <motion.div 
                animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 0.95, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-[-3] match-blend-screen" 
            />
            
            <div className="w-full max-w-5xl mx-auto relative z-10">
                
                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center mb-24"
                >
                    <div className="inline-flex items-center justify-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.04] text-[13px] font-medium text-neutral-400 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                        SysOps Functional
                    </div>
                    
                    <h1 className="text-[3.5rem] sm:text-[5rem] font-medium tracking-tight mb-6 leading-[1.1] text-white">
                        Intelligence behind <br />
                        <span className="text-neutral-500">the evaluation.</span>
                    </h1>
                    
                    <p className="text-neutral-400 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
                        LoanRiskAI was engineered to eliminate the guesswork and latent biases traditionally embedded in manual lending processes.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {features.map((f, i) => (
                        <FeatureCard 
                            key={i} 
                            icon={f.icon} 
                            title={f.title} 
                            desc={f.desc} 
                            delay={0.1 * i} 
                        />
                    ))}
                </div>

                {/* Enterprise Architecture Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative bg-white/[0.02] backdrop-blur-3xl border border-white/[0.04] rounded-[32px] p-8 sm:p-16 text-center overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                >
                    {/* Architectural Mesh Background */}
                    <div className="absolute inset-0 opacity-[0.15]" 
                         style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`, backgroundSize: '24px 24px' }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center mb-8 shadow-inner relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-50" />
                            <ShieldCheck className="w-8 h-8 text-white relative z-10" strokeWidth={1.5} />
                        </div>
                        
                        <h2 className="text-[2.5rem] font-medium text-white mb-6 tracking-tight">Enterprise Architecture</h2>
                        <p className="text-neutral-400 text-[17px] font-medium max-w-3xl mx-auto leading-relaxed mb-12 tracking-tight">
                            Built on a strict Python/Flask microservice architecture communicating via REST APIs to a highly optimized React frontend, ensuring sub-50ms inference times across the stack.
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {techStack.map((tech, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + (i * 0.1), duration: 0.4 }}
                                    className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm font-medium text-neutral-300 backdrop-blur-md hover:bg-white/[0.08] transition-colors cursor-default"
                                >
                                    {tech.icon}
                                    <span>{tech.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
                
            </div>
        </div>
    );
};

export default About;
