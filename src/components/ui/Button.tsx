"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: "default" | "outline" | "ghost" | "neon";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "md", isLoading, children, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden";

        const variants = {
            default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg",
            outline: "border border-border bg-background hover:bg-muted hover:text-foreground",
            ghost: "hover:bg-muted hover:text-foreground",
            neon: "bg-transparent border border-primary text-primary hover:bg-primary/10 shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]",
        };

        const sizes = {
            sm: "h-9 px-3 text-xs",
            md: "h-11 px-8 text-sm",
            lg: "h-14 px-10 text-base",
        };

        return (
            <motion.button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                whileHover={{ 
                    scale: 1.05, 
                    boxShadow: variant === 'neon' ? "0 0 20px rgba(var(--primary-rgb), 0.5)" : "none" 
                }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span className="relative z-10 flex items-center gap-2 drop-shadow-md">{children}</span>
                {variant === "neon" && (
                    <div className="absolute inset-0 bg-primary/10 blur-md -z-0" />
                )}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
