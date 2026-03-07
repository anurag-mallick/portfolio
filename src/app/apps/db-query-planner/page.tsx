"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Database } from "lucide-react";
import { Card } from "@/components/ui/Card";

const queries = [
    { sql: "SELECT * FROM users WHERE id = 1", plan: "Index Scan on users_pkey", cost: 0.29, rows: 1 },
    { sql: "SELECT * FROM orders WHERE user_id = 123", plan: "Index Scan on orders_user_id_idx", cost: 8.45, rows: 15 },
    { sql: "SELECT * FROM products ORDER BY price", plan: "Seq Scan + Sort", cost: 245.67, rows: 1000 },
];

export default function DBQueryPlannerPage() {
    const [selectedQuery, setSelectedQuery] = useState(0);
    const q = queries[selectedQuery];

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/#infrastructure">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Infrastructure
                    </Button>
                </Link>
                <div className="flex items-center gap-3 mb-8">
                    <Database className="w-8 h-8 text-[#9b59b6]" />
                    <h1 className="text-3xl font-bold text-[#9b59b6]">Database Query Planner</h1>
                </div>

                <div className="flex gap-4 mb-6">
                    {queries.map((_, i) => (
                        <Button key={i} onClick={() => setSelectedQuery(i)} className={selectedQuery === i ? "bg-[#9b59b6]" : "bg-white/10"}>
                            Query {i + 1}
                        </Button>
                    ))}
                </div>

                <Card className="p-6 bg-zinc-900/50 mb-6">
                    <h3 className="text-xl font-bold mb-4">SQL Query</h3>
                    <pre className="p-4 bg-black/40 rounded-lg text-sm font-mono text-[#9b59b6]">{q.sql}</pre>
                </Card>

                <Card className="p-6 bg-zinc-900/50 mb-6">
                    <h3 className="text-xl font-bold mb-4">Execution Plan</h3>
                    <div className="p-4 bg-black/40 rounded-lg">
                        <div className="text-lg font-bold text-[#9b59b6] mb-2">{q.plan}</div>
                        <div className="text-sm text-muted-foreground">Using index for optimal performance</div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">Estimated Cost</div>
                        <div className="text-3xl font-bold text-[#9b59b6]">{q.cost}</div>
                    </Card>
                    <Card className="p-4 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">Rows Returned</div>
                        <div className="text-3xl font-bold text-cyan-400">{q.rows}</div>
                    </Card>
                    <Card className="p-4 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">Performance</div>
                        <div className="text-3xl font-bold text-green-400">{q.cost < 10 ? "Excellent" : q.cost < 100 ? "Good" : "Slow"}</div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
