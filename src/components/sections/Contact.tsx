"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Send, Terminal } from "lucide-react";

export function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSent(true);
    };

    return (
        <section id="contact" className="py-24 bg-black relative overflow-hidden min-h-[600px] flex items-center justify-center">
            {/* Matrix-like background effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

            <div className="container px-4 md:px-6 relative z-10 max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border border-primary/30 bg-black/80 backdrop-blur-md rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)]"
                >
                    {/* Terminal Header */}
                    <div className="bg-primary/10 border-b border-primary/20 p-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="text-xs font-mono text-primary/70 flex items-center gap-2">
                            <Terminal className="w-3 h-3" />
                            secure_connection_v1.0
                        </div>
                    </div>

                    <div className="p-6 md:p-8 font-mono">
                        <div className="mb-6 space-y-2">
                            <p className="text-primary text-sm">
                                <span className="text-green-500">➜</span> ~ INITIALIZE CONNECTION
                            </p>
                            <p className="text-primary/70 text-sm">
                                Loading secure transmission protocol...
                            </p>
                            <p className="text-primary/70 text-sm">
                                Status: <span className="text-green-400 animate-pulse">READY</span>
                            </p>
                        </div>

                        {isSent ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12"
                            >
                                <h3 className="text-2xl font-bold text-primary mb-2">TRANSMISSION RECEIVED</h3>
                                <p className="text-muted-foreground">System will respond shortly.</p>
                                <Button
                                    variant="outline"
                                    className="mt-6 border-primary/50 text-primary hover:bg-primary/10"
                                    onClick={() => setIsSent(false)}
                                >
                                    New Transmission
                                </Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="group">
                                    <label className="block text-xs uppercase tracking-widest text-primary/50 mb-1 group-focus-within:text-primary transition-colors">&gt;&gt; Identity Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-primary/5 border border-primary/20 rounded p-3 text-primary placeholder:text-primary/20 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all"
                                        placeholder="ENTER_NAME"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs uppercase tracking-widest text-primary/50 mb-1 group-focus-within:text-primary transition-colors">&gt;&gt; Comm Frequency (Email)</label>
                                    <input
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-primary/5 border border-primary/20 rounded p-3 text-primary placeholder:text-primary/20 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all"
                                        placeholder="ENTER_EMAIL"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs uppercase tracking-widest text-primary/50 mb-1 group-focus-within:text-primary transition-colors">&gt;&gt; Data Payload</label>
                                    <textarea
                                        required
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full bg-primary/5 border border-primary/20 rounded p-3 text-primary placeholder:text-primary/20 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all min-h-[120px]"
                                        placeholder="ENTER_MESSAGE"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full mt-4 bg-primary text-black hover:bg-primary/90 font-bold tracking-widest"
                                    isLoading={isSubmitting}
                                >
                                    {!isSubmitting && <Send className="w-4 h-4 mr-2" />}
                                    {isSubmitting ? "TRANSMITTING..." : "SEND TRANSMISSION"}
                                </Button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
