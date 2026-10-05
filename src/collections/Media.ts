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
  fields: [
    { name: 'alt', type: 'text', localized: true, label: { fa: 'متن جایگزین / توضیح', en: 'Alt text / caption' } },
    { name: 'inGallery', type: 'checkbox', defaultValue: false, index: true, label: { fa: 'نمایش در گالری', en: 'Show in gallery' }, admin: { position: 'sidebar' } },
    {
      name: 'category', type: 'select', index: true, label: { fa: 'دسته‌ی گالری', en: 'Gallery category' }, admin: { position: 'sidebar' },
      options: [
        { value: 'site', label: { fa: 'کارگاه و اجرا', en: 'Site & execution' } },
        { value: 'mep', label: { fa: 'تأسیسات مکانیکی و برقی', en: 'MEP systems' } },
        { value: 'design', label: { fa: 'طراحی و نقشه', en: 'Design & drawings' } },
        { value: 'team', label: { fa: 'تیم', en: 'Team' } },
        { value: 'management', label: { fa: 'مدیریت و تقدیر', en: 'Management & awards' } },
      ],
    },
    { name: 'sourceFile', type: 'text', index: true, admin: { hidden: true } },
    { name: 'order', type: 'number', defaultValue: 100, label: { fa: 'ترتیب', en: 'Order' }, admin: { position: 'sidebar' } },
  ],
}
