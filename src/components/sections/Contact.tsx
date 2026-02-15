"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Send, Terminal, Mail, MapPin, MessageSquare } from "lucide-react";

export function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

            if (!accessKey) {
                console.warn("Web3Forms Access Key not found. Using simulation.");
                await new Promise(resolve => setTimeout(resolve, 1500));
            } else {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        ...formState,
                        access_key: accessKey,
                        subject: `New Portfolio Message from ${formState.name}`,
                        from_name: "Anurag Mallick Portfolio",
                    })
                });

                const result = await response.json();
                if (!response.ok || !result.success) throw new Error(result.message || "Failed to send message");
            }

            setIsSent(true);
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Sorry, there was an error sending your message. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="theme-section bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/2 blur-[150px] rounded-full pointer-events-none" />

            <div className="theme-container relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-2 text-primary font-mono text-xs mb-4"
                                >
                                    <Terminal size={14} /> ESTABLISH_CONNECTION
                                </motion.div>
                                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
                                    Get in <span className="text-primary">Touch</span>
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                                    Currently scaling global systems in Bangalore. Open for collaborations, speaking engagements, or discussing the future of AI in fintech.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="p-3 rounded-xl bg-primary/5 border border-border group-hover:border-primary/50 transition-all">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Email Interface</p>
                                        <p className="text-foreground font-medium">anurag.mallick@iiml.org</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="p-3 rounded-xl bg-primary/5 border border-border group-hover:border-primary/50 transition-all">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Location</p>
                                        <p className="text-foreground font-medium">Bangalore, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="h-full"
                            >
                                <Card className="theme-card p-8 md:p-10 relative group h-full">
                                    <AnimatePresence mode="wait">
                                        {isSent ? (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-center py-12"
                                            >
                                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                                    <MessageSquare className="w-8 h-8 text-primary" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-foreground mb-2">Message Transmitted</h3>
                                                <p className="text-muted-foreground mb-8">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setIsSent(false)}
                                                >
                                                    Send Another Message
                                                </Button>
                                            </motion.div>
                                        ) : (
                                            <form key="form" onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={formState.name}
                                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                            placeholder="John Doe"
                                                            className="w-full bg-muted border border-border rounded-xl px-4 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/30"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                                                        <input
                                                            type="email"
                                                            required
                                                            value={formState.email}
                                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                            placeholder="john@example.com"
                                                            className="w-full bg-muted border border-border rounded-xl px-4 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/30"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Message</label>
                                                    <textarea
                                                        required
                                                        value={formState.message}
                                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                                        placeholder="What's on your mind?"
                                                        rows={5}
                                                        className="w-full bg-muted border border-border rounded-xl px-4 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none placeholder:text-muted-foreground/30"
                                                    />
                                                </div>

                                                <Button
                                                    type="submit"
                                                    size="lg"
                                                    variant="neon"
                                                    className="w-full font-bold tracking-widest uppercase text-xs h-14"
                                                    isLoading={isSubmitting}
                                                >
                                                    {!isSubmitting && <Send className="w-4 h-4 mr-2" />}
                                                    {isSubmitting ? "TRANSMITTING..." : "EXECUTE_SEND"}
                                                </Button>
                                            </form>
                                        )}
                                    </AnimatePresence>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
