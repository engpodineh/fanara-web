import nodemailer from 'nodemailer'
import type { Payload } from 'payload'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://engfanara.com'
export const esc = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

type Kind = 'orders' | 'feedback' | 'comments' | 'test'
const FLAG: Record<Exclude<Kind, 'test'>, string> = { orders: 'onOrders', feedback: 'onFeedback', comments: 'onComments' }

/** Sends an alert email (Gmail SMTP, port 587 — 465/25 are blocked on the VPS). Never throws; returns a short status. */
export async function sendNotification(payload: Payload, kind: Kind, subject: string, html: string, settings?: any): Promise<string> {
  try {
    const s = settings ?? (await payload.findGlobal({ slug: 'notify-settings', overrideAccess: true }).catch(() => null))
    if (!s?.smtpUser || !s?.smtpPass) return 'تنظیم نشده (جیمیل یا رمز برنامه خالی است)'
    if (kind !== 'test' && (!s.enabled || s[FLAG[kind]] === false)) return 'غیرفعال'
    const t = nodemailer.createTransport({ host: 'smtp.gmail.com', port: 587, secure: false, requireTLS: true, auth: { user: s.smtpUser, pass: String(s.smtpPass).replace(/\s+/g, '') }, connectionTimeout: 15_000 })
    await t.sendMail({
      from: `"Eng.Fanara" <${s.smtpUser}>`, to: (s.to || s.smtpUser), subject,
      html: `<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;font-size:14px;line-height:1.8">${html}<hr><p style="color:#888;font-size:12px">engfanara.com</p></div>`,
    })
    return 'ارسال شد'
  } catch (e) {
    payload.logger.error(`notify(${kind}): ${(e as Error).message}`)
    return `خطا: ${(e as Error).message.slice(0, 160)}`
  }
}

const row = (k: string, v: unknown) => (v === undefined || v === null || v === '' ? '' : `<tr><td style="color:#666;padding:2px 10px 2px 0">${esc(k)}</td><td><b>${esc(v)}</b></td></tr>`)

export function orderEmail(doc: any) {
  const html = `<h2 style="margin:0 0 8px">سفارش طراحی جدید</h2><table>${row('نام', doc.name)}${row('تلفن / واتساپ', doc.phone)}${row('ایمیل', doc.email)}${row('کشور', doc.country)}${row('شهر', doc.city)}${row('نوع پروژه', doc.projectType)}${row('متراژ', doc.area)}${row('طبقات / واحد', doc.floors)}${row('زمان‌بندی', doc.deadline)}${row('تعداد فایل', Array.isArray(doc.files) ? doc.files.length : 0)}</table>${doc.notes ? `<p><b>توضیحات:</b><br>${esc(doc.notes).replace(/\n/g, '<br>')}</p>` : ''}<p><a href="${SITE_URL}/admin/collections/design-orders/${doc.id}" style="background:#285A35;color:#fff;padding:8px 16px;border-radius:6px;text-decoration:none">مشاهده در پنل مدیریت</a></p>`
  return { subject: `🔔 سفارش طراحی جدید — ${String(doc.name ?? '').slice(0, 40)}`, html }
}

/** A visitor's contact (phone/WhatsApp or email) as clickable links for the alert email. */
export function contactHtml(name: unknown, contact: unknown) {
  const c = String(contact ?? '').trim()
  let link = ''
  if (/@/.test(c)) link = ` · <a href="mailto:${esc(c)}">ارسال ایمیل</a>`
  else if (c.replace(/\D/g, '').length >= 7) {
    let d = c.replace(/\D/g, '')
    if (d.startsWith('00')) d = d.slice(2)
    else if (d.startsWith('07') && d.length === 11) d = '964' + d.slice(1)
    else if (d.startsWith('09') && d.length === 11) d = '98' + d.slice(1)
    link = ` · <a href="https://wa.me/${d}">پیام در واتساپ</a> · <a href="tel:+${d}">تماس</a>`
  }
  return `<p><b>نام:</b> ${esc(name) || '—'}<br><b>تماس:</b> ${esc(c) || 'ثبت نکرده'}${link}</p>`
}
