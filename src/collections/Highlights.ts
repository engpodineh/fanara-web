import type { CollectionConfig } from 'payload'
import { anyone, isStaff } from '../access'

export const Highlights: CollectionConfig = {
  slug: 'highlights',
  labels: { singular: { fa: 'هایلایت', en: 'Highlight' }, plural: { fa: 'هایلایت‌ها و استوری', en: 'Highlights' } },
  admin: { useAsTitle: 'caption', defaultColumns: ['caption', 'album', 'source', 'createdAt'], group: { fa: 'محتوا', en: 'Content' } },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  defaultSort: '-createdAt',
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media', required: true, label: { fa: 'عکس یا فیلم', en: 'Photo or video' } },
    { name: 'caption', type: 'text', localized: true, label: { fa: 'کپشن', en: 'Caption' } },
    {
      name: 'album', type: 'select', defaultValue: 'site', label: { fa: 'آلبوم', en: 'Album' },
      options: [
        { value: 'site', label: { fa: 'کارگاه', en: 'Site' } },
        { value: 'design', label: { fa: 'طراحی', en: 'Design' } },
        { value: 'team', label: { fa: 'تیم', en: 'Team' } },
        { value: 'academy', label: { fa: 'آموزش', en: 'Academy' } },
      ],
    },
    { name: 'link', type: 'text', label: { fa: 'لینک (پروژه، دوره یا فرم)', en: 'Link' } },
    {
      name: 'source', type: 'select', defaultValue: 'manual', admin: { position: 'sidebar', readOnly: true },
      options: [{ value: 'manual', label: 'Manual' }, { value: 'instagram', label: 'Instagram import' }],
    },
    { name: 'instagramId', type: 'text', admin: { position: 'sidebar', readOnly: true } },
    {
      name: 'shareToInstagram', type: 'checkbox', defaultValue: false, label: { fa: 'انتشار در اینستاگرام', en: 'Publish to Instagram' },
      admin: { position: 'sidebar', description: 'فاز ۲: پس از اتصال حساب اینستاگرام فعال می‌شود' },
    },
  ],
}
