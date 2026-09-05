import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Hosts allowed for <Image src>. The API (Django) returns absolute media URLs.
    // Add the production media host here once known.
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/media/**" },
    ],
  },
};

export default nextConfig;
