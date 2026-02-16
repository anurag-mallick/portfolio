"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Simplified tax data for 15 countries
const TAX_DATA = {
    US: { income: 22, social: 7.65, medicare: 1.45, total: 31.1 },
    UK: { income: 20, ni: 13.8, total: 33.8 },
    DE: { income: 25, social: 19.5, total: 44.5 },
    FR: { income: 30, social: 45, total: 75 },
    ES: { income: 24, social: 29.9, total: 53.9 },
    NL: { income: 37.1, social: 18.5, total: 55.6 },
    SG: { income: 17, cpf: 17, total: 34 },
    AU: { income: 32.5, super: 11, total: 43.5 },
    CA: { income: 26, cpp: 5.7, ei: 1.58, total: 33.28 },
    IN: { income: 30, pf: 12, esi: 3.25, total: 45.25 },
    JP: { income: 23.2, social: 15.5, total: 38.7 },
    CN: { income: 25, social: 37, total: 62 },
    BR: { income: 27.5, social: 28, total: 55.5 },
    MX: { income: 30, social: 20, total: 50 },
    IT: { income: 38, social: 30, total: 68 },
};

const COUNTRIES = Object.keys(TAX_DATA);

export function TaxCalculator() {
    const [salary, setSalary] = useState(100000);
    const [country, setCountry] = useState("US");
    const [employeeType, setEmployeeType] = useState<"employee" | "contractor">("employee");

    const taxData = TAX_DATA[country as keyof typeof TAX_DATA];
    const totalCost = employeeType === "employee" ? salary * (1 + taxData.total / 100) : salary;
    const taxAmount = totalCost - salary;

    const chartData = {
        labels: Object.keys(taxData).filter(k => k !== "total").map(k => k.toUpperCase()),
        datasets: [
            {
                data: Object.entries(taxData)
                    .filter(([k]) => k !== "total")
                    .map(([, v]) => v),
                backgroundColor: [
                    "#00f3ff",
                    "#ff00ff",
                    "#ffff00",
                    "#00ff99",
                    "#ff0080",
                ],
                borderColor: "#000",
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md">
                <h2 className="text-xl font-bold mb-6 text-[#00f3ff]">Configuration</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Annual Salary (USD)</label>
                        <input
                            type="number"
                            value={salary}
                            onChange={(e) => setSalary(Number(e.target.value))}
                            className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-[#00f3ff] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Country</label>
                        <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-[#00f3ff] focus:outline-none"
                        >
                            {COUNTRIES.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Employment Type</label>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => setEmployeeType("employee")}
                                className={`flex-1 ${employeeType === "employee" ? "bg-[#00f3ff] text-black" : "bg-white/10"}`}
                            >
                                Employee
                            </Button>
                            <Button
                                onClick={() => setEmployeeType("contractor")}
                                className={`flex-1 ${employeeType === "contractor" ? "bg-[#00f3ff] text-black" : "bg-white/10"}`}
                            >
                                Contractor
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md">
                    <h2 className="text-xl font-bold mb-6 text-[#00f3ff]">Cost Breakdown</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-white/10">
                            <span className="text-muted-foreground">Base Salary</span>
                            <span className="text-2xl font-bold">${salary.toLocaleString()}</span>
                        </div>

                        {employeeType === "employee" && (
                            <>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Employer Taxes ({taxData.total}%)</span>
                                    <span className="text-xl text-[#ff0080]">+${taxAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                    <span className="font-bold">Total Employer Cost</span>
                                    <span className="text-3xl font-bold text-[#00f3ff]">${totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                </div>
                            </>
                        )}

                        {employeeType === "contractor" && (
                            <div className="text-center py-8 text-muted-foreground">
                                No employer taxes for contractors
                            </div>
                        )}
                    </div>
                </Card>

                <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md">
                    <h2 className="text-xl font-bold mb-6 text-[#00f3ff]">Tax Distribution</h2>

                    {employeeType === "employee" ? (
                        <div className="h-64 flex items-center justify-center">
                            <Pie data={chartData} options={{
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: "#fff",
                                            font: { size: 12 }
                                        }
                                    }
                                }
                            }} />
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-muted-foreground">
                            Select "Employee" to view tax distribution
                        </div>
                    )}
                </Card>
            </div>

            <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md">
                <p className="text-sm text-muted-foreground text-center">
                    💡 Tax rates are simplified estimates for demonstration purposes. Actual rates vary by region, salary bands, and other factors.
                </p>
            </Card>
        </div>
    );
}
