import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/ava", destination: "/sales-engineer", permanent: true },
      // 2026-07-29 rebuild: named-product pages fold into the homepage
      // narrative. Source files are kept for future outbound landers;
      // redirects are checked before the filesystem, so the routes are dark.
      // kai/nami are 307 (not permanent) because they may relaunch as
      // outbound landers and 308s get cached by browsers forever.
      { source: "/kai", destination: "/", permanent: false },
      { source: "/nami", destination: "/", permanent: false },
      { source: "/pulse", destination: "/", permanent: true },
      { source: "/pilot", destination: "/", permanent: true },
      { source: "/okeanos", destination: "/", permanent: true },
      { source: "/revival-sprint", destination: "/", permanent: true },
      // 2026-09-29: the Managed Outbound page lives at the short address
      { source: "/managed-outbound", destination: "/outbound", permanent: true },
    ];
  },
};

export default nextConfig;
