import { MiddlewareHandlerContext } from "$fresh/server.ts";

const CSP = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
`
  .replace(/\s{2,}/g, " ")
  .trim();

export async function handler(_req: Request, ctx: MiddlewareHandlerContext) {
  const res = await ctx.next();

  // Set Security Headers
  // see: https://nextjs.org/docs/advanced-features/security-headers
  res.headers.set("X-DNS-Prefetch-Control", "on");
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "origin-when-cross-origin");
  res.headers.set("Content-Security-Policy", CSP);

  return res;
}
