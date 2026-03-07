"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Play, RefreshCw, Eraser } from 'lucide-react';

const ROWS = 15;
const COLS = 30;

type NodeType = 'start' | 'end' | 'wall' | 'empty' | 'visited' | 'path';

interface Node {
    r: number;
    c: number;
    type: NodeType;
}

export function PathfindingVisualizer() {
    const [grid, setGrid] = useState<Node[][]>([]);
    const [isRunning, setIsRunning] = useState(false);

    // Fixed start/end for simplicity
    const startNode = { r: 7, c: 4 };
    const endNode = { r: 7, c: 25 };

    useEffect(() => {
        resetGrid();
    }, []);

    const resetGrid = () => {
        const newGrid: Node[][] = [];
        for (let r = 0; r < ROWS; r++) {
            const currentRow: Node[] = [];
            for (let c = 0; c < COLS; c++) {
                let type: NodeType = 'empty';
                if (r === startNode.r && c === startNode.c) type = 'start';
                else if (r === endNode.r && c === endNode.c) type = 'end';
                currentRow.push({ r, c, type });
            }
            newGrid.push(currentRow);
        }
        setGrid(newGrid);
    };

    const toggleWall = (r: number, c: number) => {
        if (isRunning) return;
        if ((r === startNode.r && c === startNode.c) || (r === endNode.r && c === endNode.c)) return;

        setGrid(prev => {
            const newGrid = [...prev];
            const newRow = [...newGrid[r]];
            const node = newRow[c];
            newRow[c] = { ...node, type: node.type === 'wall' ? 'empty' : 'wall' };
            newGrid[r] = newRow;
            return newGrid;
        });
    };

    const runAlgorithm = async () => {
        if (isRunning) return;
        setIsRunning(true);

        // Simple BFS for demo
        const queue = [{ r: startNode.r, c: startNode.c, path: [] as Node[] }];
        const visited = new Set<string>();
        visited.add(`${startNode.r},${startNode.c}`);

        while (queue.length > 0) {
            const current = queue.shift()!;
            const { r, c, path } = current;

            // Visual update for visited
            if (!(r === startNode.r && c === startNode.c) && !(r === endNode.r && c === endNode.c)) {
                setGrid(prev => {
                    const g = [...prev];
                    const row = [...g[r]];
                    row[c] = { ...row[c], type: 'visited' };
                    g[r] = row;
                    return g;
                });
                await new Promise(res => setTimeout(res, 10)); // Speed
            }

            if (r === endNode.r && c === endNode.c) {
                // Path found
                for (const node of path) {
                    if (!(node.r === startNode.r && node.c === startNode.c)) {
                        setGrid(prev => {
                            const g = [...prev];
                            const row = [...g[node.r]];
                            row[node.c] = { ...row[node.c], type: 'path' };
                            g[node.r] = row;
                            return g;
                        });
                        await new Promise(res => setTimeout(res, 30));
                    }
                }
                setIsRunning(false);
                return;
            }

            const neighbors = [
                { r: r - 1, c }, { r: r + 1, c }, { r, c: c - 1 }, { r, c: c + 1 }
            ];

            for (const n of neighbors) {
                if (n.r < 0 || n.r >= ROWS || n.c < 0 || n.c >= COLS) continue;
                if (visited.has(`${n.r},${n.c}`)) continue;
                if (grid[n.r][n.c].type === 'wall') continue;

                visited.add(`${n.r},${n.c}`);
                queue.push({ ...n, path: [...path, { r, c, type: 'empty' } as Node] });
            }
        }
        setIsRunning(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md mb-6 flex justify-between items-center">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-sm"><div className="w-4 h-4 bg-green-500 rounded sm" /> Start</div>
                    <div className="flex items-center gap-2 text-sm"><div className="w-4 h-4 bg-red-500 rounded sm" /> End</div>
                    <div className="flex items-center gap-2 text-sm"><div className="w-4 h-4 bg-[#ff0080]" /> Path</div>
                </div>
                <div className="flex gap-2">
                    <Button onClick={resetGrid} variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" /> Reset
                    </Button>
                    <Button onClick={runAlgorithm} disabled={isRunning} size="sm" className="bg-[#ff0080] hover:bg-[#d10069]">
                        <Play className="w-4 h-4 mr-2" /> Run BFS
                    </Button>
                </div>
            </Card>

            <div className="bg-black/40 p-4 rounded-xl border border-white/5 overflow-x-auto">
                {grid.map((row, r) => (
                    <div key={r} className="flex justify-center">
                        {row.map((node, c) => (
                            <div
                                key={`${r}-${c}`}
                                onClick={() => toggleWall(r, c)}
                                className={`w-6 h-6 border border-white/5 cursor-pointer transition-all duration-200 ${node.type === 'start' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' :
                                        node.type === 'end' ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' :
                                            node.type === 'wall' ? 'bg-white/40' :
                                                node.type === 'path' ? 'bg-[#ff0080] scale-110 shadow-[0_0_10px_#ff0080]' :
                                                    node.type === 'visited' ? 'bg-[#ff0080]/30' :
                                                        'hover:bg-white/10'
                                    }`}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <p className="text-center text-muted-foreground mt-4 text-sm">Click grid layout to add walls</p>
        </div>
    );
}
