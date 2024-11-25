import MillionLint from "@million/lint";

/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@mantine/core"],
  },
};

// export default MillionLint.next({ rsc: true })(nextConfig);
export default nextConfig;
