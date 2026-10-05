import { withPayload } from '@payloadcms/next/withPayload'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ['image/webp'] },
}
export default withPayload(nextConfig, { devBundleServerPackages: false })
