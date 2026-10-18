import type { Metadata } from 'next'
import { CityLanding, cityMetadata } from '@/lib/city-landing'

export const dynamic = 'force-dynamic'
type P = { params: Promise<{ locale: string; city: string }> }
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale, city } = await params; return cityMetadata('iraq', locale, city) }
export default async function Page({ params }: P) { const { locale, city } = await params; return <CityLanding country="iraq" locale={locale} city={city} /> }
