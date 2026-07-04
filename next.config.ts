import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 output:'standalone',
 compiler: {
    styledComponents: true, // Enables consistent classname hashing
  },
};

export default nextConfig;

