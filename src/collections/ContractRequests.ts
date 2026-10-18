import type { CollectionConfig } from 'payload'
import { sendNotification, contractEmail } from '../lib/notify'
import { anyone, canHandleOrders, isAdmin } from '../access'
import { SCOPES, ROLES_V, CONTRACTS_V } from '../lib/contracting-content'

// Contracting requests from the /contracting page (finishing, MEP, structure, management). Private to staff.
export const ContractRequests: CollectionConfig = {
  slug: 'contract-requests',
  hooks: {
    afterChange: [({ doc, operation, req }) => {
      if (operation === 'create') { const m = contractEmail(doc); void sendNotification(req.payload, 'orders', m.subject, m.html) }
      return doc
    }],
  },
  labels: { singular: { fa: 'درخواست پیمانکاری', en: 'Contracting request' }, plural: { fa: 'درخواست‌های پیمانکاری', en: 'Contracting requests' } },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'company', 'country', 'status', 'createdAt'], group: { fa: 'دفتر مهندسی', en: 'Design office' } },
  access: { read: canHandleOrders, create: anyone, update: canHandleOrders, delete: isAdmin },
  fields: [
    { type: 'row', fields: [
      { name: 'name', type: 'text', required: true, maxLength: 120, label: { fa: 'نام', en: 'Name' } },
      { name: 'company', type: 'text', maxLength: 160, label: { fa: 'شرکت', en: 'Company' } },
      { name: 'role', type: 'select', label: { fa: 'سمت', en: 'Role' }, options: ROLES_V.map((v) => ({ value: v, label: v })) },
    ] },
    { type: 'row', fields: [
      { name: 'phone', type: 'text', required: true, maxLength: 40, label: { fa: 'تلفن / واتساپ', en: 'Phone / WhatsApp' } },
      { name: 'email', type: 'email', label: { fa: 'ایمیل', en: 'Email' } },
    ] },
    { type: 'row', fields: [
      { name: 'country', type: 'text', maxLength: 60, label: { fa: 'کشور', en: 'Country' } },
      { name: 'city', type: 'text', maxLength: 80, label: { fa: 'شهر', en: 'City' } },
    ] },
    { name: 'scopes', type: 'select', hasMany: true, label: { fa: 'محدوده‌ی کار', en: 'Scope' }, options: SCOPES.map((s) => ({ value: s.v, label: { fa: s.l.fa, en: s.l.en } })) },
    { type: 'row', fields: [
      { name: 'contractType', type: 'select', label: { fa: 'نوع قرارداد', en: 'Contract model' }, options: CONTRACTS_V.map((v) => ({ value: v, label: v })) },
      { name: 'projectType', type: 'text', maxLength: 40, label: { fa: 'نوع پروژه', en: 'Project type' } },
    ] },
    { type: 'row', fields: [
      { name: 'area', type: 'number', min: 0, label: { fa: 'متراژ (m²)', en: 'Area (m²)' } },
      { name: 'units', type: 'text', maxLength: 60, label: { fa: 'تعداد واحد / طبقه', en: 'Units / floors' } },
      { name: 'start', type: 'text', maxLength: 80, label: { fa: 'زمان شروع', en: 'Expected start' } },
    ] },
    { name: 'files', type: 'upload', relationTo: 'order-files', hasMany: true, label: { fa: 'نقشه‌ها / BOQ', en: 'Drawings / BOQ' } },
    { name: 'notes', type: 'textarea', maxLength: 4000, label: { fa: 'توضیحات', en: 'Notes' } },
    { name: 'lang', type: 'text', maxLength: 4, label: { fa: 'زبان فرم', en: 'Form language' }, admin: { position: 'sidebar', readOnly: true } },
    {
      name: 'status', type: 'select', defaultValue: 'new', label: { fa: 'وضعیت', en: 'Status' }, access: { create: () => false }, admin: { position: 'sidebar' },
      options: [
        { value: 'new', label: { fa: 'جدید', en: 'New' } },
        { value: 'review', label: { fa: 'بررسی مدارک', en: 'Reviewing' } },
        { value: 'site-visit', label: { fa: 'بازدید از کارگاه', en: 'Site visit' } },
        { value: 'quoted', label: { fa: 'پیشنهاد قیمت ارسال شد', en: 'Quoted' } },
        { value: 'won', label: { fa: 'قرارداد بسته شد', en: 'Won' } },
        { value: 'closed', label: { fa: 'بسته / رد شده', en: 'Closed' } },
      ],
    },
    { name: 'internalNotes', type: 'textarea', label: { fa: 'یادداشت داخلی', en: 'Internal notes' }, access: { create: () => false, read: ({ req }) => !!req.user && ['admin', 'orders'].includes(req.user.role as string) } },
  ],
}
