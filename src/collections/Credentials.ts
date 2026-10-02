import type { CollectionConfig } from 'payload'
import { anyone, isStaff } from '../access'

export const Credentials: CollectionConfig = {
  slug: 'credentials',
  labels: { singular: { fa: 'مدرک', en: 'Credential' }, plural: { fa: 'تحصیلات و مدارک', en: 'Education & certificates' } },
  admin: { useAsTitle: 'title', group: { fa: 'رزومه', en: 'Resume' } },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  defaultSort: 'order',
  fields: [
    {
      name: 'kind', type: 'select', required: true, label: { fa: 'نوع', en: 'Type' },
      options: [
        { value: 'degree', label: { fa: 'مدرک تحصیلی', en: 'Degree' } },
        { value: 'certificate', label: { fa: 'گواهی‌نامه', en: 'Certificate' } },
        { value: 'award', label: { fa: 'تقدیرنامه', en: 'Award' } },
      ],
    },
    { name: 'title', type: 'text', required: true, localized: true, label: { fa: 'عنوان', en: 'Title' } },
    { name: 'issuer', type: 'text', localized: true, label: { fa: 'صادرکننده', en: 'Issuer' } },
    { type: 'row', fields: [
      { name: 'year', type: 'text', label: { fa: 'سال', en: 'Year' } },
      { name: 'hours', type: 'number', label: { fa: 'ساعت', en: 'Hours' } },
      { name: 'order', type: 'number', defaultValue: 100 },
    ] },
    { name: 'verifyUrl', type: 'text', label: { fa: 'لینک استعلام', en: 'Verification link' } },
    {
      name: 'image', type: 'upload', relationTo: 'media', label: { fa: 'تصویر مدرک', en: 'Image' },
      admin: { description: '⚠️ قبل از آپلود، کد ملی و اطلاعات شخصی را محو کنید. این تصویر عمومی است.' },
    },
  ],
}
