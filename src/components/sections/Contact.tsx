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

        try {
            const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
            if (!formspreeId) {
                console.warn("Formspree ID not found. Using simulation.");
                await new Promise(resolve => setTimeout(resolve, 1500));
            } else {
                const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formState)
                });

                if (!response.ok) throw new Error("Failed to send message");
            }

            setIsSent(true);
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Sorry, there was an error sending your message. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-black relative overflow-hidden flex items-center justify-center">
            {/* Subtle background effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />

            <div className="container px-4 md:px-6 relative z-10 max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border border-primary/20 bg-[#050505] backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.05)]"
                >
                    {/* Header */}
                    <div className="bg-primary/5 border-b border-white/5 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        </div>
                        <div className="text-[10px] font-mono text-primary/60 flex items-center gap-2 uppercase tracking-widest">
                            <Terminal className="w-3 h-3" /> Get in Touch
                        </div>
                    </div>

                    <div className="p-8 md:p-10">
                        {isSent ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Received</h3>
                                <p className="text-muted-foreground mb-8">Thanks for reaching out. I'll get back to you soon.</p>
                                <Button
                                    variant="outline"
                                    className="border-primary/30 text-primary hover:bg-primary/10"
                                    onClick={() => setIsSent(false)}
                                >
                                    Send Another Message
                                </Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-medium">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-primary/[0.02] transition-all"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-medium">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-primary/[0.02] transition-all"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-medium">Message</label>
                                    <textarea
                                        required
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:bg-primary/[0.02] transition-all min-h-[150px] resize-none"
                                        placeholder="How can I help you?"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    variant="neon"
                                    className="w-full mt-4 font-bold tracking-widest uppercase text-xs h-14"
                                    isLoading={isSubmitting}
                                >
                                    {!isSubmitting && <Send className="w-4 h-4 mr-2" />}
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
