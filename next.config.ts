import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — produces an "out/" directory with plain HTML/CSS/JS,
  // ready to deploy on any static host (Netlify, Vercel, Cloudflare Pages...).
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
