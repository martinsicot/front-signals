import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

if (!isDev && !process.env.MEDIA_HOST) {
  throw new Error("Missing required environment variable: MEDIA_HOST");
}

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
