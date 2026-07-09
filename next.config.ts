import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/ava", destination: "/sales-engineer", permanent: true },
    ];
  },
};

export default nextConfig;
