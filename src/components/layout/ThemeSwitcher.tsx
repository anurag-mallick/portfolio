"use client";

import React from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
    return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted text-muted-foreground">
            <Terminal size={16} />
            <span className="text-sm font-bold uppercase tracking-tighter">Terminal</span>
        </div>
    );
}
