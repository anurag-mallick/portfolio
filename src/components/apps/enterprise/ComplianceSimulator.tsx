"use client";

import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, AlertTriangle, FileText, DollarSign, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data for Countries
const countryData: Record<string, { risk: string, tax: string, cost: string, notes: string[], status: 'compliant' | 'complex' | 'high-risk' }> = {
    'United States': { risk: 'Low', tax: '25-30%', cost: '$5,000', notes: ['At-will employment', 'Federal + State taxes', 'Health insurance mandatory'], status: 'compliant' },
    'United Kingdom': { risk: 'Low', tax: '20-45%', cost: '£4,200', notes: ['Strong worker protections', 'Pension auto-enrollment', 'Notice periods required'], status: 'compliant' },
    'Germany': { risk: 'Medium', tax: '30-45%', cost: '€4,800', notes: ['Works councils common', 'Strict termination rules', 'High social security'], status: 'complex' },
    'India': { risk: 'Low', tax: '10-30%', cost: '₹85,000', notes: ['PF & Gratuity mandatory', 'State-specific labor laws', '180-day probation'], status: 'compliant' },
    'Brazil': { risk: 'High', tax: '27.5%', cost: 'R$12,000', notes: ['13th month salary', 'Labor lawsuits common', 'Complex union rules'], status: 'high-risk' },
    'Singapore': { risk: 'Low', tax: '0-22%', cost: 'S$6,500', notes: ['CPF contributions', 'Employment Act applies', 'Business-friendly'], status: 'compliant' },
    'China': { risk: 'High', tax: '3-45%', cost: '¥25,000', notes: ['Housing fund mandatory', 'Written contracts strict', 'Severance payments'], status: 'high-risk' },
    'Australia': { risk: 'Medium', tax: '32.5%', cost: 'A$7,200', notes: ['Modern Awards system', 'Superannuation 11%', 'Unfair dismissal laws'], status: 'complex' },
};

// Globe Component
function GlobeModel({ onSelect, selected }: { onSelect: (c: string) => void, selected: string | null }) {
    const globeRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.001;
        }
    });

    // Generate random points for "countries"
    const points = useMemo(() => {
        const p = [];
        const countries = Object.keys(countryData);
        for (let i = 0; i < countries.length; i++) {
            const phi = Math.acos(-1 + (2 * i) / countries.length);
            const theta = Math.sqrt(countries.length * Math.PI) * phi;
            const x = 5 * Math.cos(theta) * Math.sin(phi);
            const y = 5 * Math.sin(theta) * Math.sin(phi);
            const z = 5 * Math.cos(phi);
            p.push({ x, y, z, name: countries[i] });
        }
        return p;
    }, []);

    return (
        <group ref={globeRef}>
            <mesh>
                <sphereGeometry args={[4.5, 64, 64]} />
                <meshPhongMaterial
                    color="#050505"
                    emissive="#111"
                    specular="#333"
                    shininess={10}
                    wireframe
                    transparent
                    opacity={0.8}
                />
            </mesh>
            <mesh>
                <sphereGeometry args={[4.45, 64, 64]} />
                <meshBasicMaterial color="#000" />
            </mesh>

            {points.map((point, idx) => {
                const isSelected = selected === point.name;
                const status = countryData[point.name].status;
                const color = status === 'compliant' ? '#00f3ff' : status === 'complex' ? '#ffff00' : '#ff0055';

                return (
                    <group key={idx} position={[point.x, point.y, point.z]}>
                        <mesh onClick={(e) => { e.stopPropagation(); onSelect(point.name); }}>
                            <sphereGeometry args={[0.15, 16, 16]} />
                            <meshBasicMaterial color={isSelected ? '#ffffff' : color} />
                        </mesh>
                        <Html distanceFactor={15}>
                            <div
                                className={`text-[10px] font-mono whitespace-nowrap px-1 py-0.5 rounded cursor-pointer transition-all ${isSelected ? 'bg-white text-black scale-110' : 'bg-black/50 text-white hover:bg-black/80'}`}
                                onClick={(e) => { e.stopPropagation(); onSelect(point.name); }}
                            >
                                {point.name}
                            </div>
                        </Html>
                    </group>
                );
            })}
        </group>
    );
}

