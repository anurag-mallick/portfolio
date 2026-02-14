import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// Add Cloudflare compatibility
if (process.env.NODE_ENV === "production") {
  // Use 'edge' runtime for all routes
  // (Optional: can also be done per-page)
}

export default nextConfig;
