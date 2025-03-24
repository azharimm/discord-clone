import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uilr73pxo6.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
