import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack: (config) => {
  //   config.externals.push({
  //     "utf-8-validate": "commonjs utf-8-validate",
  //     bufferutil: "commonjs bufferutil",
  //   });

  //   return config;
  // },
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
