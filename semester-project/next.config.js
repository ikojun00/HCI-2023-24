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
    NEXT_PUBLIC_SECRET: process.env.NEXT_PUBLIC_SECRET,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
