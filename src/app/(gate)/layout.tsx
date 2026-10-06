import type { Metadata } from 'next'
import { SITE } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Eng.Fanara · فن‌آرا — اختر اللغة · انتخاب زبان · Choose language',
  description: 'مكتب فن‌آرا الهندسي — تصميم وتنفيذ التأسيسات في العراق · دفتر مهندسی فن‌آرا · Fanara Engineering — MEP design & installation.',
  alternates: { canonical: '/', languages: { 'ar-IQ': '/ar', 'fa-IR': '/fa', en: '/en', 'x-default': '/' } },
  icons: { icon: '/logo-mark.png' },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || 'BJUrlYdfimmjJqge-4ncDVHi3GFrE1my4xse25cM0Xs' },
  openGraph: { images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
}

export default function GateLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&family=Barlow:wght@500;600&family=Montserrat:wght@700&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  )
}
