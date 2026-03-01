import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import {
    Activity,
    ArrowRight,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    Info,
    Loader2,
    ShieldAlert,
    Wallet
} from 'lucide-react';

import {
    Select as ShadcnSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// --- Premium Components ---

const Card = ({ children, className = "" }) => (
    <div className={`relative bg-[#0a0a0a]/80 backdrop-blur-3xl rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/[0.04] overflow-hidden transition-all duration-200 ${className}`}>
        {children}
    </div>
);

const Button = ({ children, onClick, className = "", variant = "primary", disabled = false }) => {
    const baseStyle = "relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black";
    
    const variants = {
        primary: "bg-white text-black hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-white/50 shadow-[0_4px_14px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)]",
        secondary: "bg-white/[0.08] text-white hover:bg-white/[0.12] hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-white/30",
        ghost: "text-neutral-400 hover:text-white hover:bg-white/[0.08] active:scale-[0.98] focus-visible:ring-white/30"
    };

    return (
        <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} disabled={disabled}>
            {children}
        </button>
    );
};

const Input = ({ label, name, type = "text", value, onChange, placeholder = "" }) => (
    <div className="flex flex-col gap-2 w-full group">
        <label className="text-[13px] font-medium text-neutral-500 group-focus-within:text-neutral-300 transition-colors duration-200 ml-1 tracking-tight">{label}</label>
        <div className="relative">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-white/[0.03] rounded-[16px] px-5 py-4 text-white placeholder:text-neutral-600 outline-none focus:bg-white/[0.06] focus:ring-1 focus:ring-white/20 transition-all duration-200 font-normal"
            />
        </div>
    </div>
);

const Select = ({ label, name, value, onChange, options }) => (
    <div className="flex flex-col gap-2 w-full group">
        <label className="text-[13px] font-medium text-neutral-500 group-focus-within:text-neutral-300 transition-colors duration-200 ml-1 tracking-tight">{label}</label>
        <ShadcnSelect value={value} onValueChange={(val) => onChange({ target: { name, value: val } })}>
            <SelectTrigger className="w-full h-auto bg-white/[0.03] border-none rounded-[16px] px-5 py-4 text-white hover:bg-white/[0.06] focus:bg-white/[0.06] focus:ring-1 focus:ring-white/20 transition-all duration-200 font-normal shadow-none data-[state=open]:ring-1 data-[state=open]:ring-white/20 outline-none">
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.08] text-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-2">
                {options.map((opt) => (
                    <SelectItem key={opt} value={opt} className="focus:bg-white/[0.08] focus:text-white rounded-[12px] py-3 pl-10 pr-4 transition-colors cursor-pointer outline-none text-[15px]">
                        {opt}
                    </SelectItem>
                ))}
            </SelectContent>
        </ShadcnSelect>
    </div>
);

// --- Main App Logic ---

