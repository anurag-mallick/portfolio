"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
    neon?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, neon, children, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    "rounded-xl border bg-card text-card-foreground shadow-sm glass-card overflow-hidden",
                    neon && "shadow-[0_0_15px_rgba(0,243,255,0.1)] border-primary/20",
                    className
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{
                    boxShadow: "0 0 calc(25px * var(--glow-intensity)) color-mix(in srgb, var(--primary) 20%, transparent)",
                    borderColor: "color-mix(in srgb, var(--primary) 40%, transparent)",
                    y: -5
                }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);
Card.displayName = "Card";

export { Card };
