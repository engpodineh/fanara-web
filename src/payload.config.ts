import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fa } from '@payloadcms/translations/languages/fa'
import { ar } from '@payloadcms/translations/languages/ar'
import { en } from '@payloadcms/translations/languages/en'
import sharp from 'sharp'
import os from 'os'

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
import { AiSettings } from './globals/AiSettings'
import { Feedback } from './collections/Feedback'
import { HighlightComments } from './collections/HighlightComments'
import { Team } from './collections/Team'
import { migrations } from './migrations'

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
  collections: [Projects, Team, Experience, Credentials, Highlights, Services, DesignOrders, OrderFiles, Feedback, HighlightComments, Media, Standards, StandardFiles, Users],
  globals: [Profile, AiSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || '',
  // Only accept cookie-authenticated requests coming from our own origins.
  csrf: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000', 'https://engfanara.com', 'https://www.engfanara.com'],
  // Uploads: stream to disk (not RAM), 50 MB per file (nginx allows 60 MB).
  upload: { limits: { fileSize: 50 * 1024 * 1024 }, useTempFiles: true, tempFileDir: os.tmpdir() },
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  // Dev: SQLite. Production: swap to @payloadcms/db-postgres with the same config.
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || 'file:./fanara.db' },
    // Never auto-push schema: production uses migrations only (a dev push would make prod hang on a prompt).
    push: false,
    busyTimeout: 5000,
    wal: true,
    // Production: apply schema migrations automatically on startup (fresh server DB).
    prodMigrations: migrations,
  }),
  sharp,
})