const Predict = () => {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [formData, setFormData] = useState({
        Age: 45,
        Income: 75000,
        LoanAmount: 50000,
        CreditScore: 650,
        MonthsEmployed: 60,
        NumCreditLines: 2,
        InterestRate: 10.5,
        LoanTerm: 36,
        DTIRatio: 0.35,
        Education: "Master's",
        EmploymentType: "Full-time",
        MaritalStatus: "Married",
        HasMortgage: "Yes",
        HasDependents: "No",
        LoanPurpose: "Home",
        HasCoSigner: "Yes"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: isNaN(value) || value === "" || name === "Education" || name === "EmploymentType" || name === "MaritalStatus" || name === "HasMortgage" || name === "HasDependents" || name === "LoanPurpose" || name === "HasCoSigner"
                ? value
                : parseFloat(value)
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://loanriskai.onrender.com/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            
            // Artificial delay for UI smooth feeling (makes it feel like deep analysis)
            await new Promise(r => setTimeout(r, 800));
            
            setPrediction(data);
            
            // Save to localStorage for History page
            const existingHistory = JSON.parse(localStorage.getItem('loanHistory') || '[]');
            const newRecord = {
                id: Date.now(),
                date: new Date().toISOString(),
                input: formData,
                result: data
            };
            localStorage.setItem('loanHistory', JSON.stringify([newRecord, ...existingHistory].slice(0, 10)));
            
            setStep(3);
        } catch (error) {
            console.log("API Error:", error);
            console.log("Backend server is not running. Please start main.py!");
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { title: "Identity", icon: <Info className="w-4 h-4" /> },
        { title: "Financials", icon: <Wallet className="w-4 h-4" /> },
        { title: "Loan Terms", icon: <CreditCard className="w-4 h-4" /> }
    ];

    const isHighRisk = prediction?.prediction === 1;

    // Probability counter animation
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => latest.toFixed(1));

    useEffect(() => {
        if (step === 3 && prediction) {
            const prob = prediction.default_probability * 100;
            animate(count, prob, { duration: 1.5, ease: "easeOut", delay: 0.5 });
        } else {
            count.set(0);
        }
    }, [step, prediction, count]);

    const getInsight = (prob) => {
        if (prob > 70) return "High correlation with historic defaults.";
        if (prob > 50) return "Elevated risk factors detected across profile.";
        if (prob > 30) return "Moderate risk; review DTI and credit history.";
        if (prob > 15) return "Low risk profile with minor variances.";
        return "Optimal applicant scoring; safe to proceed.";
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-12 relative overflow-x-hidden w-full">
            {/* Subtle gradient overlay on background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none z-0" />
            
            {/* Subtle background glow anchoring the form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-800/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0" />

            {/* Header Area */}
            <motion.div
                initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[800px] mb-12 flex flex-col items-center text-center relative z-10"
            >
                <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/[0.03] border border-neutral-800/40 text-[13px] font-medium text-neutral-400 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Risk Analysis Engine</span>
                </div>
                <h1 className="text-[2.5rem] sm:text-[3.5rem] font-medium tracking-tight mb-4 leading-tight text-white">
                    Applicant <span className="text-neutral-500">Assessment</span>
                </h1>
            </motion.div>

            {/* Main Content Area */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[800px] relative z-10"
            >
                <AnimatePresence mode="wait">
                    {step < 3 ? (
                        <motion.div
                            key="form-step"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Card className="p-8 sm:p-12">
                                {/* Minimal Step Indicator */}
                                <div className="flex justify-center mb-12 relative w-full">
                                    <div className="absolute top-1/2 -translate-y-1/2 left-[12%] right-[12%] h-[2px] bg-white/[0.04] rounded-full z-0" />
                                    <div 
                                        className="absolute top-1/2 -translate-y-1/2 left-[12%] h-[2px] bg-white rounded-full z-0 transition-all duration-200 ease-out"
                                        style={{ width: `${(step / (steps.length - 1)) * 76}%` }}
                                    />
                                    
                                    <div className="flex justify-between w-[76%] z-10">
                                        {steps.map((s, i) => (
                                            <div key={i} className="flex flex-col items-center gap-3">
                                                <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-500 shadow-xl ${
                                                    step === i ? 'bg-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)] ring-4 ring-black' :
                                                    step > i ? 'bg-neutral-800 text-white ring-4 ring-black' : 'bg-[#0a0a0a] ring-1 ring-white/10 text-neutral-600 ring-4 ring-black'
                                                }`}>
                                                    {step > i ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                                                </div>
                                                <span className={`text-[13px] font-medium tracking-tight transition-colors duration-200 absolute top-12 whitespace-nowrap ${step === i ? 'text-white' : 'text-neutral-500'}`}>
                                                    {s.title}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Form Fields Grid (Apple 6px-8px spacing system via gap-6) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 min-h-[320px] mb-8 mt-16">
                                    {step === 0 && (
                                        <>
                                            <Input label="Age" name="Age" type="number" value={formData.Age} onChange={handleChange} />
                                            <Select label="Marital Status" name="MaritalStatus" value={formData.MaritalStatus} onChange={handleChange} options={["Married", "Single", "Divorced", "Widowed"]} />
                                            <Select label="Education" name="Education" value={formData.Education} onChange={handleChange} options={["Bachelor's", "Master's", "High School", "PhD"]} />
                                            <Select label="Employment" name="EmploymentType" value={formData.EmploymentType} onChange={handleChange} options={["Full-time", "Part-time", "Self-employed", "Unemployed"]} />
                                            <Input label="Months Employed" name="MonthsEmployed" type="number" value={formData.MonthsEmployed} onChange={handleChange} />
                                            <Select label="Dependents" name="HasDependents" value={formData.HasDependents} onChange={handleChange} options={["No", "Yes"]} />
                                        </>
                                    )}
                                    {step === 1 && (
                                        <>
                                            <Input label="Annual Income ($)" name="Income" type="number" value={formData.Income} onChange={handleChange} />
                                            <Input label="Credit Score" name="CreditScore" type="number" value={formData.CreditScore} onChange={handleChange} />
                                            <Input label="Credit Lines" name="NumCreditLines" type="number" value={formData.NumCreditLines} onChange={handleChange} />
                                            <Input label="DTI Ratio (0.0 - 1.0)" name="DTIRatio" type="number" value={formData.DTIRatio} onChange={handleChange} />
                                            <Select label="Has Mortgage" name="HasMortgage" value={formData.HasMortgage} onChange={handleChange} options={["No", "Yes"]} />
                                            <Select label="Has Co-Signer" name="HasCoSigner" value={formData.HasCoSigner} onChange={handleChange} options={["No", "Yes"]} />
                                        </>
                                    )}
                                    {step === 2 && (
                                        <>
                                            <Input label="Loan Amount ($)" name="LoanAmount" type="number" value={formData.LoanAmount} onChange={handleChange} />
                                            <Input label="Interest Rate (%)" name="InterestRate" type="number" value={formData.InterestRate} onChange={handleChange} />
                                            <Input label="Loan Term (Months)" name="LoanTerm" type="number" value={formData.LoanTerm} onChange={handleChange} />
                                            <Select label="Purpose" name="LoanPurpose" value={formData.LoanPurpose} onChange={handleChange} options={["Home", "Car", "Business", "Education", "Other"]} />
                                        </>
                                    )}
                                </div>

                                {/* Navigation Footer */}
                                <div className="flex items-center justify-between pt-8 border-t border-white/[0.04]">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setStep(s => Math.max(0, s - 1))}
                                        className={`px-2 sm:px-4 ${step === 0 ? "opacity-0 pointer-events-none" : ""}`}
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                                    </Button>
                                    
                                    <Button
                                        variant={step === 2 ? "primary" : "secondary"}
                                        onClick={step === 2 ? handleSubmit : () => setStep(s => s + 1)}
                                        disabled={loading}
                                        className="min-w-[160px]"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : step === 2 ? (
                                            <>Calculate Risk <ArrowRight className="w-4 h-4 ml-1" /></>
                                        ) : (
                                            <>Continue <ChevronRight className="w-4 h-4 ml-1" /></>
                                        )}
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result-step"
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Card className="p-0 overflow-hidden">
                                {/* Dynamic Intelligence Glow */}
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.2 }}
                                    transition={{ delay: 0.5, duration: 1.5 }}
                                    className={`absolute top-0 inset-x-0 h-[300px] blur-[100px] pointer-events-none z-0 ${isHighRisk ? 'bg-red-500' : 'bg-brand'}`} 
                                />
                                
                                <div className="p-12 sm:p-16 text-center relative z-10 flex flex-col items-center">
                                    <motion.div 
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.1, duration: 0.8, type: "spring", bounce: 0.4 }}
                                        className={`p-6 rounded-full mb-8 shadow-2xl relative ${isHighRisk ? 'bg-red-500/10 text-red-500 border border-red-500/30' : 'bg-brand/10 text-brand border border-brand/30'}`}
                                    >
                                        <motion.div 
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            className={`absolute inset-0 rounded-full blur-xl ${isHighRisk ? 'bg-red-500/40' : 'bg-brand/40'}`} 
                                        />
                                        {isHighRisk ? <ShieldAlert className="w-14 h-14 relative z-10" strokeWidth={1.5} /> : <CheckCircle2 className="w-14 h-14 relative z-10" strokeWidth={1.5} />}
                                    </motion.div>

                                    <motion.h2 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        className="text-[2.25rem] font-medium tracking-tight mb-4 text-white"
                                    >
                                        Assessment Complete
                                    </motion.h2>
                                    
                                    <motion.p 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                        className="text-neutral-400 text-lg mb-12 max-w-md mx-auto leading-relaxed"
                                    >
                                        {isHighRisk 
                                            ? "Our ML ensemble has identified patterns strongly correlated with historic defaults. Proceed with caution." 
                                            : "This applicant meets or exceeds threshold criteria for standard approval pipelines."}
                                    </motion.p>

                                    <div className="flex flex-col sm:flex-row gap-5 justify-center mb-14 w-full max-w-lg">
                                        <motion.div 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                                            className="bg-white/[0.03] rounded-[24px] p-8 w-full sm:w-1/2 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-200"
                                        >
                                            <div className="flex items-center gap-2 mb-2 relative z-10">
                                                <motion.div 
                                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                    className={`w-2 h-2 rounded-full ${isHighRisk ? 'bg-red-500' : 'bg-brand'}`}
                                                />
                                                <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Status</p>
                                            </div>
                                            <p className={`text-3xl font-medium tracking-tight relative z-10 ${isHighRisk ? 'text-red-400' : 'text-brand-light'}`}>
                                                {isHighRisk ? 'High Risk' : 'Low Risk'}
                                            </p>
                                        </motion.div>
                                        
                                        <motion.div 
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                                            className="bg-white/[0.03] rounded-[24px] p-8 w-full sm:w-1/2 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-200"
                                        >
                                            {/* AI Shimmer loading effect */}
                                            <motion.div 
                                                initial={{ x: "-100%" }}
                                                animate={{ x: "100%" }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none"
                                            />
                                            
                                            <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-2 relative z-10">Probability</p>
                                            <div className="flex items-baseline gap-1 relative z-10">
                                                <motion.p className="text-4xl font-medium tracking-tight text-white">
                                                    {rounded}
                                                </motion.p>
                                                <span className="text-xl text-neutral-400 font-medium tracking-tight">%</span>
                                            </div>
                                            <motion.p 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 1.5, duration: 0.5 }}
                                                className="text-[11px] text-neutral-500 mt-3 text-center leading-relaxed h-8 px-2"
                                            >
                                                {getInsight(prediction?.default_probability * 100)}
                                            </motion.p>
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9, duration: 0.5 }}
                                    >
                                        <Button variant="secondary" onClick={() => { setStep(0); setPrediction(null); }} className="w-full sm:w-auto px-10">
                                            New Assessment
                                        </Button>
                                    </motion.div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Predict;
