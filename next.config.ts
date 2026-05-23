import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.wsupercars.com" },
      { protocol: "https", hostname: "wallpapercave.com" },
      { protocol: "https", hostname: "www.jdmorlandoinc.com" },
      { protocol: "https", hostname: "global.honda" },
      { protocol: "https", hostname: "www.ndestore.com" },
      { protocol: "https", hostname: "thumbs.dreamstime.com" },
      { protocol: "https", hostname: "www.momentummotorworks.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      {
        protocol: "https",
        hostname: "skl-sklc-tinymce-2021.s3.amazonaws.com",
      },
      { protocol: "https", hostname: "cdn.ecommercedns.uk" },
    ],
  },
};

export default nextConfig;
