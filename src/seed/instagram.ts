// Imports Instagram reels/posts (exported from Metricool into content/ig-*.json) as site Highlights.
// Safe to re-run: items already imported (same instagramId) are skipped.
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'

type Item = { id: string; date: string; caption: string; img: string }
const file = process.argv[2] || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../content/ig-candidates.json')
const items: Item[] = JSON.parse(fs.readFileSync(file, 'utf8'))
const payload = await getPayload({ config })

const clean = (s: string) => s.replace(/#[^\s#]+/g, '').replace(/@[\w.]+/g, '').replace(/\s+/g, ' ').replace(/^[\s،,.؟?]+$/, '').trim()
const short = (s: string, n = 70) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s)
const FALLBACK = { fa: 'از اینستاگرام', ar: 'من إنستغرام', en: 'From Instagram' }

let created = 0, skipped = 0, failed = 0
for (const it of items) {
  const exists = await payload.find({ collection: 'highlights', where: { instagramId: { equals: it.id } }, limit: 1, depth: 0 })
  if (exists.docs.length) { skipped++; continue }
  try {
    const res = await fetch(it.img)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const tmp = path.join(os.tmpdir(), `ig-${it.id}.jpg`)
    fs.writeFileSync(tmp, Buffer.from(await res.arrayBuffer()))
    const cap = short(clean(it.caption))
    const media = await payload.create({ collection: 'media', locale: 'fa', filePath: tmp, data: { alt: cap || FALLBACK.fa, sourceFile: `instagram/${it.id}` } as any })
    const when = new Date(it.date.replace(/^(\d{4})-?(\d{2})-?(\d{2})T?(\d{2}):?(\d{2}):?(\d{2})$/, '$1-$2-$3T$4:$5:$6+03:00')).toISOString()
    const h = await payload.create({
      collection: 'highlights', locale: 'fa',
      data: { media: media.id, caption: cap || FALLBACK.fa, album: 'site', link: `https://www.instagram.com/reel/${it.id}/`, source: 'instagram', instagramId: it.id, createdAt: when } as any,
    })
    if (!cap) for (const k of ['ar', 'en'] as const) await payload.update({ collection: 'highlights', id: h.id, locale: k, data: { caption: FALLBACK[k] } as any })
    fs.unlinkSync(tmp)
    created++
  } catch (e) { console.log('FAIL', it.id, (e as Error).message); failed++ }
}
console.log(`INSTAGRAM OK created=${created} skipped=${skipped} failed=${failed}`)
process.exit(0)
