const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@mantine/core"],
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
