import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const basePath = isGithubActions ? '/portfolio' : '';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

};

// Add Cloudflare compatibility
if (process.env.NODE_ENV === "production") {
  // Use 'edge' runtime for all routes
  // (Optional: can also be done per-page)
}

export default nextConfig;
