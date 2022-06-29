/* @ts-check */

/* @type {import("next").NextConfig} */
const config = {
  swcMinify: true,
  experimental: {
    browsersListForSwc: true,
    legacyBrowsers: false,
    runtime: "experimental-edge",
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default config;
