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

    // Check if we're in GitHub Actions build (production)
    const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
    const basePath = isGithubActions ? '/portfolio' : '';

    return `${basePath}/${cleanPath}`;
}
