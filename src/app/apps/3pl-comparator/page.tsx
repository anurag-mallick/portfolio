"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { Card } from "@/components/ui/Card";

const carriers = [
    { name: "FedEx", zone2: 8.50, zone5: 12.75, zone8: 18.90, color: "#4d148c" },
    { name: "UPS", zone2: 8.25, zone5: 13.10, zone8: 19.50, color: "#351c15" },
    { name: "DHL", zone2: 9.00, zone5: 14.25, zone8: 21.00, color: "#ffcc00" },
    { name: "USPS", zone2: 7.50, zone5: 11.50, zone8: 16.75, color: "#004b87" },
];

export default function ThreePLComparatorPage() {
    const [weight, setWeight] = useState(5);
    const [zone, setZone] = useState<2 | 5 | 8>(5);

    const getCost = (carrier: typeof carriers[0]) => {
        return carrier[`zone${zone}` as keyof typeof carrier] as number * (weight / 5);
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/#logistics-lab">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                </Link>
                <div className="flex items-center gap-3 mb-8">
                    <Package className="w-8 h-8 text-[#00d4ff]" />
                    <h1 className="text-3xl font-bold text-[#00d4ff]">3PL Cost Comparator</h1>
                </div>

                <Card className="p-6 bg-zinc-900/50 mb-6">
                    <h3 className="text-xl font-bold mb-4">Package Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm mb-2">Weight: {weight} lbs</label>
                            <input type="range" min="1" max="20" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full" />
                        </div>
                        <div>
                            <label className="block text-sm mb-2">Shipping Zone</label>
                            <div className="flex gap-2">
                                <Button onClick={() => setZone(2)} className={zone === 2 ? "bg-[#00d4ff]" : "bg-white/10"}>Zone 2</Button>
                                <Button onClick={() => setZone(5)} className={zone === 5 ? "bg-[#00d4ff]" : "bg-white/10"}>Zone 5</Button>
                                <Button onClick={() => setZone(8)} className={zone === 8 ? "bg-[#00d4ff]" : "bg-white/10"}>Zone 8</Button>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {carriers.map((c, i) => (
                        <Card key={i} className="p-6 bg-zinc-900/50">
                            <div className="text-sm text-muted-foreground mb-2">{c.name}</div>
                            <div className="text-4xl font-bold mb-4" style={{ color: c.color }}>${getCost(c).toFixed(2)}</div>
                            <div className="text-xs text-muted-foreground">Zone {zone} • {weight} lbs</div>
                        </Card>
                    ))}
                </div>

                <Card className="p-6 bg-zinc-900/50 mt-6">
                    <div className="text-sm text-green-400">💡 Cheapest: USPS at ${getCost(carriers[3]).toFixed(2)}</div>
                </Card>
            </div>
        </div>
    );
}
