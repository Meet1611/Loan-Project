import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ShieldAlert, CheckCircle2, ChevronDown, Activity, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HistoryCard = ({ record, index }) => {
    const [expanded, setExpanded] = useState(false);
    
    // Format date in a clean manner
    const dateObj = new Date(record.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { 
        month: 'short', day: 'numeric', year: 'numeric'
    });
    const formattedTime = dateObj.toLocaleTimeString('en-US', { 
        hour: '2-digit', minute: '2-digit' 
    });

    const isHighRisk = record.result.prediction === 1;
    const probability = (record.result.default_probability * 100).toFixed(1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setExpanded(!expanded)}
            className="group relative bg-[#0a0a0a]/80 backdrop-blur-3xl rounded-[24px] border border-white/[0.04] mb-4 overflow-hidden transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-[#0a0a0a] cursor-pointer"
        >
            {/* Subtle Gradient Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
            
            <div 
                className="p-6 cursor-pointer relative z-10"
                onClick={() => setExpanded(!expanded)}
            >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-start sm:items-center gap-5">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full shrink-0 ${isHighRisk ? 'bg-red-500/10 text-red-500 ring-1 ring-red-500/20' : 'bg-brand/10 text-brand ring-1 ring-brand/20'}`}>
                            {isHighRisk ? <ShieldAlert className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-1.5">
                                <h4 className="font-medium text-white text-[17px] tracking-tight">
                                    {isHighRisk ? 'High Risk Assessment' : 'Standard Approval'}
                                </h4>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${isHighRisk ? 'bg-red-500/10 text-red-400' : 'bg-brand/10 text-brand-light'}`}>
                                    {isHighRisk ? 'Flagged' : 'Cleared'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-[13px] text-neutral-500 font-medium">
                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {formattedDate}</span>
                                <span className="w-1 h-1 rounded-full bg-neutral-800" />
                                <span>{formattedTime}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Probability & Chevron */}
                    <div className="flex flex-row-reverse sm:flex-row items-center gap-6 justify-between sm:justify-end">
                        <motion.div 
                            animate={{ rotate: expanded ? 180 : 0 }} 
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors duration-200"
                        >
                            <ChevronDown className="w-4 h-4 text-neutral-400" />
                        </motion.div>

                        <div className="flex flex-col items-start sm:items-end">
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-medium tracking-tight text-white">{probability}</span>
                                <span className="text-sm text-neutral-500 font-medium">%</span>
                            </div>
                            <span className="text-[11px] uppercase tracking-[0.1em] text-neutral-500 font-semibold mt-0.5">Risk</span>
                        </div>
                    </div>
                </div>

                {/* Animated Risk Progress Bar */}
                <div className="mt-8 sm:ml-[68px]">
                    <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${probability}%` }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className={`h-full rounded-full ${isHighRisk ? 'bg-gradient-to-r from-red-500/50 to-red-400' : 'bg-gradient-to-r from-brand/50 to-brand-light'}`}
                        />
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden p-6 pt-0"
                    >
                        <div className="border-t border-white/[0.04] pt-6 sm:ml-[68px]">
                            <div className="flex items-center gap-2 mb-6 text-[11px] uppercase tracking-[0.15em] text-neutral-500 font-semibold">
                                <Activity className="w-3.5 h-3.5" />
                                <span>Analysis Breakdown</span>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
                                {[
                                    { label: 'Annual Income', value: `$${record.input.Income.toLocaleString()}` },
                                    { label: 'Loan Amount', value: `$${record.input.LoanAmount.toLocaleString()}` },
                                    { label: 'Credit Score', value: record.input.CreditScore },
                                    { label: 'DTI Ratio', value: record.input.DTIRatio },
                                    { label: 'Employment', value: record.input.EmploymentType },
                                    { label: 'Experience', value: `${record.input.MonthsEmployed} Mos` },
                                    { label: 'Education', value: record.input.Education },
                                    { label: 'Purpose', value: record.input.LoanPurpose }
                                ].map((item, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.05 + (idx * 0.02), duration: 0.2 }}
                                    >
                                        <div className="text-[13px] text-neutral-500 font-medium mb-1 tracking-tight">{item.label}</div>
                                        <div className="text-[15px] font-medium text-white tracking-tight">{item.value}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const History = () => {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('loanHistory') || '[]');
        setHistory(saved);
    }, []);

    return (
        <div className="flex flex-col items-center min-h-[70vh] px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-3xl relative z-10"
            >
                <div className="mb-14 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center justify-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.04] text-[12px] font-medium text-neutral-400">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Assessment Logs</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight mb-2 text-white">Analysis History</h1>
                        <p className="text-neutral-500 text-lg">Your previous loan assessments stored securely.</p>
                    </div>
                </div>

                {history.length > 0 ? (
                    <div className="flex flex-col gap-1.5">
                        {history.map((record, index) => (
                            <HistoryCard key={record.id} record={record} index={index} />
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-[#0a0a0a]/80 border border-white/[0.04] backdrop-blur-3xl rounded-[32px] p-16 text-center mt-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col items-center">
                            {/* Glowing Icon Container */}
                            <div className="relative mb-8">
                                <motion.div 
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-white/10 blur-2xl rounded-full"
                                />
                                <div className="w-24 h-24 bg-neutral-900/80 border border-neutral-800 shadow-[0_0_40px_rgba(255,255,255,0.05)] rounded-full flex gap-1 items-center justify-center mx-auto relative z-10 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] to-transparent opacity-50" />
                                    <Activity className="w-8 h-8 text-neutral-400 relative z-10" strokeWidth={1.5} />
                                </div>
                            </div>

                            <h3 className="text-[2rem] font-medium text-white mb-4 tracking-tight">No History Yet</h3>
                            <p className="text-neutral-500 text-[15px] font-medium max-w-sm mx-auto leading-relaxed mb-10 tracking-tight">
                                Once you run a prediction, the comprehensive analysis results will be securely logged here for your reference.
                            </p>

                            <button
                                onClick={() => navigate('/predict')}
                                className="group relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black shadow-[0_4px_14px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)]"
                            >
                                Run New Assessment <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default History;
