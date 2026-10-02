import type { CollectionConfig } from 'payload'
import { anyone, isStaff } from '../access'

export const Experience: CollectionConfig = {
  slug: 'experience',
  labels: { singular: { fa: 'سابقه کاری', en: 'Experience' }, plural: { fa: 'سوابق کاری', en: 'Experience' } },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'company', 'start', 'end'], group: { fa: 'رزومه', en: 'Resume' } },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  defaultSort: '-start',
  fields: [
    { name: 'title', type: 'text', required: true, localized: true, label: { fa: 'عنوان شغلی', en: 'Job title' } },
    { name: 'company', type: 'text', required: true, localized: true, label: { fa: 'شرکت / پروژه', en: 'Company / project' } },
    { name: 'location', type: 'text', localized: true, label: { fa: 'محل', en: 'Location' } },
    {
      type: 'row', fields: [
        { name: 'start', type: 'date', required: true, label: { fa: 'شروع', en: 'Start' }, admin: { date: { pickerAppearance: 'monthOnly', displayFormat: 'MMM yyyy' } } },
        { name: 'end', type: 'date', label: { fa: 'پایان', en: 'End' }, admin: { condition: (d) => !d.current, date: { pickerAppearance: 'monthOnly', displayFormat: 'MMM yyyy' } } },
        { name: 'current', type: 'checkbox', label: { fa: 'تا کنون', en: 'Current' } },
      ],
    },
    { name: 'bullets', type: 'array', localized: true, label: { fa: 'شرح وظایف', en: 'Highlights' }, fields: [{ name: 'text', type: 'textarea', required: true }] },
    { name: 'project', type: 'relationship', relationTo: 'projects', label: { fa: 'پروژه‌ی مرتبط', en: 'Linked project' } },
  ],
}
