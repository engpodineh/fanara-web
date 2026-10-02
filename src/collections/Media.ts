import type { CollectionConfig } from 'payload'
import { anyone, isStaff } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: { fa: 'رسانه', en: 'Media' }, plural: { fa: 'رسانه‌ها', en: 'Media' } },
  admin: { group: { fa: 'محتوا', en: 'Content' } },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'video/mp4', 'video/webm', 'application/pdf'],
    imageSizes: [
      { name: 'thumb', width: 400, formatOptions: { format: 'webp', options: { quality: 75 } } },
      { name: 'card', width: 900, formatOptions: { format: 'webp', options: { quality: 75 } } },
      { name: 'hero', width: 1920, formatOptions: { format: 'webp', options: { quality: 72 } } },
    ],
    focalPoint: true,
  },
  fields: [{ name: 'alt', type: 'text', localized: true, label: { fa: 'متن جایگزین', en: 'Alt text' } }],
}
