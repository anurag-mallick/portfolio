"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * Returns true when the user prefers reduced motion.
 * Use this to skip heavy animations, particles, and 3D effects.
 */
export function useReducedMotion(): boolean {
    return useMediaQuery("(prefers-reduced-motion: reduce)");
}
