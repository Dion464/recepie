/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enforces best practices (optional)
  env: {
    NEXT_PUBLIC_SPOONACULAR_API_KEY: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY, // Ensures the API key is exposed
  },
  images: {
    domains: ['img.spoonacular.com'], // Add allowed image domains here
  },
};

export default nextConfig;
