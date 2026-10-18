import type { Metadata } from 'next'
import { CityLanding, cityMetadata } from '@/lib/city-landing'

export const dynamic = 'force-dynamic'
type P = { params: Promise<{ locale: string; city: string }> }
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale, city } = await params; return cityMetadata('armenia', locale, city) }
export default async function Page({ params }: P) { const { locale, city } = await params; return <CityLanding country="armenia" locale={locale} city={city} /> }
