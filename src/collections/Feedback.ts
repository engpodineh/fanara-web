import type { CollectionConfig } from 'payload'
import { anyone, isStaff, isAdmin } from '../access'

// Visitor comments from the exit feedback box. Anyone can submit; only staff can read.
export const Feedback: CollectionConfig = {
  slug: 'feedback',
  labels: { singular: { fa: 'نظر بازدیدکننده', en: 'Visitor feedback' }, plural: { fa: 'نظرات بازدیدکنندگان', en: 'Visitor feedback' } },
  admin: { useAsTitle: 'message', defaultColumns: ['message', 'locale', 'page', 'createdAt'], group: { fa: 'دفتر مهندسی', en: 'Design office' } },
  access: { read: isStaff, create: anyone, update: isAdmin, delete: isAdmin },
  defaultSort: '-createdAt',
  fields: [
    { name: 'message', type: 'textarea', required: true, maxLength: 2000, label: { fa: 'نظر', en: 'Comment' } },
    { name: 'locale', type: 'text', maxLength: 5, admin: { readOnly: true } },
    { name: 'page', type: 'text', maxLength: 200, admin: { readOnly: true } },
  ],
}
