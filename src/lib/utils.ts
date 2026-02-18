import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Get the correct asset path considering the basePath configuration
 * In development: basePath is empty
 * In production (GitHub Actions): basePath is '/portfolio'
 */
export function getAssetPath(path: string): string {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // Use the exposed environment variable which aligns with next.config.ts
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    return `${basePath}/${cleanPath}`;
}
