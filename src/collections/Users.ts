import type { CollectionConfig } from 'payload'
import { isAdmin, adminField } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: { fa: 'کاربر', en: 'User' }, plural: { fa: 'کاربران', en: 'Users' } },
  auth: { tokenExpiration: 60 * 60 * 8 },
  admin: { useAsTitle: 'email', group: { fa: 'تنظیمات', en: 'Settings' } },
  access: {
    read: ({ req }) => (!req.user ? false : req.user.role === 'admin' ? true : { id: { equals: req.user.id } }),
    create: isAdmin, delete: isAdmin,
    update: ({ req }) => (!req.user ? false : req.user.role === 'admin' ? true : { id: { equals: req.user.id } }),
  },
  fields: [
    { name: 'name', type: 'text', label: { fa: 'نام', en: 'Name' } },
    {
      name: 'role', type: 'select', required: true, defaultValue: 'customer', saveToJWT: true,
      access: { update: adminField },
      label: { fa: 'نقش', en: 'Role' },
      options: [
        { value: 'admin', label: { fa: 'مدیر کل', en: 'Admin' } },
        { value: 'editor', label: { fa: 'ویرایشگر محتوا', en: 'Editor' } },
        { value: 'orders', label: { fa: 'کارشناس سفارش', en: 'Orders' } },
        { value: 'instructor', label: { fa: 'مدرس', en: 'Instructor' } },
        { value: 'customer', label: { fa: 'مشتری / دانشجو', en: 'Customer' } },
      ],
    },
  ],
}
