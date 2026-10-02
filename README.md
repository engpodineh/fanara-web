# Eng.Fanara — website

Next.js 15 + Payload CMS 3. Trilingual (fa / ar / en), admin panel at `/admin`.

## Run locally
    npm install
    cp .env.example .env      # set PAYLOAD_SECRET
    npm run seed              # loads resume, projects, services (needs the media folder)
    npm run dev               # http://localhost:3000/fa

## Structure
- `src/collections` — Projects, Experience, Credentials, Highlights, Services, DesignOrders, Standards (admin-only), Media, Users
- `src/globals/Profile.ts` — homepage text, founder bio, stats, contact
- `src/app/(frontend)/[locale]` — public pages: home, /resume, /order
- `src/app/(payload)` — admin panel and REST API

## Production
Swap `@payloadcms/db-sqlite` for `@payloadcms/db-postgres` and put media on S3-compatible storage.
