import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    ChevronRight,
    ChevronLeft,
    BarChart3,
    AlertCircle,
    ArrowRight,
    Info,
    Loader2
} from 'lucide-react';

// --- Mock Components for Shadcn-like feel ---
// In a real project, these would be separate files from Shadcn
const Card = ({ children, className = "" }) => (
    <div className={`glass-card rounded-xl p-6 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, className = "", variant = "primary", disabled = false }) => {
    const baseStyle = "flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10",
        outline: "border border-white/20 bg-white/5 hover:bg-white/10 text-white",
        ghost: "text-white/70 hover:text-white hover:bg-white/5"
    };
    return (
        <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} disabled={disabled}>
            {children}
        </button>
    );
};

const Input = ({ label, name, type = "text", value, onChange, placeholder = "" }) => (
    <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium text-white/60 ml-1">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all overflow-hidden"
        />
    </div>
);

const Select = ({ label, name, value, onChange, options }) => (
    <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium text-white/60 ml-1">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all appearance-none cursor-pointer"
        >
            {options.map((opt) => (
                <option key={opt} value={opt} className="bg-slate-900 text-white">{opt}</option>
            ))}
        </select>
    </div>
);

// --- Main App Logic ---

const App = () => {
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
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setPrediction(data);
            setStep(3); // Result step
        } catch (error) {
            console.error("API Error:", error);
            alert("Backend server is not running. Please start main.py!");
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { title: "Personal Info", icon: <Info className="w-5 h-5" /> },
        { title: "Financials", icon: <BarChart3 className="w-5 h-5" /> },
        { title: "Loan Details", icon: <ShieldCheck className="w-5 h-5" /> }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden selection:bg-blue-500/30">
            {/* Background blobs */}
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/20 blur-[128px] rounded-full -z-10" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 blur-[128px] rounded-full -z-10" />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="flex items-center justify-center gap-2 mb-4">
                    <ShieldCheck className="text-blue-400 w-8 h-8" />
                    <span className="text-2xl font-bold tracking-tighter">LoanGuard</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-black mb-4 leading-tight tracking-tight">
                    Precision <span className="gradient-text">Loan Analytics</span>
                </h1>
                <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
                    The next generation of credit risk assessment. Powered by balanced machine learning for unmatched accuracy.
                </p>
            </motion.div>

            {/* Main Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl"
            >
                <AnimatePresence mode="wait">
                    {step < 3 ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card>
                                {/* Progress Tracks */}
                                <div className="flex items-center justify-between mb-8 overflow-x-hidden p-1">
                                    {steps.map((s, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${step >= i ? 'bg-white text-black ring-4 ring-white/10' : 'bg-white/5 text-white/40'}`}>
                                                {step > i ? <ShieldCheck className="w-5 h-5" /> : s.icon}
                                            </div>
                                            <span className={`hidden sm:block text-sm font-semibold tracking-wide ${step >= i ? 'text-white' : 'text-white/20'}`}>
                                                {s.title}
                                            </span>
                                            {i < steps.length - 1 && <div className="hidden sm:block w-12 h-[1px] bg-white/10 mx-2" />}
                                        </div>
                                    ))}
                                </div>

                                {/* Form Content */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 min-h-[320px]">
                                    {step === 0 && (
                                        <>
                                            <Input label="Age" name="Age" type="number" value={formData.Age} onChange={handleChange} />
                                            <Select
                                                label="Marital Status" name="MaritalStatus" value={formData.MaritalStatus}
                                                onChange={handleChange} options={["Married", "Single", "Divorced", "Widowed"]}
                                            />
                                            <Select
                                                label="Education" name="Education" value={formData.Education}
                                                onChange={handleChange} options={["Bachelor's", "Master's", "High School", "PhD"]}
                                            />
                                            <Select
                                                label="Employment Type" name="EmploymentType" value={formData.EmploymentType}
                                                onChange={handleChange} options={["Full-time", "Part-time", "Self-employed", "Unemployed"]}
                                            />
                                            <Input label="Months Employed" name="MonthsEmployed" type="number" value={formData.MonthsEmployed} onChange={handleChange} />
                                            <Select
                                                label="Has Dependents" name="HasDependents" value={formData.HasDependents}
                                                onChange={handleChange} options={["No", "Yes"]}
                                            />
                                        </>
                                    )}
                                    {step === 1 && (
                                        <>
                                            <Input label="Annual Income ($)" name="Income" type="number" value={formData.Income} onChange={handleChange} />
                                            <Input label="Credit Score" name="CreditScore" type="number" value={formData.CreditScore} onChange={handleChange} />
                                            <Input label="Number of Credit Lines" name="NumCreditLines" type="number" value={formData.NumCreditLines} onChange={handleChange} />
                                            <Input label="DTI Ratio (0.0 - 1.0)" name="DTIRatio" type="number" value={formData.DTIRatio} onChange={handleChange} />
                                            <Select
                                                label="Has Mortgage" name="HasMortgage" value={formData.HasMortgage}
                                                onChange={handleChange} options={["No", "Yes"]}
                                            />
                                            <Select
                                                label="Has Co-Signer" name="HasCoSigner" value={formData.HasCoSigner}
                                                onChange={handleChange} options={["No", "Yes"]}
                                            />
                                        </>
                                    )}
                                    {step === 2 && (
                                        <>
                                            <Input label="Loan Amount ($)" name="LoanAmount" type="number" value={formData.LoanAmount} onChange={handleChange} />
                                            <Input label="Interest Rate (%)" name="InterestRate" type="number" value={formData.InterestRate} onChange={handleChange} />
                                            <Input label="Loan Term (Months)" name="LoanTerm" type="number" value={formData.LoanTerm} onChange={handleChange} />
                                            <Select
                                                label="Loan Purpose" name="LoanPurpose" value={formData.LoanPurpose}
                                                onChange={handleChange} options={["Home", "Car", "Business", "Education", "Other"]}
                                            />
                                        </>
                                    )}
                                </div>

                                {/* Footer Buttons */}
                                <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/10">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setStep(s => Math.max(0, s - 1))}
                                        className={step === 0 ? "invisible" : ""}
                                    >
                                        <ChevronLeft /> Back
                                    </Button>
                                    <Button
                                        onClick={step === 2 ? handleSubmit : () => setStep(s => s + 1)}
                                        disabled={loading}
                                        className="min-w-[140px]"
                                    >
                                        {loading ? (
                                            <Loader2 className="animate-spin" />
                                        ) : step === 2 ? (
                                            <>Analyze Risk <ChevronRight /></>
                                        ) : (
                                            <>Continue <ChevronRight /></>
                                        )}
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <Card className="py-12 relative overflow-hidden">
                                {/* Result Decorator */}
                                <div className={`absolute top-0 left-0 w-full h-2 ${prediction?.prediction === 1 ? 'bg-red-500' : 'bg-emerald-500'}`} />

                                <h2 className="text-2xl font-bold mb-8 text-white/60">Risk Assessment Analysis</h2>

                                <div className="flex flex-col items-center mb-8">
                                    <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 ring-8 ${prediction?.prediction === 1 ? 'bg-red-500/10 text-red-500 ring-red-500/10' : 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/10'}`}>
                                        {prediction?.prediction === 1 ? <AlertCircle className="w-16 h-16" /> : <ShieldCheck className="w-16 h-16" />}
                                    </div>
                                    <h3 className={`text-5xl font-black mb-2 px-1 tracking-tight ${prediction?.prediction === 1 ? 'text-red-500' : 'text-emerald-500'}`}>
                                        {prediction?.prediction === 1 ? 'High Risk' : 'Low Risk'}
                                    </h3>
                                    <p className="text-white/40 text-lg">
                                        {prediction?.prediction === 1 ? 'High probability of loan default detected.' : 'The applicant meets standard stability requirements.'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-12">
                                    <div className="bg-white/5 rounded-xl p-4 text-center">
                                        <span className="block text-2xl font-bold">{(prediction?.default_probability * 100).toFixed(1)}%</span>
                                        <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Risk Score</span>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4 text-center">
                                        <span className="block text-2xl font-bold capitalize">{prediction?.status}</span>
                                        <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Engine Status</span>
                                    </div>
                                </div>

                                <Button variant="outline" onClick={() => { setStep(0); setPrediction(null); }} className="mx-auto">
                                    Run Another Assessment
                                </Button>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Footer Info */}
            <footer className="mt-12 text-white/20 text-sm flex gap-8 items-center">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> SECURE ENGINE
                </div>
                <div className="w-[1px] h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> REAL-TIME ANALYTICS
                </div>
            </footer>
        </div>
    );
};

export default App;
