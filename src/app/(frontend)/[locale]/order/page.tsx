export const revalidate = 60
import { notFound } from 'next/navigation'
import { payload } from '@/lib/payload'
import { isLocale, t, type Locale } from '@/lib/i18n'
import OrderForm from './OrderForm'

export default async function Order({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale, u = t(l)
  const services = await (await payload()).find({ collection: 'services', locale: l, sort: 'order', limit: 20 })
  return (
    <main className="page"><div className="wrap">
      <span className="kicker">{u.sKicker}</span>
      <h1 style={{ margin: '6px 0 8px' }}>{u.orderTitle}</h1>
      <p className="lead" style={{ marginBottom: 28 }}>{u.orderLead}</p>
      <OrderForm u={u} services={services.docs.map((s) => ({ id: s.id, title: s.title }))} />
    </div></main>
  )
}
