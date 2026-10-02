import type { CollectionConfig } from 'payload'
import { anyone, isStaff } from '../access'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: { fa: 'خدمت', en: 'Service' }, plural: { fa: 'خدمات دفتر', en: 'Office services' } },
  admin: { useAsTitle: 'title', group: { fa: 'دفتر مهندسی', en: 'Design office' } },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  defaultSort: 'order',
  fields: [
    { type: 'row', fields: [
      { name: 'code', type: 'text', required: true, label: { fa: 'کد', en: 'Code' } },
      { name: 'order', type: 'number', defaultValue: 100 },
    ] },
    { name: 'title', type: 'text', required: true, localized: true, label: { fa: 'عنوان', en: 'Title' } },
    { name: 'description', type: 'textarea', localized: true, label: { fa: 'شرح', en: 'Description' } },
  ],
}
