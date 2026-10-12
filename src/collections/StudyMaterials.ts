import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

/**
 * Teaching materials (booklets, calculators) for Iraqi students.
 * PRIVATE for now: only the admin can list or download them. `published` is a flag for the future public launch —
 * it does NOT expose anything until access rules are deliberately changed.
 */
export const StudyMaterials: CollectionConfig = {
  slug: 'study-materials',
  labels: { singular: { fa: 'محتوای آموزشی', en: 'Study material' }, plural: { fa: 'محتوای آموزشی (خصوصی)', en: 'Study materials (private)' } },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'kind', 'language', 'published', 'updatedAt'], group: { fa: 'آموزش', en: 'Academy' } },
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  upload: { staticDir: 'private/materials', mimeTypes: ['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'] },
  fields: [
    { name: 'title', type: 'text', required: true, label: { fa: 'عنوان', en: 'Title' } },
    { type: 'row', fields: [
      { name: 'kind', type: 'select', defaultValue: 'booklet', label: { fa: 'نوع', en: 'Kind' }, options: [
        { value: 'booklet', label: { fa: 'جزوه', en: 'Booklet' } },
        { value: 'calculator', label: { fa: 'ماشین‌حساب اکسل', en: 'Excel calculator' } },
      ] },
      { name: 'language', type: 'select', defaultValue: 'ar', label: { fa: 'زبان', en: 'Language' }, options: ['ar', 'fa', 'en'].map((v) => ({ value: v, label: v })) },
      { name: 'order', type: 'number', defaultValue: 100, label: { fa: 'ترتیب', en: 'Order' } },
    ] },
    { name: 'published', type: 'checkbox', defaultValue: false, label: { fa: 'آماده‌ی انتشار عمومی (فعلاً فقط علامت است و چیزی را عمومی نمی‌کند)', en: 'Ready for public launch (flag only)' } },
    { name: 'notes', type: 'textarea', label: { fa: 'یادداشت خصوصی', en: 'Private notes' } },
  ],
}
