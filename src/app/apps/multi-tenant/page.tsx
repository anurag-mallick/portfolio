"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { Card } from "@/components/ui/Card";

const strategies = [
    { name: "Shared Schema", security: "Medium", cost: "Low", complexity: "Low", description: "All tenants share same tables with tenant_id column" },
    { name: "Separate Schema", security: "High", cost: "Medium", complexity: "Medium", description: "Each tenant has own schema in shared database" },
    { name: "Separate Database", security: "Highest", cost: "High", complexity: "High", description: "Dedicated database per tenant" },
];

export default function MultiTenantPage() {
    const [selected, setSelected] = useState(0);
    const strategy = strategies[selected];

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/#algorithms">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                </Link>
                <div className="flex items-center gap-3 mb-8">
                    <Shield className="w-8 h-8 text-[#3498db]" />
                    <h1 className="text-3xl font-bold text-[#3498db]">Multi-Tenant Data Isolation</h1>
                </div>

                <div className="flex gap-4 mb-6">
                    {strategies.map((s, i) => (
                        <Button key={i} onClick={() => setSelected(i)} className={selected === i ? "bg-[#3498db]" : "bg-white/10"}>
                            {s.name}
                        </Button>
                    ))}
                </div>

                <Card className="p-6 bg-zinc-900/50 mb-6">
                    <h3 className="text-xl font-bold mb-4">{strategy.name}</h3>
                    <p className="text-muted-foreground mb-6">{strategy.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-black/40 rounded-lg">
                            <div className="text-sm text-muted-foreground mb-2">Security</div>
                            <div className={`text-2xl font-bold ${strategy.security === "Highest" ? "text-green-400" : strategy.security === "High" ? "text-yellow-400" : "text-orange-400"}`}>
                                {strategy.security}
                            </div>
                        </div>
                        <div className="p-4 bg-black/40 rounded-lg">
                            <div className="text-sm text-muted-foreground mb-2">Cost</div>
                            <div className={`text-2xl font-bold ${strategy.cost === "Low" ? "text-green-400" : strategy.cost === "Medium" ? "text-yellow-400" : "text-red-400"}`}>
                                {strategy.cost}
                            </div>
                        </div>
                        <div className="p-4 bg-black/40 rounded-lg">
                            <div className="text-sm text-muted-foreground mb-2">Complexity</div>
                            <div className={`text-2xl font-bold ${strategy.complexity === "Low" ? "text-green-400" : strategy.complexity === "Medium" ? "text-yellow-400" : "text-red-400"}`}>
                                {strategy.complexity}
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-zinc-900/50">
                    <h3 className="text-xl font-bold mb-4">Use Cases</h3>
                    <ul className="space-y-2 text-muted-foreground">
                        {selected === 0 && (
                            <>
                                <li>• Best for: SaaS with many small tenants</li>
                                <li>• Pros: Easy to manage, cost-effective</li>
                                <li>• Cons: Risk of data leakage, limited customization</li>
                            </>
                        )}
                        {selected === 1 && (
                            <>
                                <li>• Best for: Medium-sized B2B applications</li>
                                <li>• Pros: Good isolation, moderate cost</li>
                                <li>• Cons: More complex migrations</li>
                            </>
                        )}
                        {selected === 2 && (
                            <>
                                <li>• Best for: Enterprise clients, regulated industries</li>
                                <li>• Pros: Maximum security, full customization</li>
                                <li>• Cons: Expensive, complex management</li>
                            </>
                        )}
                    </ul>
                </Card>
            </div>
        </div>
    );
}
