/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true, // Ensures the App Router is enabled
    },
    reactStrictMode: true, // Optional: Enforces best practices
    env: {
      NEXT_PUBLIC_SPOONACULAR_API_KEY: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY, // Ensures the API key is exposed
    },
  };
  
  export default nextConfig;
  