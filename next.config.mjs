import { withPayload } from '@payloadcms/next/withPayload'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pages use plain <img>; disable the image optimizer endpoint entirely (smaller attack surface).
  images: { unoptimized: true },
  poweredByHeader: false,
  // update.sh builds into a separate folder, then swaps it in (no broken pages during a build).
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // Daftar Fanni Yar demo is a static page in public/dfy-demo
  async rewrites() { return [{ source: '/dfy-demo', destination: '/dfy-demo/index.html' }] },
}
export default withPayload(nextConfig, { devBundleServerPackages: false })
