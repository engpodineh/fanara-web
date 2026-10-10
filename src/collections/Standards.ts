import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

/** Private standards bank. Admin-only; never exposed to the public API. */
export const StandardFiles: CollectionConfig = {
  slug: 'standard-files',
  labels: { singular: { fa: 'فایل استاندارد', en: 'Standard file' }, plural: { fa: 'فایل‌های استاندارد', en: 'Standard files' } },
  admin: { group: { fa: 'بانک استاندارد (خصوصی)', en: 'Standards bank (private)' } },
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  upload: { staticDir: 'private/standards', mimeTypes: ['application/pdf', 'text/plain'] },
  fields: [],
}

export const Standards: CollectionConfig = {
  slug: 'standards',
  labels: { singular: { fa: 'استاندارد', en: 'Standard' }, plural: { fa: 'استانداردها', en: 'Standards' } },
  admin: { useAsTitle: 'title', defaultColumns: ['number', 'title', 'discipline', 'status', 'accessTier'], group: { fa: 'بانک استاندارد (خصوصی)', en: 'Standards bank (private)' } },
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    { name: 'title', type: 'text', required: true, label: { fa: 'عنوان', en: 'Title' } },
    { type: 'row', fields: [
      { name: 'publisher', type: 'text', label: { fa: 'ناشر', en: 'Publisher' } },
      { name: 'number', type: 'text', label: { fa: 'شماره', en: 'Number' } },
      { name: 'edition', type: 'text', label: { fa: 'ویرایش', en: 'Edition' } },
      { name: 'year', type: 'text', label: { fa: 'سال', en: 'Year' } },
    ] },
    { type: 'row', fields: [
      {
        name: 'discipline', type: 'select', required: true, label: { fa: 'رشته', en: 'Discipline' },
        options: ['mechanical', 'electrical', 'fire', 'architecture', 'civil', 'structural', 'energy', 'general'].map((v) => ({ value: v, label: v })),
      },
      { name: 'country', type: 'select', defaultValue: 'IR', options: ['IR', 'IQ', 'OM', 'US', 'UK', 'EU', 'INT'].map((v) => ({ value: v, label: v })) },
    ] },
    { type: 'row', fields: [
      {
        name: 'status', type: 'select', required: true, defaultValue: 'valid', label: { fa: 'وضعیت', en: 'Status' },
        options: [
          { value: 'valid', label: { fa: 'معتبر', en: 'Valid' } },
          { value: 'superseded', label: { fa: 'منسوخ', en: 'Superseded' } },
          { value: 'verify', label: { fa: 'نیاز به بررسی', en: 'Verify' } },
        ],
      },
      {
        name: 'accessTier', type: 'select', required: true, defaultValue: 'private', label: { fa: 'سطح دسترسی', en: 'Access tier' },
        admin: { description: 'عمومی‌پذیر = دستیار عمومی می‌تواند به آن ارجاع دهد. پیش‌فرض: خصوصی' },
        options: [
          { value: 'public', label: { fa: 'عمومی‌پذیر', en: 'Assistant may cite' } },
          { value: 'private', label: { fa: 'فقط خصوصی', en: 'Private only' } },
        ],
      },
    ] },
    { name: 'file', type: 'upload', relationTo: 'standard-files', label: { fa: 'فایل', en: 'File' } },
    { name: 'indexed', type: 'checkbox', defaultValue: false, label: { fa: 'وارد دستیار شده', en: 'Indexed for assistant' }, admin: { readOnly: true, description: 'فاز ۳' } },
    { name: 'notes', type: 'textarea', label: { fa: 'یادداشت', en: 'Notes' } },
  ],
}
