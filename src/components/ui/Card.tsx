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
                whileHover={neon ? {
                    boxShadow: "0 0 25px rgba(0,243,255,0.2)",
                    borderColor: "rgba(0,243,255,0.4)",
                    y: -5
                } : { y: -2 }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);
Card.displayName = "Card";

export { Card };
