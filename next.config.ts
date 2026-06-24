import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? "/elbmind" : undefined,
  assetPrefix: isGithubPages ? "/elbmind/" : undefined,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
