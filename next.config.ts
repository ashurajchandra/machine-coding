import type { NextConfig } from "next";

const nextConfig:NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors
  },
};

module.exports = nextConfig;
