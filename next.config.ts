import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https"
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https"
      },
       {
        hostname: "d19-a.sdn.cz",
        protocol: "https"
      }
    ],
  },
};

export default nextConfig;
