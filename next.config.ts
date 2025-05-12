import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['flagcdn.com'], // Add this line
    // You can add other image domains if needed
  },
};

export default nextConfig;
