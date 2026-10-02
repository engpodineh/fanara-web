import type { GlobalConfig } from 'payload'
import { anyone, isStaff } from '../access'

export const Profile: GlobalConfig = {
  slug: 'profile',
  label: { fa: 'پروفایل و صفحه اصلی', en: 'Profile & homepage' },
  admin: { group: { fa: 'رزومه', en: 'Resume' } },
  access: { read: anyone, update: isStaff },
  fields: [
    { type: 'tabs', tabs: [
      { label: { fa: 'صفحه اصلی', en: 'Homepage' }, fields: [
        { name: 'heroEyebrow', type: 'text', localized: true },
        { name: 'heroTitle', type: 'text', localized: true, required: true },
        { name: 'heroText', type: 'textarea', localized: true },
        { name: 'heroImage', type: 'upload', relationTo: 'media' },
      ] },
      { label: { fa: 'مؤسس', en: 'Founder' }, fields: [
        { name: 'name', type: 'text', localized: true, required: true },
        { name: 'role', type: 'text', localized: true },
        { name: 'summary', type: 'textarea', localized: true },
        { name: 'portrait', type: 'upload', relationTo: 'media' },
        { name: 'cvPdf', type: 'upload', relationTo: 'media', localized: true, label: { fa: 'رزومه PDF', en: 'Resume PDF' } },
        { name: 'stats', type: 'array', maxRows: 4, fields: [
          { name: 'value', type: 'text', required: true },
          { name: 'label', type: 'text', localized: true, required: true },
        ] },
        { name: 'languages', type: 'array', fields: [
          { name: 'language', type: 'text', localized: true, required: true },
          { name: 'level', type: 'text', localized: true },
        ] },
        { name: 'skills', type: 'array', fields: [
          { name: 'group', type: 'text', localized: true, required: true },
          { name: 'items', type: 'textarea', localized: true, admin: { description: 'هر مورد در یک خط' } },
        ] },
      ] },
      { label: { fa: 'تماس', en: 'Contact' }, fields: [
        { name: 'whatsapp', type: 'text' }, { name: 'phoneIraq', type: 'text' }, { name: 'email', type: 'email' },
        { name: 'instagramOffice', type: 'text' }, { name: 'instagramPersonal', type: 'text' },
      ] },
    ] },
  ],
}
