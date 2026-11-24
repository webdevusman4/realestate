import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    // Earlier paths of the project site (kept so old links keep working).
    return [
      { source: "/projects/alis-twin-tower", destination: "/alistwintower", permanent: true },
      { source: "/projects/alis-twin-tower/:type", destination: "/alistwintower/apartments/:type", permanent: true },
      { source: "/alis-twin-tower", destination: "/alistwintower", permanent: true },
      { source: "/alis-twin-tower/:path*", destination: "/alistwintower/:path*", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
