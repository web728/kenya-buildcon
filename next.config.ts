import type { NextConfig } from "next";

/**
 * Permanent redirects from the previous kenyabuildcon.com (WordPress) URLs, so
 * indexed pages and shared links keep working after launch.
 */
const legacyRedirects: Array<{ source: string; destination: string }> = [
  { source: "/about-expo", destination: "/about" },
  { source: "/about-organisers", destination: "/organisers" },
  { source: "/exhibitors-information", destination: "/exhibit" },
  { source: "/visitors-information", destination: "/visit" },
  { source: "/exhibitors-registration", destination: "/book-a-stand" },
  { source: "/visitors-registration", destination: "/register-to-visit" },
  { source: "/brochure", destination: "/downloads" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
