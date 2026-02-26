"use client";

import { useState, useEffect } from "react";

/**
 * SSR-safe media query hook.
 * Returns false during SSR/hydration, then updates to the actual match.
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
}

/** Convenience: true when viewport is < 768px */
export function useIsMobile(): boolean {
    return useMediaQuery("(max-width: 767px)");
}

/** Convenience: true when viewport is < 1024px */
export function useIsTablet(): boolean {
    return useMediaQuery("(max-width: 1023px)");
}
