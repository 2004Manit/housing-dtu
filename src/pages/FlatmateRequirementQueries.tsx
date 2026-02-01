import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Users, Phone, MessageCircle, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { PropertyFooter } from "@/components/PropertyFooter";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FlatmateQuery {
    id: string;
    name: string;
    budget: string;
    flatmates_required: string;
    contact_no: string;
    status: 'open' | 'closed';
    verified: boolean;
    created_at: string;
}

const FlatmateRequirementQueries = () => {
    const [queries, setQueries] = useState<FlatmateQuery[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const { toast } = useToast();

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        budget: '',
        flatmates_required: '',
        contact_no: '',
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        budget: '',
        flatmates_required: '',
        contact_no: '',
    });

    // Fetch verified queries
    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('flatmate_queries')
                .select('*')
                .eq('verified', true)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setQueries(data || []);
        } catch (error) {
            console.error('Error fetching queries:', error);
            toast({
                title: "Error",
                description: "Failed to load queries. Please refresh the page.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // Validate form
    const validateForm = () => {
        const errors = {
            name: '',
            budget: '',
            flatmates_required: '',
            contact_no: '',
        };

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.budget.trim()) {
            errors.budget = 'Budget is required';
        }

        if (!formData.flatmates_required.trim()) {
            errors.flatmates_required = 'Flatmates required is required';
        }

        if (!formData.contact_no.trim()) {
            errors.contact_no = 'Contact number is required';
        } else if (!/^\d{10}$/.test(formData.contact_no.trim())) {
            errors.contact_no = 'Please enter a valid 10-digit number';
        }

        setFormErrors(errors);
        return !Object.values(errors).some(error => error !== '');
    };

    // Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const { error } = await supabase
                .from('flatmate_queries')
                .insert([
                    {
                        name: formData.name.trim(),
                        budget: formData.budget.trim(),
                        flatmates_required: formData.flatmates_required.trim(),
                        contact_no: formData.contact_no.trim(),
                        status: 'open',
                        verified: false,
                    },
                ]);

            if (error) throw error;

            toast({
                title: "Success!",
                description: "Your query is submitted. The admin team will review it shortly.",
            });

            // Reset form
            setFormData({
                name: '',
                budget: '',
                flatmates_required: '',
                contact_no: '',
            });
            setShowForm(false);
        } catch (error) {
            console.error('Error submitting query:', error);
            toast({
                title: "Error",
                description: "Failed to submit query. Please try again.",
                variant: "destructive",
            });
        }
    };

    // Open WhatsApp
    const openWhatsApp = (contactNo: string, name: string) => {
        const message = encodeURIComponent(
            `Hi ${name}, I saw your query regarding flatmate requirement on Housing DTU. Is it still open?`
        );
        const whatsappUrl = `https://wa.me/91${contactNo}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            <Navbar />
            <div
                className="min-h-screen w-full relative overflow-x-hidden"
                style={{
                    background: 'linear-gradient(to bottom, #0a0e1a 0%, #1a1f2e 50%, #2a2f3e 100%)',
                    margin: 0,
                    padding: 0,
                }}
            >
                {/* Subtle Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-0 left-0 w-96 h-96 bg-slate-700/5 rounded-full blur-3xl"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-slate-600/5 rounded-full blur-3xl"
                        animate={{
                            x: [0, -50, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                </div>

                {/* Main Content */}
                <div className="relative z-10 pt-20 sm:pt-24 pb-16 sm:pb-20 px-3 sm:px-4">
                    <div className="max-w-7xl mx-auto">

                        {/* Heading Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-8 sm:mb-12"
                        >
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                                Browse Flatmate Requirements
                            </h1>
                            <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4">
                                Connect with people who are also looking for flatmates near DTU
                            </p>
                        </motion.div>

                        {/* Add Query Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-4xl mx-auto mb-8 sm:mb-12"
                        >
                            <div
                                onClick={() => setShowForm(true)}
                                className="group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:border-purple-500/60 p-4 sm:p-5 md:p-6 transition-all duration-300 hover:scale-[1.02]"
                            >
                                <div className="flex items-center justify-center gap-3 sm:gap-4">
                                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 group-hover:rotate-90 transition-transform duration-300">
                                        <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <p className="text-white font-medium text-base sm:text-lg md:text-xl">
                                        Want to add your query too? Click here!
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Queries List */}
                        <div className="max-w-5xl mx-auto">
                            {loading ? (
                                <div className="text-center py-12">
                                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
                                    <p className="mt-4 text-slate-400">Loading queries...</p>
                                </div>
                            ) : queries.length === 0 ? (
                                <div className="text-center py-12">
                                    <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                    <p className="text-slate-400 text-lg">No queries yet. Be the first to add one!</p>
                                </div>
                            ) : (
                                <div className="space-y-4 sm:space-y-5">
                                    {queries.map((query, index) => (
                                        <motion.div
                                            key={query.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="group relative overflow-hidden rounded-xl backdrop-blur-xl bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-blue-900/30 border border-purple-500/30 p-4 sm:p-5 md:p-6 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:border-purple-400/50 transition-all duration-300"
                                        >
                                            {/* Status Badge */}
                                            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm ${query.status === 'open'
                                                        ? 'bg-green-500/20 text-green-300 border border-green-400/50'
                                                        : 'bg-red-500/20 text-red-300 border border-red-400/50'
                                                        }`}
                                                >
                                                    <div className={`w-1.5 h-1.5 rounded-full ${query.status === 'open' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                                                    {query.status === 'open' ? 'Open' : 'Closed'}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
                                                {/* Name */}
                                                <div>
                                                    <p className="text-xs sm:text-sm text-slate-400 mb-1">Name</p>
                                                    <p className="text-sm sm:text-base font-semibold text-white">{query.name}</p>
                                                </div>

                                                {/* Budget */}
                                                <div>
                                                    <p className="text-xs sm:text-sm text-slate-400 mb-1">Budget</p>
                                                    <p className="text-sm sm:text-base font-semibold text-white">{query.budget}</p>
                                                </div>

                                                {/* Flatmates Required */}
                                                <div>
                                                    <p className="text-xs sm:text-sm text-slate-400 mb-1">Flatmates Required</p>
                                                    <p className="text-sm sm:text-base font-semibold text-white">{query.flatmates_required}</p>
                                                </div>

                                                {/* Contact */}
                                                <div>
                                                    <p className="text-xs sm:text-sm text-slate-400 mb-1">Contact</p>
                                                    <p className="text-sm sm:text-base font-semibold text-white flex items-center gap-1.5">
                                                        <Phone className="w-3.5 h-3.5" />
                                                        {query.contact_no}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* WhatsApp Button */}
                                            <Button
                                                onClick={() => openWhatsApp(query.contact_no, query.name)}
                                                className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                                            >
                                                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                                                <span className="text-sm sm:text-base">Contact on WhatsApp</span>
                                            </Button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <PropertyFooter />
            </div>

            {/* Add Query Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
                        onClick={() => setShowForm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-5 sm:p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            {/* Form Header */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-3 sm:mb-4">
                                    <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Add Your Query</h2>
                                <p className="text-slate-400 text-xs sm:text-sm">Fill in your flatmate requirements</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
                                        Name <span className="text-red-400">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter your name"
                                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 text-sm sm:text-base"
                                    />
                                    {formErrors.name && (
                                        <p className="text-red-400 text-xs sm:text-sm mt-1">{formErrors.name}</p>
                                    )}
                                </div>

                                {/* Budget */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
                                        Budget <span className="text-red-400">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        placeholder="e.g., Rs 5000-8000/month"
                                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 text-sm sm:text-base"
                                    />
                                    {formErrors.budget && (
                                        <p className="text-red-400 text-xs sm:text-sm mt-1">{formErrors.budget}</p>
                                    )}
                                </div>

                                {/* Flatmates Required */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
                                        Flatmates Required <span className="text-red-400">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData.flatmates_required}
                                        onChange={(e) => setFormData({ ...formData, flatmates_required: e.target.value })}
                                        placeholder="e.g., 2-3 flatmates"
                                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 text-sm sm:text-base"
                                    />
                                    {formErrors.flatmates_required && (
                                        <p className="text-red-400 text-xs sm:text-sm mt-1">{formErrors.flatmates_required}</p>
                                    )}
                                </div>

                                {/* Contact Number */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
                                        Contact Number <span className="text-red-400">*</span>
                                    </label>
                                    <Input
                                        type="tel"
                                        value={formData.contact_no}
                                        onChange={(e) => setFormData({ ...formData, contact_no: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                        placeholder="10-digit mobile number"
                                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 text-sm sm:text-base"
                                    />
                                    {formErrors.contact_no && (
                                        <p className="text-red-400 text-xs sm:text-sm mt-1">{formErrors.contact_no}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300"
                                >
                                    Submit Query
                                </Button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FlatmateRequirementQueries;
