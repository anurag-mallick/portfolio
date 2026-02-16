"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Play, RefreshCw, BarChart } from 'lucide-react';

export function SortingVisualizer() {
    const [array, setArray] = useState<number[]>([]);
    const [sorting, setSorting] = useState(false);
    const [activeIndices, setActiveIndices] = useState<number[]>([]);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        if (sorting) return;
        const arr = [];
        for (let i = 0; i < 50; i++) {
            arr.push(Math.floor(Math.random() * 90) + 10);
        }
        setArray(arr);
        setActiveIndices([]);
    };

    const bubbleSort = async () => {
        setSorting(true);
        const arr = [...array];
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                setActiveIndices([j, j + 1]);
                await new Promise(r => setTimeout(r, 10)); // Delay

                if (arr[j] > arr[j + 1]) {
                    // Swap
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    setArray([...arr]);
                }
            }
        }
        setActiveIndices([]);
        setSorting(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md mb-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-[#9900ff]" />
                    <h2 className="font-bold text-white">Bubble Sort</h2>
                </div>
                <div className="flex gap-2">
                    <Button onClick={resetArray} disabled={sorting} variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" /> New Array
                    </Button>
                    <Button onClick={bubbleSort} disabled={sorting} size="sm" className="bg-[#9900ff] hover:bg-[#7a00cc]">
                        <Play className="w-4 h-4 mr-2" /> Sort
                    </Button>
                </div>
            </Card>

            <div className="h-[400px] flex items-end justify-center gap-1 bg-black/40 p-4 rounded-xl border border-white/5 relative">
                {array.map((val, idx) => (
                    <div
                        key={idx}
                        style={{
                            height: `${val}%`,
                            backgroundColor: activeIndices.includes(idx) ? '#ffffff' : '#9900ff',
                            boxShadow: activeIndices.includes(idx) ? '0 0 10px white' : 'none'
                        }}
                        className="flex-1 rounded-t-sm transition-all duration-75"
                    />
                ))}
            </div>
        </div>
    );
}
