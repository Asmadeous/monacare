import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Unsplash placeholders are resized by Unsplash's CDN (see src/lib/image-loader.ts)
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
