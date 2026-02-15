import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

// Add Cloudflare compatibility
if (process.env.NODE_ENV === "production") {
  // Use 'edge' runtime for all routes
  // (Optional: can also be done per-page)
}

export default nextConfig;
