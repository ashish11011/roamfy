/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allows all hostnames over HTTPS
      },
    ],
  },
};

export default nextConfig;
