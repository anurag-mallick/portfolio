"use client";

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TrendingDown, Zap, ShieldAlert, BarChart3, RefreshCw, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const BASE_REGIONS = [
    { name: 'North America', pos: [5, 2, 0], costFactor: 1.2, risk: 10 },
    { name: 'Europe', pos: [0, 3.5, 3.5], costFactor: 1.1, risk: 15 },
    { name: 'APAC', pos: [-4, 0, 4], costFactor: 0.8, risk: 20 },
    { name: 'LATAM', pos: [2, -3, 4], costFactor: 0.7, risk: 35 },
    { name: 'Africa', pos: [0, -2, -4], costFactor: 0.6, risk: 40 },
];

function InteractiveGlobe({ data, stressLevel }: any) {
    const globeRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (globeRef.current) globeRef.current.rotation.y += 0.002 * (1 + stressLevel * 0.5);
    });

    return (
        <group ref={globeRef}>
            <mesh>
                <sphereGeometry args={[4.5, 64, 64]} />
                <meshPhongMaterial color="#050505" emissive="#111" specular="#333" shininess={10} wireframe transparent opacity={0.6} />
            </mesh>
            {BASE_REGIONS.map((reg, idx) => {
                const totalCost = (reg.costFactor * data.currency * data.headcount).toFixed(1);
                const currentRisk = Math.min(100, reg.risk + (stressLevel * 20));
                const color = currentRisk > 60 ? '#ff0055' : currentRisk > 30 ? '#ffff00' : '#00f3ff';

                return (
                    <group key={idx} position={reg.pos as any}>
                        <mesh>
                            <sphereGeometry args={[0.2, 16, 16]} />
                            <meshBasicMaterial color={color} />
                        </mesh>
                        <Html distanceFactor={15}>
                            <motion.div
                                animate={{ scale: stressLevel > 1 ? [1, 1.1, 1] : 1 }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="bg-black/80 backdrop-blur-md border border-white/20 p-2 rounded text-[10px] whitespace-nowrap pointer-events-none"
                            >
                                <div className="font-bold text-white mb-1 uppercase tracking-tighter">{reg.name}</div>
                                <div className="text-[#00f3ff] font-mono">${totalCost}M / yr</div>
                                <div className="flex items-center gap-1">
                                    <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-current" style={{ width: `${currentRisk}%`, color }} />
                                    </div>
                                    <span style={{ color }}>{Math.round(currentRisk)}% Risk</span>
                                </div>
                            </motion.div>
                        </Html>
                    </group>
                );
            })}
        </group>
    );
}

export function PayrollWhatIf() {
    const [params, setParams] = useState({ currency: 1.0, headcount: 500, tax: 0 });
    const [stressLevel, setStressLevel] = useState(0);
    const [isStressTesting, setIsStressTesting] = useState(false);

    const runStressTest = () => {
        setIsStressTesting(true);
        let count = 0;
        const interval = setInterval(() => {
            setStressLevel(Math.random() * 2);
            count++;
            if (count > 20) {
                clearInterval(interval);
                setIsStressTesting(false);
                setStressLevel(0);
            }
        }, 100);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[800px] lg:h-[650px]">
            <Card className="col-span-2 relative bg-zinc-900/40 border-white/10 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <div className="bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-[10px] text-muted-foreground flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00ff99] animate-pulse" /> SIMULATION ACTIVE
                    </div>
                </div>

                <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <InteractiveGlobe data={params} stressLevel={stressLevel} />
                    <OrbitControls enableZoom={false} />
                </Canvas>

                {isStressTesting && (
                    <div className="absolute inset-0 bg-red-500/10 pointer-events-none flex items-center justify-center">
                        <div className="text-4xl font-black text-red-500/50 italic tracking-widest uppercase">STRESS TESTING ACTIVE</div>
                    </div>
                )}
            </Card>

            <div className="flex flex-col gap-6">
                <Card className="flex-1 p-6 bg-zinc-900/60 border-white/10 backdrop-blur-xl">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold text-[#00f3ff] flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" /> SCENARIO CONTROLS
                        </h3>
                        {isStressTesting && <RefreshCw className="w-4 h-4 animate-spin text-red-500" />}
                    </div>

                    <div className="space-y-8">
                        <Slider label="Currency Volatility" value={params.currency} min={0.5} max={1.5} step={0.01}
                            onChange={(v: any) => setParams(p => ({ ...p, currency: v }))}
                            icon={<TrendingDown className="w-3 h-3" />} />

                        <Slider label="Headcount Growth" value={params.headcount} min={100} max={2000} step={10}
                            onChange={(v: any) => setParams(p => ({ ...p, headcount: v }))}
                            icon={<Zap className="w-3 h-3" />} />

                        <Slider label="Social Security Delta" value={params.tax} min={-10} max={10} step={1}
                            onChange={(v: any) => setParams(p => ({ ...p, tax: v }))}
                            icon={<ShieldAlert className="w-3 h-3" />} />
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10">
                        <Button
                            onClick={runStressTest}
                            disabled={isStressTesting}
                            className="w-full bg-[#ff0055] hover:bg-[#ff0055]/80 text-white font-bold tracking-widest border-none h-12 shadow-[0_0_20px_rgba(255,0,85,0.3)]"
                        >
                            <AlertTriangle className="w-5 h-5 mr-2" /> RUN WORKFORCE STRESS TEST
                        </Button>
                    </div>
                </Card>

                <div className="bg-gradient-to-br from-zinc-900 to-black border border-[#00f3ff]/30 rounded-xl p-5 shadow-[0_0_20px_rgba(0,243,255,0.1)]">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse" />
                        <span className="text-xs font-bold text-[#00f3ff] uppercase tracking-widest">Business Impact</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed font-retro">
                        Built for <span className="text-white font-semibold underline decoration-[#00f3ff]/50">Bluspring global payroll workflows</span>.
                        Visualizes exposure to FX risk and statutory changes across 150 countries.
                    </p>
                </div>
            </div>
        </div>
    );
}

function Slider({ label, value, min, max, step, onChange, icon }: any) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between text-[11px] uppercase tracking-wider font-bold">
                <span className="text-muted-foreground flex items-center gap-2">{icon}{label}</span>
                <span className="text-white font-mono">{typeof value === 'number' && value % 1 !== 0 ? value.toFixed(2) : value}</span>
            </div>
            <input
                type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00f3ff] hover:accent-[#00f3ff]/80 transition-all"
            />
        </div>
    );
}
