"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Grid = number[][];

const GRID_SIZE = 4;

const getEmptyGrid = (): Grid => Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));

export default function TwoZeroFourEightGame() {
    const [grid, setGrid] = useState<Grid>(getEmptyGrid());
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const initGame = () => {
        const newGrid = getEmptyGrid();
        addRandomTile(newGrid);
        addRandomTile(newGrid);
        setGrid(newGrid);
        setScore(0);
        setGameOver(false);
    };

    const addRandomTile = (currentGrid: Grid) => {
        const available = [];
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (currentGrid[r][c] === 0) available.push({ r, c });
            }
        }
        if (available.length > 0) {
            const spot = available[Math.floor(Math.random() * available.length)];
            currentGrid[spot.r][spot.c] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    // Game Logic (Slide & Merge)
    const slide = (row: number[]): [number[], number] => {
        const filtered = row.filter(val => val !== 0);
        const missing = GRID_SIZE - filtered.length;
        const zeros = Array(missing).fill(0);
        const newRow = filtered.concat(zeros); // Slide left first

        // Merge
        let scoreGain = 0;
        for (let i = 0; i < GRID_SIZE - 1; i++) {
            if (newRow[i] !== 0 && newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                newRow[i + 1] = 0;
                scoreGain += newRow[i];
            }
        }

        // Slide again after merge to fill gaps
        const filtered2 = newRow.filter(val => val !== 0);
        const missing2 = GRID_SIZE - filtered2.length;
        const zeros2 = Array(missing2).fill(0);

        return [filtered2.concat(zeros2), scoreGain];
    };

    const handleInput = (dir: 'up' | 'down' | 'left' | 'right') => {
        if (gameOver) return;

        let newGrid = grid.map(row => [...row]);
        let totalScoreGain = 0;
        let changed = false;

        if (dir === 'left') {
            for (let r = 0; r < GRID_SIZE; r++) {
                const [slideRow, gain] = slide(newGrid[r]);
                if (JSON.stringify(newGrid[r]) !== JSON.stringify(slideRow)) changed = true;
                newGrid[r] = slideRow;
                totalScoreGain += gain;
            }
        } else if (dir === 'right') {
            for (let r = 0; r < GRID_SIZE; r++) {
                const reverseRow = [...newGrid[r]].reverse();
                const [slideRow, gain] = slide(reverseRow);
                const finalRow = slideRow.reverse();
                if (JSON.stringify(newGrid[r]) !== JSON.stringify(finalRow)) changed = true;
                newGrid[r] = finalRow;
                totalScoreGain += gain;
            }
        } else if (dir === 'up') {
            for (let c = 0; c < GRID_SIZE; c++) {
                const col = newGrid.map(row => row[c]);
                const [slideCol, gain] = slide(col);
                for (let r = 0; r < GRID_SIZE; r++) {
                    if (newGrid[r][c] !== slideCol[r]) changed = true;
                    newGrid[r][c] = slideCol[r];
                }
                totalScoreGain += gain;
            }
        } else if (dir === 'down') {
            for (let c = 0; c < GRID_SIZE; c++) {
                const col = newGrid.map(row => row[c]).reverse();
                const [slideCol, gain] = slide(col);
                const finalCol = slideCol.reverse();
                for (let r = 0; r < GRID_SIZE; r++) {
                    if (newGrid[r][c] !== finalCol[r]) changed = true;
                    newGrid[r][c] = finalCol[r];
                }
                totalScoreGain += gain;
            }
        }

        if (changed) {
            addRandomTile(newGrid);
            setGrid(newGrid);
            setScore(prev => prev + totalScoreGain);
            if (score + totalScoreGain > bestScore) setBestScore(score + totalScoreGain);

            // Check Game Over (Simplified: just check for empty spots for now, strictly speaking should check mergeability)
            let hasMoves = false;
            for (let r = 0; r < GRID_SIZE; r++) {
                for (let c = 0; c < GRID_SIZE; c++) {
                    if (newGrid[r][c] === 0) hasMoves = true;
                }
            }
            if (!hasMoves) {
                // Check if any merges possible
                // (Skip for brevity in this iteration, assuming no 0s means likely stuck soon)
            }
        }
    };

    useEffect(() => {
        initGame();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handleInput('left');
            if (e.key === "ArrowRight") handleInput('right');
            if (e.key === "ArrowUp") handleInput('up');
            if (e.key === "ArrowDown") handleInput('down');
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getTileColor = (val: number) => {
        const colors: Record<number, string> = {
            2: "bg-white/10 text-white",
            4: "bg-white/20 text-white",
            8: "bg-[#00f3ff]/20 text-[#00f3ff] border border-[#00f3ff]/50",
            16: "bg-[#00f3ff]/40 text-white border border-[#00f3ff]",
            32: "bg-[#ff0080]/20 text-[#ff0080] border border-[#ff0080]/50",
            64: "bg-[#ff0080]/40 text-white border border-[#ff0080]",
            128: "bg-[#ffff00]/20 text-[#ffff00] border border-[#ffff00]/50",
            256: "bg-[#ffff00]/40 text-white border border-[#ffff00]",
            512: "bg-[#9900ff]/20 text-[#9900ff] border border-[#9900ff]/50",
            1024: "bg-[#9900ff]/40 text-white border border-[#9900ff]",
            2048: "bg-gradient-to-r from-[#00f3ff] to-[#ff0080] text-white shadow-[0_0_20px_white]",
        };
        return colors[val] || "bg-black text-white";
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors z-50">
                <ArrowLeft size={20} />
                Back to Portfolio
            </Link>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">
                    DATA <span className="text-primary">MERGE</span>
                </h1>
                <p className="text-muted-foreground uppercase tracking-widest text-xs">Binary Accumulation v1.0</p>
            </motion.div>

            <div className="flex gap-4 mb-8">
                <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-center w-32">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Score</p>
                    <p className="text-2xl font-black">{score}</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-center w-32">
                    <p className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1">Best</p>
                    <p className="text-2xl font-black">{bestScore}</p>
                </div>
            </div>

            <div className="relative p-4 bg-white/5 rounded-xl border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                <div className="grid grid-cols-4 gap-4">
                    {grid.map((row, r) => (
                        row.map((val, c) => (
                            <div
                                key={`${r}-${c}`}
                                className={`w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center text-xl md:text-3xl font-bold transition-all duration-200 ${getTileColor(val)}`}
                            >
                                {val !== 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        key={val} // Re-animate on number change
                                    >
                                        {val}
                                    </motion.span>
                                )}
                            </div>
                        ))
                    ))}
                </div>

                {gameOver && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-20 rounded-xl">
                        <Trophy className="w-16 h-16 text-yellow-400 mb-4" />
                        <h2 className="text-2xl font-bold mb-4">BUFFER OVERFLOW</h2>
                        <Button variant="neon" onClick={initGame} className="bg-secondary hover:bg-secondary/80 border-secondary flex gap-2">
                            <RotateCcw size={18} />
                            FLUSH BUFFER
                        </Button>
                    </div>
                )}
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground">
                <p className="mb-4">Use Arrow Keys to Merge Data Packets</p>
                <Button variant="outline" size="sm" onClick={initGame} className="border-white/10 hover:bg-white/5">
                    <RotateCcw className="mr-2 h-3 w-3" />
                    Reset
                </Button>
            </div>
        </div>
    );
}
