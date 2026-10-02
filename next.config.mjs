import { withPayload } from '@payloadcms/next/withPayload'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ['image/webp'] },
  async redirects() { return [{ source: '/', destination: '/fa', permanent: false }] },
}
export default withPayload(nextConfig, { devBundleServerPackages: false })
