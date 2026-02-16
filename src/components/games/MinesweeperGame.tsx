"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Trophy, Play, Flag, Bomb } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Constants
const ROWS = 10;
const COLS = 10;
const MINES = 15;

type Cell = {
    row: number;
    col: number;
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborMines: number;
};

export default function MinesweeperGame() {
    const [grid, setGrid] = useState<Cell[][]>([]);
    const [gameState, setGameState] = useState<"start" | "playing" | "gameover" | "victory">("start");
    const [flagsLeft, setFlagsLeft] = useState(MINES);
    const [explodedMine, setExplodedMine] = useState<{ r: number, c: number } | null>(null);

    const initGame = () => {
        // Create empty grid
        const newGrid: Cell[][] = [];
        for (let r = 0; r < ROWS; r++) {
            newGrid[r] = [];
            for (let c = 0; c < COLS; c++) {
                newGrid[r][c] = {
                    row: r,
                    col: c,
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0
                };
            }
        }

        // Place mines
        let minesPlaced = 0;
        while (minesPlaced < MINES) {
            const r = Math.floor(Math.random() * ROWS);
            const c = Math.floor(Math.random() * COLS);
            if (!newGrid[r][c].isMine) {
                newGrid[r][c].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate neighbors
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (!newGrid[r][c].isMine) {
                    let count = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            if (r + i >= 0 && r + i < ROWS && c + j >= 0 && c + j < COLS) {
                                if (newGrid[r + i][c + j].isMine) count++;
                            }
                        }
                    }
                    newGrid[r][c].neighborMines = count;
                }
            }
        }

        setGrid(newGrid);
        setFlagsLeft(MINES);
        setExplodedMine(null);
        setGameState("playing");
    };

    const handleCellClick = (r: number, c: number) => {
        if (gameState !== "playing" || grid[r][c].isFlagged || grid[r][c].isRevealed) return;

        const newGrid = [...grid];

        if (newGrid[r][c].isMine) {
            setExplodedMine({ r, c });
            revealAllMines(newGrid);
            setGameState("gameover");
        } else {
            revealCell(newGrid, r, c);
            checkVictory(newGrid);
        }

        setGrid(newGrid);
    };

    const handleContextMenu = (e: React.MouseEvent, r: number, c: number) => {
        e.preventDefault();
        if (gameState !== "playing" || grid[r][c].isRevealed) return;

        const newGrid = [...grid];
        if (newGrid[r][c].isFlagged) {
            newGrid[r][c].isFlagged = false;
            setFlagsLeft(prev => prev + 1);
        } else {
            if (flagsLeft > 0) {
                newGrid[r][c].isFlagged = true;
                setFlagsLeft(prev => prev - 1);
            }
        }
        setGrid(newGrid);
    };

    const revealCell = (board: Cell[][], r: number, c: number) => {
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c].isRevealed || board[r][c].isFlagged) return;

        board[r][c].isRevealed = true;

        if (board[r][c].neighborMines === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    revealCell(board, r + i, c + j);
                }
            }
        }
    };

    const revealAllMines = (board: Cell[][]) => {
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (board[r][c].isMine) {
                    board[r][c].isRevealed = true;
                }
            }
        }
    };

    const checkVictory = (board: Cell[][]) => {
        let unrevealedSafeCells = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (!board[r][c].isMine && !board[r][c].isRevealed) {
                    unrevealedSafeCells++;
                }
            }
        }
        if (unrevealedSafeCells === 0) {
            setGameState("victory");
        }
    };

    const getCellColor = (cell: Cell) => {
        if (cell.isRevealed) {
            if (cell.isMine) return "bg-red-900/50 border-red-900";
            return "bg-white/5 border-white/5";
        }
        return "bg-[#00f3ff]/10 hover:bg-[#00f3ff]/20 border-[#00f3ff]/30 cursor-pointer";
    };

    const getNumberColor = (count: number) => {
        const colors = [
            "", "text-blue-400", "text-green-400", "text-red-400",
            "text-purple-400", "text-yellow-400", "text-pink-400", "text-gray-400"
        ];
        return colors[count] || "";
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
                    LOGIC <span className="text-secondary">GRID</span>
                </h1>
                <p className="text-muted-foreground uppercase tracking-widest text-xs">Hazard Detection v3.0</p>
            </motion.div>

            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5">
                    <Flag className="w-4 h-4 text-red-500" />
                    <span className="font-mono font-bold text-xl">{flagsLeft}</span>
                </div>
                <Button variant="outline" size="sm" onClick={initGame} className="border-white/10 hover:bg-white/5">
                    <RotateCcw className="w-4 h-4" />
                </Button>
            </div>

            <div className={`
                relative p-4 bg-black/50 border border-white/10 rounded-xl shadow-[0_0_50px_rgba(255,255,255,0.05)]
                ${gameState === 'gameover' ? 'border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)]' : ''}
            `}>
                <div className="grid grid-cols-10 gap-1">
                    {grid.map((row, r) => (
                        row.map((cell, c) => (
                            <div
                                key={`${r}-${c}`}
                                onClick={() => handleCellClick(r, c)}
                                onContextMenu={(e) => handleContextMenu(e, r, c)}
                                className={`
                                    w-8 h-8 md:w-10 md:h-10 rounded text-sm md:text-base font-bold flex items-center justify-center transition-colors border
                                    ${getCellColor(cell)}
                                `}
                            >
                                {cell.isRevealed ? (
                                    cell.isMine ? (
                                        <Bomb size={16} className={explodedMine?.r === r && explodedMine?.c === c ? "text-red-500 fill-red-500 animate-pulse" : "text-white"} />
                                    ) : (
                                        cell.neighborMines > 0 && (
                                            <span className={getNumberColor(cell.neighborMines)}>{cell.neighborMines}</span>
                                        )
                                    )
                                ) : (
                                    cell.isFlagged && <Flag size={14} className="text-red-500" />
                                )}
                            </div>
                        ))
                    ))}
                </div>

                <AnimatePresence>
                    {gameState === "start" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-20 rounded-xl"
                        >
                            <Button variant="neon" size="lg" onClick={initGame} className="bg-secondary hover:bg-secondary/80 border-secondary">
                                <Play className="mr-2 h-4 w-4" />
                                SCAN GRID
                            </Button>
                            <p className="mt-6 text-xs text-muted-foreground">Click to Reveal • Right Click to Flag</p>
                        </motion.div>
                    )}

                    {(gameState === "gameover" || gameState === "victory") && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center backdrop-blur-md z-20 rounded-xl"
                        >
                            <div className="text-center mb-6">
                                <Trophy className={`w-16 h-16 mx-auto mb-2 ${gameState === "victory" ? "text-yellow-400" : "text-red-500"}`} />
                                <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">
                                    {gameState === "victory" ? "GRID SECURED" : "FATAL ERROR"}
                                </h2>
                                <p className="text-secondary text-sm font-bold">
                                    {gameState === "victory" ? "ALL MINES FLAGGED" : "SYSTEM CRASHED"}
                                </p>
                            </div>
                            <Button variant="neon" onClick={initGame} className="bg-secondary hover:bg-secondary/80 border-secondary flex gap-2">
                                <RotateCcw size={18} />
                                REBOOT
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="mt-8 max-w-xl text-center">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &quot;A recursive search algorithm test. Tread carefully.&quot;
                </p>
            </div>
        </div>
    );
}
