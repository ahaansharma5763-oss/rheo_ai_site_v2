import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/ava", destination: "/sales-engineer", permanent: true },
      { source: "/pulse", destination: "/okeanos", permanent: true },
    ];
  },
};

export default nextConfig;
