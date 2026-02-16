"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Network, AlertTriangle, Truck, Package, Globe, MapPin, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppLoader } from '@/components/ui/AppLoader';

interface Node {
    id: string;
    x: number;
    y: number;
    type: 'hub' | 'port' | 'warehouse' | 'store';
    label: string;
    region: string;
}

export function SupplyChainNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(true);
    const [disruption, setDisruption] = useState(false);
    const [activeEvent, setActiveEvent] = useState<string | null>(null);
    const [stats, setStats] = useState({ delivered: 1420, active: 45, delayed: 0 });
    const requestRef = useRef<number>();

    // Geo-distributed nodes (Abstract Map)
    const nodes: Node[] = [
        { id: 'SGP', x: 650, y: 350, type: 'hub', label: 'Singapore Hub', region: 'APAC' },
        { id: 'LAX', x: 150, y: 200, type: 'port', label: 'Los Angeles Port', region: 'NA' },
        { id: 'RTM', x: 450, y: 150, type: 'port', label: 'Rotterdam Port', region: 'EU' },
        { id: 'NYC', x: 250, y: 200, type: 'warehouse', label: 'New York DC', region: 'NA' },
        { id: 'LON', x: 420, y: 180, type: 'warehouse', label: 'London DC', region: 'EU' },
        { id: 'TOK', x: 700, y: 200, type: 'warehouse', label: 'Tokyo DC', region: 'APAC' },
        { id: 'SYD', x: 720, y: 500, type: 'store', label: 'Sydney Store', region: 'APAC' },
        { id: 'BER', x: 480, y: 170, type: 'store', label: 'Berlin Store', region: 'EU' },
    ];

    const connections = [
        ['SGP', 'LAX'], ['SGP', 'RTM'], ['SGP', 'TOK'], // Global Lines from Hub
        ['LAX', 'NYC'], ['RTM', 'LON'], ['RTM', 'BER'], ['TOK', 'SYD'], // Regional
        ['NYC', 'LON'], // Trans-Atlantic
        ['SGP', 'SYD']
    ];

    const packets = useRef<any[]>([]);

    useEffect(() => {
        if (disruption) {
            setActiveEvent("Typhoon Warning in South China Sea - Rerouting traffic");
            setStats(s => ({ ...s, delayed: s.delayed + 12 }));
        } else {
            setActiveEvent(null);
            setStats(s => ({ ...s, delayed: 0 }));
        }
    }, [disruption]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw World Map Background (Abstract Grid)
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#222';
            ctx.lineWidth = 1;
            for (let i = 0; i < canvas.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
            for (let i = 0; i < canvas.height; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }

            // Draw Connections
            connections.forEach(([id1, id2]) => {
                const n1 = nodes.find(n => n.id === id1);
                const n2 = nodes.find(n => n.id === id2);
                if (n1 && n2) {
                    ctx.beginPath();
                    ctx.moveTo(n1.x, n1.y);
                    ctx.lineTo(n2.x, n2.y);

                    // Disruption Logic
                    if (disruption && (id1 === 'SGP' || id2 === 'SGP')) {
                        ctx.strokeStyle = '#ff0055';
                        ctx.lineWidth = 1;
                        ctx.setLineDash([5, 5]);
                    } else {
                        ctx.strokeStyle = '#333';
                        ctx.lineWidth = 2;
                        ctx.setLineDash([]);
                    }
                    ctx.stroke();
                }
            });
            ctx.setLineDash([]);

            // Draw Packets
            if (packets.current.length < 50) {
                // Spawn logic... simplified
                const start = nodes[Math.floor(Math.random() * nodes.length)];
                const end = nodes[Math.floor(Math.random() * nodes.length)];
                if (start !== end) {
                    packets.current.push({
                        x: start.x, y: start.y, tx: end.x, ty: end.y,
                        speed: Math.random() * 2 + 1,
                        progress: 0
                    });
                }
            }

            packets.current.forEach((p, i) => {
                const dx = p.tx - p.x;
                const dy = p.ty - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 5) {
                    packets.current.splice(i, 1);
                    return;
                }

                const vx = (dx / dist) * p.speed * (disruption ? 0.5 : 1);
                const vy = (dy / dist) * p.speed * (disruption ? 0.5 : 1);
                p.x += vx;
                p.y += vy;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = disruption ? '#ff0055' : '#00ff99';
                ctx.fill();
            });

            // Draw Nodes
            nodes.forEach(n => {
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.type === 'hub' ? 8 : 5, 0, Math.PI * 2);
                ctx.fillStyle = n.type === 'hub' ? '#fff' : '#888';
                ctx.fill();

                // Label
                ctx.fillStyle = '#666';
                ctx.font = '10px monospace';
                ctx.fillText(n.id, n.x + 10, n.y + 4);
            });

            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);

    }, [disruption]);

    if (loading) {
        return <AppLoader appName="Neuro-Network Logistics" onLoadComplete={() => setLoading(false)} />;
    }

    return (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="col-span-1 p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md h-fit">
                <div className="flex items-center gap-2 mb-6 text-[#ff0080]">
                    <Network className="w-6 h-6" />
                    <h2 className="font-bold text-lg">Control Tower</h2>
                </div>

                <div className="space-y-4">
                    <StatBox label="Active Shipments" value={stats.active} icon={<Package className="w-4 h-4 text-blue-400" />} />
                    <StatBox label="Delivered (24h)" value={stats.delivered} icon={<Truck className="w-4 h-4 text-green-400" />} />
                    <StatBox label="Delayed" value={stats.delayed} icon={<AlertTriangle className="w-4 h-4 text-red-400" />} />

                    <div className="pt-4 border-t border-white/10 mt-4">
                        <Button
                            onClick={() => setDisruption(!disruption)}
                            className={`w-full ${disruption ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}
                        >
                            {disruption ? 'RESOLVE DISRUPTION' : 'SIMULATE EVENT'}
                        </Button>
                    </div>
                </div>
            </Card>

            <div className="col-span-1 lg:col-span-3 relative">
                <Card className="p-0 overflow-hidden border-white/10 bg-black/80">
                    <div className="absolute top-4 left-4 p-2 bg-black/60 backdrop-blur rounded border border-white/10 text-xs text-muted-foreground z-10">
                        <div className="flex items-center gap-2">
                            <Globe className="w-3 h-3" /> Live Global View
                        </div>
                    </div>

                    {activeEvent && (
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute top-4 right-4 p-3 bg-red-500/20 border border-red-500/50 rounded backdrop-blur z-10 flex items-center gap-3"
                        >
                            <Wind className="w-4 h-4 text-red-400 animate-pulse" />
                            <span className="text-red-200 text-sm font-bold">{activeEvent}</span>
                        </motion.div>
                    )}

                    <canvas
                        ref={canvasRef}
                        width={900}
                        height={500}
                        className="w-full h-auto bg-[#0a0a0a]"
                    />
                </Card>
            </div>
        </div>
    );
}

function StatBox({ label, value, icon }: any) {
    return (
        <div className="p-3 bg-white/5 rounded border border-white/5 flex items-center justify-between">
            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xl font-bold font-mono text-white">{value}</p>
            </div>
            {icon}
        </div>
    )
}
