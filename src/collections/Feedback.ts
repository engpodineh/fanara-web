import type { CollectionConfig } from 'payload'
import { sendNotification, esc, SITE_URL } from '../lib/notify'
import { anyone, isStaff, isAdmin } from '../access'

// Visitor comments from the exit feedback box. Anyone can submit; only staff can read.
export const Feedback: CollectionConfig = {
  slug: 'feedback',
  labels: { singular: { fa: 'نظر بازدیدکننده', en: 'Visitor feedback' }, plural: { fa: 'نظرات بازدیدکنندگان', en: 'Visitor feedback' } },
  admin: { useAsTitle: 'message', defaultColumns: ['message', 'locale', 'page', 'createdAt'], group: { fa: 'نظرات و کامنت‌ها', en: 'Comments' }, description: { fa: 'نظراتی که بازدیدکنندگان هنگام خروج از سایت در جعبه‌ی نظرسنجی نوشته‌اند.', en: 'Comments visitors left in the exit feedback box.' } },
  access: { read: isStaff, create: anyone, update: isAdmin, delete: isAdmin },
  defaultSort: '-createdAt',
  hooks: {
    afterChange: [({ doc, operation, req }) => {
      if (operation === 'create') void sendNotification(req.payload, 'feedback', '💬 نظر جدید در سایت فن آرا', `<h3 style="margin:0">نظر جدید (نظرسنجی خروج)</h3><p>${esc(doc.message).replace(/\n/g, '<br>')}</p><p style="color:#666">زبان: ${esc(doc.locale)} · صفحه: ${esc(doc.page)}</p><p><a href="${SITE_URL}/admin/collections/feedback/${doc.id}">مشاهده در پنل مدیریت</a></p>`)
      return doc
    }],
  },
  fields: [
    { name: 'message', type: 'textarea', required: true, maxLength: 2000, label: { fa: 'نظر', en: 'Comment' } },
    { name: 'locale', type: 'text', maxLength: 5, admin: { readOnly: true } },
    { name: 'page', type: 'text', maxLength: 200, admin: { readOnly: true } },
  ],
}