export function ComplianceSimulator() {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [showContact, setShowContract] = useState(false);

    const details = selectedCountry ? countryData[selectedCountry] : null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[800px] lg:h-[600px]">
            {/* 3D Globe Section */}
            <Card className="col-span-1 lg:col-span-2 relative h-full bg-zinc-900/50 border-white/10 backdrop-blur-md overflow-hidden">
                <div className="absolute top-4 left-4 z-10 flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#00f3ff]" /> <span className="text-xs text-muted-foreground">Standard</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ffff00]" /> <span className="text-xs text-muted-foreground">Complex</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff0055]" /> <span className="text-xs text-muted-foreground">High Risk</span>
                    </div>
                </div>

                <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <GlobeModel onSelect={setSelectedCountry} selected={selectedCountry} />
                    <OrbitControls enableZoom={false} autoRotate={!selectedCountry} autoRotateSpeed={0.5} />
                </Canvas>

                {!selectedCountry && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/60 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                            <p className="text-[#00f3ff] animate-pulse">Select a node to analyze compliance</p>
                        </div>
                    </div>
                )}
            </Card>

            {/* Info Panel */}
            <div className="col-span-1 h-full flex flex-col gap-6">
                <AnimatePresence mode="wait">
                    {details ? (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-zinc-900/80 border border-white/10 rounded-xl p-6 flex-1 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                                <h2 className="text-2xl font-bold text-white">{selectedCountry}</h2>
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${details.status === 'compliant' ? 'bg-[#00f3ff]/20 text-[#00f3ff]' :
                                        details.status === 'complex' ? 'bg-[#ffff00]/20 text-[#ffff00]' :
                                            'bg-[#ff0055]/20 text-[#ff0055]'
                                    }`}>
                                    {details.risk} Risk
                                </span>
                            </div>

                            <div className="space-y-6 flex-1">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-white/5 rounded border border-white/5">
                                        <p className="text-xs text-muted-foreground mb-1">Emp. Tax</p>
                                        <p className="text-lg font-mono text-white">{details.tax}</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded border border-white/5">
                                        <p className="text-xs text-muted-foreground mb-1">Setup Cost</p>
                                        <p className="text-lg font-mono text-[#00f3ff]">{details.cost}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-white mb-3">Key Compliance Rules</h3>
                                    <ul className="space-y-2">
                                        {details.notes.map((note, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <ShieldCheck className="w-4 h-4 text-[#00ff99] mt-0.5 shrink-0" />
                                                {note}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                                <Button
                                    className="w-full bg-[#00f3ff]/10 hover:bg-[#00f3ff]/20 text-[#00f3ff] border border-[#00f3ff]/50"
                                    onClick={() => setShowContract(true)}
                                >
                                    <FileText className="w-4 h-4 mr-2" /> GENERATE EOR CONTRACT
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
                            <Globe className="w-12 h-12 mb-4 opacity-20" />
                            <p>Select a country on the globe to view compliance requirements</p>
                        </div>
                    )}
                </AnimatePresence>

                {/* Business Impact Box (Always Visible) */}
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-[#00f3ff]/30 rounded-xl p-4 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse" />
                        <span className="text-xs font-bold text-[#00f3ff] uppercase tracking-wider">Business Impact</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">
                        Built for <span className="text-white font-semibold">Avance EOR platform</span> – simulates compliance across 30+ countries.
                        Reduced onboarding time by <span className="text-[#00f3ff]">40%</span> using automated contract generation.
                    </p>
                </div>
            </div>

            {/* Mock Contract Modal */}
            <AnimatePresence>
                {showContact && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-zinc-900 border border-white/20 rounded-xl w-full max-w-md p-6 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-[#00f3ff]" />
                                    Contract Generated
                                </h3>
                                <button onClick={() => setShowContract(false)} className="text-muted-foreground hover:text-white">✕</button>
                            </div>

                            <div className="space-y-4 mb-6 font-mono text-sm bg-black/50 p-4 rounded border border-white/10 text-muted-foreground">
                                <div className="flex justify-between">
                                    <span>Jurisdiction:</span>
                                    <span className="text-white">{selectedCountry}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Entity:</span>
                                    <span className="text-white">Avance Global EOR Ltd.</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Status:</span>
                                    <span className="text-[#00ff99]">COMPLIANT</span>
                                </div>
                                <div className="border-t border-white/10 my-2" />
                                <div className="flex justify-between font-bold">
                                    <span>Est. Monthly Cost:</span>
                                    <span className="text-[#00f3ff]">{details?.cost}</span>
                                </div>
                            </div>

                            <Button className="w-full bg-[#00f3ff] hover:bg-[#00c2cc] text-black font-bold" onClick={() => setShowContract(false)}>
                                DOWNLOAD PDF
                            </Button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Stats component helper
function StatRow({ label, value, sub }: any) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{label}</span>
            <div className="text-right">
                <div className="text-white font-mono">{value}</div>
                {sub && <div className="text-[10px] text-muted-foreground">{sub}</div>}
            </div>
        </div>
    );
}
