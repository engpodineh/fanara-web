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
        { value: 'design', label: { fa: 'طراحی', en: 'Design' } },
        { value: 'management', label: { fa: 'مدیریت', en: 'Management' } },
      ],
    },
    { name: 'photo', type: 'upload', relationTo: 'media', required: true, label: { fa: 'عکس', en: 'Photo' } },
    { name: 'bio', type: 'textarea', localized: true, label: { fa: 'توضیح کوتاه', en: 'Short bio' } },
    { name: 'published', type: 'checkbox', defaultValue: true, label: { fa: 'نمایش در سایت', en: 'Published' }, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', defaultValue: 100, label: { fa: 'ترتیب', en: 'Order' }, admin: { position: 'sidebar' } },
  ],
}
