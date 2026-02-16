"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Network, AlertTriangle, CloudRain, Flame, Truck, Anchor, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Node {
    id: string;
    x: number;
    y: number;
    type: 'hub' | 'port' | 'warehouse';
    label: string;
    status: 'active' | 'disrupted';
}

export function LogisticsDisruption() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [disruptionType, setDisruptionType] = useState<'NONE' | 'STRIKE' | 'WEATHER' | 'FUEL'>('NONE');
    const [stats, setStats] = useState({ cost: 12500, time: 48, efficiency: 98 });
    const requestRef = useRef<number | null>(null);

    // Nodes for the simulation
    const nodes = useRef<Node[]>([
        { id: 'DEL', x: 200, y: 150, type: 'hub', label: 'Delhi Hub', status: 'active' },
        { id: 'MUM', x: 200, y: 450, type: 'port', label: 'Mumbai Port', status: 'active' },
        { id: 'BLR', x: 500, y: 400, type: 'warehouse', label: 'Bangalore DC', status: 'active' },
        { id: 'CCU', x: 600, y: 200, type: 'hub', label: 'Kolkata Hub', status: 'active' },
        { id: 'HYD', x: 400, y: 300, type: 'warehouse', label: 'Hyderabad DC', status: 'active' },
    ]).current;

    // Edges
    const connections = useRef([
        ['DEL', 'MUM'], ['DEL', 'CCU'], ['DEL', 'HYD'],
        ['MUM', 'BLR'], ['MUM', 'HYD'],
        ['BLR', 'CCU'], ['BLR', 'HYD'],
        ['CCU', 'HYD']
    ]).current;

    const packets = useRef<any[]>([]);

    useEffect(() => {
        // Adjust stats based on disruption
        if (disruptionType === 'NONE') {
            setStats({ cost: 12500, time: 48, efficiency: 98 });
            nodes.forEach(n => n.status = 'active');
        } else if (disruptionType === 'STRIKE') {
            setStats({ cost: 18200, time: 72, efficiency: 65 });
            nodes.find(n => n.id === 'MUM')!.status = 'disrupted';
        } else if (disruptionType === 'WEATHER') {
            setStats({ cost: 14500, time: 60, efficiency: 80 });
            nodes.find(n => n.id === 'CCU')!.status = 'disrupted';
        } else if (disruptionType === 'FUEL') {
            setStats({ cost: 25000, time: 48, efficiency: 90 }); // High cost, normal time
            nodes.forEach(n => n.status = 'active');
        }
    }, [disruptionType]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Connections
            connections.forEach(([id1, id2]) => {
                const n1 = nodes.find(n => n.id === id1);
                const n2 = nodes.find(n => n.id === id2);
                if (n1 && n2) {
                    ctx.beginPath();
                    ctx.moveTo(n1.x, n1.y);
                    ctx.lineTo(n2.x, n2.y);

                    // Logic to visualize blocked routes
                    const isBlocked = (n1.status === 'disrupted' || n2.status === 'disrupted');

                    if (isBlocked) {
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

            // Packet Logic
            if (packets.current.length < 30) {
                const start = nodes[Math.floor(Math.random() * nodes.length)];
                const end = nodes[Math.floor(Math.random() * nodes.length)];
                // Avoid disrupted nodes as start points if possible, or spawn fewer
                if (start !== end && start.status === 'active') {
                    packets.current.push({
                        x: start.x, y: start.y, tx: end.x, ty: end.y,
                        speed: Math.random() * 2 + 1,
                        progress: 0,
                        rerouted: false
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

                // Reroute Logic visualization
                // If target node becomes disrupted mid-flight, change color/path
                // Simplified: just move
                const vx = (dx / dist) * p.speed;
                const vy = (dy / dist) * p.speed;
                p.x += vx;
                p.y += vy;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
                // Color packets red if high cost (Fuel spike) or blocked path
                ctx.fillStyle = disruptionType === 'FUEL' ? '#ffff00' : '#00ff99';
                ctx.fill();
            });

            // Draw Nodes
            nodes.forEach(n => {
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.type === 'hub' ? 12 : 8, 0, Math.PI * 2);
                ctx.fillStyle = n.status === 'disrupted' ? '#ff0055' : (n.type === 'hub' ? '#fff' : '#888');
                ctx.fill();

                // Pulse effect for disrupted nodes
                if (n.status === 'disrupted') {
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, 20, 0, Math.PI * 2);
                    ctx.strokeStyle = '#ff0055';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                // Label
                ctx.fillStyle = '#666';
                ctx.font = '12px monospace';
                ctx.fillText(n.label, n.x + 15, n.y + 4);
            });

            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        }
    }, [disruptionType]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="col-span-1 p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md h-fit">
                <div className="flex items-center gap-2 mb-6 text-[#00f3ff]">
                    <Network className="w-6 h-6" />
                    <h2 className="font-bold text-lg">Network Control</h2>
                </div>

                <div className="space-y-4 mb-8">
                    <Button
                        onClick={() => setDisruptionType(disruptionType === 'STRIKE' ? 'NONE' : 'STRIKE')}
                        className={`w-full justify-start ${disruptionType === 'STRIKE' ? 'bg-[#ff0055] hover:bg-[#ff0055]/80 text-white' : 'bg-white/5 hover:bg-white/10'}`}
                    >
                        <AlertTriangle className="w-4 h-4 mr-2" /> PORT STRIKE (MUMBAI)
                    </Button>
                    <Button
                        onClick={() => setDisruptionType(disruptionType === 'WEATHER' ? 'NONE' : 'WEATHER')}
                        className={`w-full justify-start ${disruptionType === 'WEATHER' ? 'bg-[#00f3ff] hover:bg-[#00f3ff]/80 text-black' : 'bg-white/5 hover:bg-white/10'}`}
                    >
                        <CloudRain className="w-4 h-4 mr-2" /> CYCLONE ALERT (KOLKATA)
                    </Button>
                    <Button
                        onClick={() => setDisruptionType(disruptionType === 'FUEL' ? 'NONE' : 'FUEL')}
                        className={`w-full justify-start ${disruptionType === 'FUEL' ? 'bg-[#ffff00] hover:bg-[#ffff00]/80 text-black' : 'bg-white/5 hover:bg-white/10'}`}
                    >
                        <Flame className="w-4 h-4 mr-2" /> FUEL COST SPIKE (+40%)
                    </Button>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/10">
                    <h3 className="text-sm font-bold text-muted-foreground">Live Metrics</h3>
                    <StatBox label="Avg. Shipping Cost" value={`₹${stats.cost}`} change={disruptionType === 'NONE' ? 0 : disruptionType === 'FUEL' ? 40 : 15} />
                    <StatBox label="Transit Time (Hrs)" value={`${stats.time}h`} change={disruptionType === 'NONE' ? 0 : disruptionType === 'STRIKE' ? 50 : 25} />
                    <StatBox label="Network Efficiency" value={`${stats.efficiency}%`} inverse />
                </div>
            </Card>

            <div className="col-span-1 lg:col-span-3 relative">
                <Card className="p-0 overflow-hidden border-white/10 bg-black/80">
                    <div className="absolute top-4 left-4 p-2 bg-black/60 backdrop-blur rounded border border-white/10 text-xs text-muted-foreground z-10">
                        <div className="flex items-center gap-2">
                            <Zap className="w-3 h-3 text-[#00ff99]" /> Neural Rerouting Active
                        </div>
                    </div>

                    <canvas
                        ref={canvasRef}
                        width={900}
                        height={600}
                        className="w-full h-auto bg-[#0a0a0a]"
                    />

                    {/* Business Impact Box (Overlay) */}
                    <div className="absolute bottom-4 right-4 max-w-sm bg-black/80 backdrop-blur border border-[#00f3ff]/30 rounded-xl p-4 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse" />
                            <span className="text-xs font-bold text-[#00f3ff] uppercase tracking-wider">Business Impact</span>
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed">
                            Simulates my <span className="text-white font-semibold">₹5 Lakh/month</span> Google Maps optimization algorithm at Shiprocket. Reduced delivery failures by 18% during monsoon season.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function StatBox({ label, value, change, inverse }: any) {
    const isBad = inverse ? (change < 0) : (change > 0);
    const color = change === 0 ? 'text-white' : isBad ? 'text-[#ff0055]' : 'text-[#00ff99]';

    return (
        <div className="p-3 bg-white/5 rounded border border-white/5 flex items-center justify-between">
            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className={`text-xl font-bold font-mono ${color}`}>{value}</p>
            </div>
            {change !== 0 && (
                <div className={`text-xs font-bold ${color}`}>
                    {change > 0 ? '+' : ''}{change}%
                </div>
            )}
        </div>
    )
}
