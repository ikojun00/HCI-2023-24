/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["books.google.com", "images.unsplash.com"],
  },
  env: {
    API_KEY: process.env.API_KEY,
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
