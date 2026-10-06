import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import fs from 'node:fs'
import path from 'node:path'

// Owner request: add the 1,600-unit Shams project in Najaf (Al-Dhaman) with its site photos and videos.
// Photos were resized and ID badges blurred before being committed to content/projects/shams.
const SLUG = 'shams-najaf-1600-units'
const DIR = () => path.resolve(process.cwd(), 'content/projects/shams')

const PHOTO_ALT = {
  fa: 'پروژه‌ی ۱۶۰۰ واحدی شمس، نجف — کارگاه',
  ar: 'مشروع الشمس السكني 1600 وحدة، النجف — الموقع',
  en: 'Shams 1,600-unit project, Najaf — site',
}
const VIDEO_ALT = {
  fa: 'ویدیوی کارگاه پروژه‌ی شمس، نجف',
  ar: 'فيديو من موقع مشروع الشمس، النجف',
  en: 'Site video, Shams project, Najaf',
}
const TEXT = {
  fa: {
    title: 'مجتمع مسکونی ۱۶۰۰ واحدی شمس، نجف',
    summary: 'پروژه‌ی ۱۶۰۰ واحدی شمس در نجف، اجرای شرکت الضمان. مدیریت بخش مکانیک: تأسیسات آب و فاضلاب، برق و زیرساخت واحدهای مسکونی، از فونداسیون تا اسکلت و دیوارچینی.',
    location: 'نجف، عراق', role: 'مدیر بخش مکانیک (شرکت الضمان)',
  },
  ar: {
    title: 'مشروع الشمس السكني 1600 وحدة، النجف',
    summary: 'مشروع الشمس السكني من 1600 وحدة في النجف، تنفيذ شركة الضمان. إدارة القسم الميكانيكي: تأسيسات الماء والمجاري والكهرباء والبنى التحتية للوحدات السكنية، من الأسس إلى الهيكل والبناء.',
    location: 'النجف، العراق', role: 'مدير القسم الميكانيكي (شركة الضمان)',
  },
  en: {
    title: 'Shams 1,600-unit residential project, Najaf',
    summary: 'The 1,600-unit Shams housing project in Najaf, built by Al-Dhaman Co. Mechanical department lead: water, drainage, electrical and infrastructure services for the housing units, from foundations to structure and blockwork.',
    location: 'Najaf, Iraq', role: 'Mechanical Manager (Al-Dhaman Co.)',
  },
} as const

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const exists = await payload.find({ collection: 'projects', where: { slug: { equals: SLUG } }, limit: 1, depth: 0, req, overrideAccess: true })
  if (exists.docs.length) return
  const dir = DIR()
  if (!fs.existsSync(dir)) { payload.logger.warn(`shams project: ${dir} missing, skipped`); return }

  const upload = async (file: string, alt: Record<'fa' | 'ar' | 'en', string>, extra: Record<string, unknown>) => {
    const found = await payload.find({ collection: 'media', where: { sourceFile: { equals: `projects/shams/${file}` } }, limit: 1, depth: 0, req, overrideAccess: true })
    let id = found.docs[0]?.id
    if (!id) {
      id = (await payload.create({ collection: 'media', locale: 'fa', filePath: path.join(dir, file), data: { alt: alt.fa, sourceFile: `projects/shams/${file}`, ...extra } as any, req, overrideAccess: true })).id
    }
    for (const l of ['ar', 'en'] as const) await payload.update({ collection: 'media', id, locale: l, data: { alt: alt[l] } as any, req, overrideAccess: true })
    return id
  }

  const files = fs.readdirSync(dir).sort()
  const photos: (number | string)[] = []
  for (const [i, f] of files.filter((f) => f.endsWith('.jpg')).entries()) {
    photos.push(await upload(f, PHOTO_ALT, { inGallery: true, category: 'site', order: 5 + i }))
  }
  const videos: (number | string)[] = []
  for (const f of files.filter((f) => f.endsWith('.mp4'))) videos.push(await upload(f, VIDEO_ALT, { inGallery: false }))

  const doc = await payload.create({
    collection: 'projects', locale: 'fa', req, overrideAccess: true,
    data: {
      slug: SLUG, published: true, featured: true, order: 0, status: 'in-progress', category: 'execution', period: '2026 –',
      showClientName: false, systems: ['plumbing', 'drainage', 'electrical-power', 'infrastructure'],
      cover: photos[0], gallery: photos, videos, ...TEXT.fa,
    } as any,
  })
  for (const l of ['ar', 'en'] as const) await payload.update({ collection: 'projects', id: doc.id, locale: l, data: { ...TEXT[l] } as any, req, overrideAccess: true })
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.delete({ collection: 'projects', where: { slug: { equals: SLUG } }, req, overrideAccess: true })
}
