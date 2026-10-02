import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fa } from '@payloadcms/translations/languages/fa'
import { ar } from '@payloadcms/translations/languages/ar'
import { en } from '@payloadcms/translations/languages/en'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Experience } from './collections/Experience'
import { Credentials } from './collections/Credentials'
import { Highlights } from './collections/Highlights'
import { Services } from './collections/Services'
import { DesignOrders, OrderFiles } from './collections/DesignOrders'
import { Standards, StandardFiles } from './collections/Standards'
import { Profile } from './globals/Profile'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) }, meta: { titleSuffix: ' · Fanara' } },
  i18n: { supportedLanguages: { fa, ar, en }, fallbackLanguage: 'fa' },
  localization: {
    locales: [
      { code: 'fa', label: 'فارسی', rtl: true },
      { code: 'ar', label: 'العربية', rtl: true },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'fa',
    fallback: true,
  },
  collections: [Projects, Experience, Credentials, Highlights, Services, DesignOrders, OrderFiles, Media, Standards, StandardFiles, Users],
  globals: [Profile],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  // Dev: SQLite. Production: swap to @payloadcms/db-postgres with the same config.
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URI || 'file:./fanara.db' } }),
  sharp,
})
