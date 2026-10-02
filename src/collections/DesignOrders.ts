import type { CollectionConfig } from 'payload'
import { anyone, canHandleOrders, isAdmin } from '../access'

export const OrderFiles: CollectionConfig = {
  slug: 'order-files',
  labels: { singular: { fa: 'فایل سفارش', en: 'Order file' }, plural: { fa: 'فایل‌های سفارش', en: 'Order files' } },
  admin: { group: { fa: 'دفتر مهندسی', en: 'Design office' } },
  // Anyone may upload with an order; only staff handling orders may read them.
  access: { read: canHandleOrders, create: anyone, update: canHandleOrders, delete: isAdmin },
  upload: {
    staticDir: 'private/order-files',
    mimeTypes: ['application/pdf', 'image/*', 'application/acad', 'image/vnd.dwg', 'application/octet-stream', 'application/zip'],
  },
  fields: [],
}

export const DesignOrders: CollectionConfig = {
  slug: 'design-orders',
  labels: { singular: { fa: 'سفارش طراحی', en: 'Design order' }, plural: { fa: 'سفارش‌های طراحی', en: 'Design orders' } },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'projectType', 'status', 'createdAt'], group: { fa: 'دفتر مهندسی', en: 'Design office' } },
  access: { read: canHandleOrders, create: anyone, update: canHandleOrders, delete: isAdmin },
  fields: [
    { type: 'row', fields: [
      { name: 'name', type: 'text', required: true, label: { fa: 'نام', en: 'Name' } },
      { name: 'phone', type: 'text', required: true, label: { fa: 'تلفن / واتساپ', en: 'Phone / WhatsApp' } },
      { name: 'email', type: 'email', label: { fa: 'ایمیل', en: 'Email' } },
    ] },
    { type: 'row', fields: [
      { name: 'country', type: 'text', label: { fa: 'کشور', en: 'Country' } },
      { name: 'city', type: 'text', label: { fa: 'شهر', en: 'City' } },
    ] },
    {
      name: 'projectType', type: 'select', required: true, label: { fa: 'نوع پروژه', en: 'Project type' },
      options: [
        { value: 'residential', label: { fa: 'مسکونی', en: 'Residential' } },
        { value: 'commercial', label: { fa: 'تجاری', en: 'Commercial' } },
        { value: 'industrial', label: { fa: 'صنعتی', en: 'Industrial' } },
        { value: 'hotel', label: { fa: 'هتل', en: 'Hotel' } },
        { value: 'petrochemical', label: { fa: 'پتروشیمی', en: 'Petrochemical' } },
        { value: 'other', label: { fa: 'سایر', en: 'Other' } },
      ],
    },
    { type: 'row', fields: [
      { name: 'area', type: 'number', label: { fa: 'متراژ (m²)', en: 'Area (m²)' } },
      { name: 'floors', type: 'number', label: { fa: 'تعداد طبقات / واحد', en: 'Floors / units' } },
    ] },
    { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true, label: { fa: 'خدمات موردنیاز', en: 'Services needed' } },
    { name: 'files', type: 'upload', relationTo: 'order-files', hasMany: true, label: { fa: 'نقشه‌ها و مدارک', en: 'Drawings' } },
    { name: 'deadline', type: 'text', label: { fa: 'زمان‌بندی موردنظر', en: 'Desired timeline' } },
    { name: 'notes', type: 'textarea', label: { fa: 'توضیحات', en: 'Notes' } },
    {
      name: 'status', type: 'select', defaultValue: 'new', label: { fa: 'وضعیت', en: 'Status' },
      access: { create: () => false },
      admin: { position: 'sidebar' },
      options: [
        { value: 'new', label: { fa: 'جدید', en: 'New' } },
        { value: 'review', label: { fa: 'بررسی مدارک', en: 'Reviewing' } },
        { value: 'quoted', label: { fa: 'پیش‌فاکتور ارسال شد', en: 'Quoted' } },
        { value: 'in-design', label: { fa: 'در حال طراحی', en: 'In design' } },
        { value: 'delivered', label: { fa: 'تحویل شد', en: 'Delivered' } },
        { value: 'closed', label: { fa: 'بسته / رد شده', en: 'Closed' } },
      ],
    },
    { name: 'quoteAmount', type: 'text', label: { fa: 'مبلغ پیش‌فاکتور', en: 'Quote' }, access: { create: () => false }, admin: { position: 'sidebar' } },
    { name: 'internalNotes', type: 'textarea', label: { fa: 'یادداشت داخلی', en: 'Internal notes' }, access: { create: () => false, read: ({ req }) => !!req.user && ['admin', 'orders'].includes(req.user.role as string) } },
  ],
}
