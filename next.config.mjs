/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "project-images-development.s3.me-central-1.amazonaws.com",
        pathname: "/**", // Matches all paths
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // disables ESLint during production builds
  },
};

export default withNextIntl(nextConfig);
