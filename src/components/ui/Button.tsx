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
            default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_10px_rgba(0,243,255,0.3)] hover:shadow-[0_0_20px_rgba(0,243,255,0.5)]",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            neon: "bg-transparent border border-primary text-primary shadow-[0_0_10px_inset_rgba(0,243,255,0.2)] hover:bg-primary/10 hover:shadow-[0_0_20px_inset_rgba(0,243,255,0.4),0_0_10px_rgba(0,243,255,0.4)]",
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span className="relative z-10 flex items-center gap-2">{children}</span>
                {variant === "neon" && (
                    <div className="absolute inset-0 bg-primary/5 blur-xl -z-0" />
                )}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
