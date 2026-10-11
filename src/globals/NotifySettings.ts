import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'
import { sendNotification } from '../lib/notify'

// Email alerts for new orders / feedback / comments. Admin-only: the app password is never readable by anyone else.
export const NotifySettings: GlobalConfig = {
  slug: 'notify-settings',
  label: { fa: 'اطلاع‌رسانی ایمیلی', en: 'Email alerts' },
  admin: { group: { fa: 'تنظیمات', en: 'Settings' } },
  access: { read: isAdmin, update: isAdmin },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: false, label: { fa: 'ارسال ایمیل فعال باشد', en: 'Send email alerts' } },
    { type: 'row', fields: [
      { name: 'smtpUser', type: 'email', label: { fa: 'جیمیل فرستنده', en: 'Gmail address (sender)' }, admin: { description: 'مثلاً fanarateb@gmail.com' } },
      {
        name: 'smtpPass', type: 'text', label: { fa: 'رمز برنامه (App Password) گوگل', en: 'Google app password' },
        admin: { description: 'رمز اصلی جیمیل نیست. از myaccount.google.com → Security → App passwords یک رمز ۱۶ حرفی بسازید.' },
      },
    ] },
    { name: 'to', type: 'text', label: { fa: 'ایمیل(های) گیرنده', en: 'Send alerts to' }, admin: { description: 'خالی = همان جیمیل فرستنده. چند ایمیل را با ویرگول جدا کنید.' } },
    { type: 'row', fields: [
      { name: 'onOrders', type: 'checkbox', defaultValue: true, label: { fa: 'سفارش طراحی جدید', en: 'New design order' } },
      { name: 'onFeedback', type: 'checkbox', defaultValue: true, label: { fa: 'نظرسنجی جدید', en: 'New feedback' } },
      { name: 'onComments', type: 'checkbox', defaultValue: true, label: { fa: 'کامنت جدید هایلایت', en: 'New highlight comment' } },
    ] },
    { name: 'sendTest', type: 'checkbox', defaultValue: false, label: { fa: 'بعد از ذخیره یک ایمیل آزمایشی بفرست', en: 'Send a test email after saving' } },
    { name: 'lastResult', type: 'text', label: { fa: 'نتیجه‌ی آخرین ارسال', en: 'Last send result' }, admin: { readOnly: true } },
  ],
  hooks: {
    afterChange: [async ({ doc, req }) => {
      if (!doc?.sendTest) return doc
      const r = await sendNotification(req.payload, 'test', 'ایمیل آزمایشی سایت فن آرا', '<p>اطلاع‌رسانی ایمیلی سایت engfanara.com درست کار می‌کند ✅</p>', doc)
      await req.payload.updateGlobal({ slug: 'notify-settings', data: { sendTest: false, lastResult: `${new Date().toISOString().slice(0, 16).replace('T', ' ')} — ${r}` } as any, overrideAccess: true, req })
      return doc
    }],
  },
}
