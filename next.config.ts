import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      isDev
        ? { protocol: "http", hostname: "localhost", port: "8000", pathname: "/media/**" }
        : { protocol: "https", hostname: process.env.MEDIA_HOST ?? "", pathname: "/media/**" },
    ],
    ...(isDev && { dangerouslyAllowLocalIP: true }),
  },
};

export default nextConfig;
