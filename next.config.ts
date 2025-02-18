import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "firebasestorage.googleapis.com",
      },
      { hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
