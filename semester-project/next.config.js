/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "books.google.com",
      "images.unsplash.com",
      "lh3.googleusercontent.com",
    ],
  },
  env: {
    API_KEY: process.env.API_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
