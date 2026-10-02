import type { CollectionConfig } from 'payload'
import { isStaff, publishedOrStaff } from '../access'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: { fa: 'پروژه', en: 'Project' }, plural: { fa: 'پروژه‌ها', en: 'Projects' } },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'status', 'featured', 'published'], group: { fa: 'محتوا', en: 'Content' } },
  access: { read: publishedOrStaff, create: isStaff, update: isStaff, delete: isStaff },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true, localized: true, label: { fa: 'عنوان', en: 'Title' } },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { position: 'sidebar' } },
    { name: 'published', type: 'checkbox', defaultValue: false, label: { fa: 'منتشر شود', en: 'Published' }, admin: { position: 'sidebar' } },
    { name: 'featured', type: 'checkbox', defaultValue: false, label: { fa: 'نمایش در صفحه اصلی', en: 'Featured' }, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', defaultValue: 100, admin: { position: 'sidebar' } },
    {
      name: 'showClientName', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'فقط با اجازه‌ی کارفرما فعال شود' },
      label: { fa: 'نمایش نام کارفرما', en: 'Show client name' },
    },
    {
      name: 'status', type: 'select', required: true, defaultValue: 'delivered', label: { fa: 'وضعیت', en: 'Status' },
      options: [
        { value: 'delivered', label: { fa: 'تحویل‌شده', en: 'Delivered' } },
        { value: 'in-progress', label: { fa: 'در حال اجرا', en: 'In progress' } },
      ],
    },
    {
      name: 'category', type: 'select', required: true, defaultValue: 'execution', label: { fa: 'دسته', en: 'Category' },
      admin: { description: 'اجرا = رزومه‌ی شخصی · طراحی = نمونه‌کار دفتر فن‌آرا' },
      options: [
        { value: 'execution', label: { fa: 'اجرا (رزومه)', en: 'Execution (resume)' } },
        { value: 'design', label: { fa: 'طراحی (دفتر فن‌آرا)', en: 'Design (Fanara office)' } },
      ],
    },
    {
      type: 'row', fields: [
        { name: 'client', type: 'text', localized: true, label: { fa: 'کارفرما', en: 'Client' } },
        { name: 'location', type: 'text', localized: true, label: { fa: 'محل', en: 'Location' } },
        { name: 'period', type: 'text', label: { fa: 'بازه‌ی زمانی', en: 'Period' }, admin: { description: 'مثلاً 2023 – 2025' } },
      ],
    },
    { name: 'role', type: 'text', localized: true, label: { fa: 'نقش ما', en: 'Our role' } },
    { name: 'summary', type: 'textarea', localized: true, label: { fa: 'خلاصه', en: 'Summary' } },
    { name: 'body', type: 'richText', localized: true, label: { fa: 'شرح کامل', en: 'Details' } },
    {
      name: 'credits', type: 'array', label: { fa: 'طراحان هر رشته', en: 'Discipline credits' },
      fields: [
        { name: 'discipline', type: 'text', localized: true, required: true, label: { fa: 'رشته', en: 'Discipline' } },
        { name: 'person', type: 'text', required: true, label: { fa: 'طراح', en: 'Designer' } },
      ],
    },
    {
      name: 'systems', type: 'select', hasMany: true, label: { fa: 'سیستم‌ها', en: 'Systems' },
      options: ['hvac', 'plumbing', 'drainage', 'fire', 'gas', 'electrical-power', 'lighting', 'low-current', 'plant-room', 'finishing', 'architecture', 'infrastructure'].map((v) => ({ value: v, label: v })),
    },
    { name: 'cover', type: 'upload', relationTo: 'media', label: { fa: 'تصویر اصلی', en: 'Cover' } },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true, label: { fa: 'گالری', en: 'Gallery' } },
  ],
}
