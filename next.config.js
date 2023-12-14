/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@mantine/core"],
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
