import { APIError, type CollectionConfig } from 'payload'
import { anyone, isAdmin, adminField } from '../access'

const has = (u: unknown, roles: string[]) => !!u && roles.includes((u as { role?: string }).role ?? '')

// Public comments on highlights/stories. Anyone can post; everyone sees visible comments;
// the owner can hide or delete any comment from the admin panel.
export const HighlightComments: CollectionConfig = {
  slug: 'highlight-comments',
  labels: { singular: { fa: 'کامنت هایلایت', en: 'Highlight comment' }, plural: { fa: 'کامنت‌های هایلایت‌ها', en: 'Highlight comments' } },
  admin: { useAsTitle: 'message', defaultColumns: ['message', 'name', 'highlight', 'hidden', 'createdAt'], group: { fa: 'نظرات و کامنت‌ها', en: 'Comments' } },
  access: {
    read: ({ req }) => (has(req.user, ['admin', 'editor']) ? true : { hidden: { not_equals: true } }),
    create: anyone,
    update: isAdmin,
    delete: isAdmin,
  },
  defaultSort: '-createdAt',
  hooks: {
    beforeValidate: [({ data, operation, req }) => {
      if (operation === 'create' && data && !req.user) {
        data.hidden = false
        // Spam guard: links are not allowed in public comments.
        if (/(https?:\/\/|www\.|\.(com|net|org|ir|iq|xyz|ru)\b)/i.test(String(data.message ?? '') + String(data.name ?? ''))) {
          throw new APIError('Links are not allowed', 400)
        }
      }
      return data
    }],
  },
  fields: [
    { name: 'highlight', type: 'relationship', relationTo: 'highlights', required: true, index: true, label: { fa: 'هایلایت', en: 'Highlight' } },
    { name: 'name', type: 'text', required: true, maxLength: 40, label: { fa: 'نام', en: 'Name' } },
    { name: 'message', type: 'textarea', required: true, maxLength: 500, label: { fa: 'کامنت', en: 'Comment' } },
    { name: 'hidden', type: 'checkbox', defaultValue: false, index: true, access: { create: adminField, update: adminField }, label: { fa: 'مخفی (نمایش داده نشود)', en: 'Hidden' }, admin: { position: 'sidebar' } },
  ],
}
