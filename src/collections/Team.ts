import type { CollectionConfig } from 'payload'
import { isStaff, publishedOrStaff } from '../access'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: { singular: { fa: 'عضو تیم', en: 'Team member' }, plural: { fa: 'تیم فن آرا', en: 'Team' } },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'position', 'discipline', 'order', 'published'], group: { fa: 'محتوا', en: 'Content' } },
  access: { read: publishedOrStaff, create: isStaff, update: isStaff, delete: isStaff },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true, localized: true, label: { fa: 'نام', en: 'Name' } },
    { name: 'position', type: 'text', required: true, localized: true, label: { fa: 'سمت', en: 'Position' } },
    {
      name: 'discipline', type: 'select', required: true, defaultValue: 'mechanical', label: { fa: 'واحد', en: 'Discipline' },
      options: [
        { value: 'mechanical', label: { fa: 'مکانیک', en: 'Mechanical' } },
        { value: 'electrical', label: { fa: 'برق', en: 'Electrical' } },
        { value: 'civil', label: { fa: 'عمران', en: 'Civil' } },
        { value: 'design', label: { fa: 'طراحی', en: 'Design' } },
        { value: 'management', label: { fa: 'مدیریت', en: 'Management' } },
      ],
    },
    { name: 'photo', type: 'upload', relationTo: 'media', required: true, label: { fa: 'عکس', en: 'Photo' } },
    { name: 'bio', type: 'textarea', localized: true, label: { fa: 'توضیح کوتاه', en: 'Short bio' } },
    { name: 'resume', type: 'textarea', localized: true, label: { fa: 'رزومه (هر سابقه در یک خط)', en: 'Resume (one item per line)' } },
    {
      type: 'collapsible', label: { fa: 'راه‌های ارتباطی', en: 'Contact' }, fields: [
        { type: 'row', fields: [
          { name: 'whatsapp', type: 'text', label: { fa: 'واتساپ', en: 'WhatsApp' }, admin: { description: 'مثلاً +964...' } },
          { name: 'phone', type: 'text', label: { fa: 'تلفن', en: 'Phone' } },
          { name: 'email', type: 'email', label: { fa: 'ایمیل', en: 'Email' } },
        ] },
        { type: 'row', fields: [
          { name: 'instagram', type: 'text', label: { fa: 'اینستاگرام (بدون @)', en: 'Instagram handle' } },
          { name: 'linkedin', type: 'text', label: { fa: 'لینک لینکدین', en: 'LinkedIn URL' } },
        ] },
      ],
    },
    {
      name: 'documents', type: 'array', label: { fa: 'پرونده: رزومه، نامه و مدارک', en: 'Profile documents' },
      admin: { description: 'فایل‌هایی که در صفحه‌ی اختصاصی این نفر برای مشاهده و دانلود نمایش داده می‌شوند (PDF یا تصویر).' },
      fields: [
        { type: 'row', fields: [
          { name: 'title', type: 'text', required: true, localized: true, label: { fa: 'عنوان', en: 'Title' } },
          { name: 'kind', type: 'select', required: true, defaultValue: 'resume', label: { fa: 'نوع', en: 'Kind' }, options: [
            { value: 'resume', label: { fa: 'رزومه', en: 'Résumé' } },
            { value: 'cover-letter', label: { fa: 'نامه', en: 'Cover letter' } },
            { value: 'portfolio', label: { fa: 'نمونه‌کار', en: 'Portfolio' } },
            { value: 'certificate', label: { fa: 'مدرک / گواهی', en: 'Certificate' } },
            { value: 'poster', label: { fa: 'پوستر / معرفی', en: 'Poster' } },
            { value: 'other', label: { fa: 'سایر', en: 'Other' } },
          ] },
          { name: 'lang', type: 'text', label: { fa: 'زبان فایل', en: 'File language' }, admin: { description: 'EN / TR / FA / AR' } },
        ] },
        { type: 'row', fields: [
          { name: 'file', type: 'upload', relationTo: 'media', required: true, label: { fa: 'فایل', en: 'File' } },
          { name: 'preview', type: 'upload', relationTo: 'media', label: { fa: 'تصویر پیش‌نمایش (برای PDF)', en: 'Preview image (for PDFs)' } },
        ] },
      ],
    },
    { name: 'slug', type: 'text', unique: true, index: true, label: { fa: 'آدرس صفحه‌ی اختصاصی', en: 'Profile page slug' }, admin: { position: 'sidebar', description: 'مثلاً behzad-goljaei — اگر پر باشد، کارت این نفر به صفحه‌ی اختصاصی‌اش لینک می‌شود.' } },
    { name: 'published', type: 'checkbox', defaultValue: true, label: { fa: 'نمایش در سایت', en: 'Published' }, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', defaultValue: 100, label: { fa: 'ترتیب', en: 'Order' }, admin: { position: 'sidebar' } },
  ],
}
