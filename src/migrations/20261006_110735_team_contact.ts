import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`team\` ADD \`whatsapp\` text;`)
  await db.run(sql`ALTER TABLE \`team\` ADD \`phone\` text;`)
  await db.run(sql`ALTER TABLE \`team\` ADD \`email\` text;`)
  await db.run(sql`ALTER TABLE \`team\` ADD \`instagram\` text;`)
  await db.run(sql`ALTER TABLE \`team\` ADD \`linkedin\` text;`)
  await db.run(sql`ALTER TABLE \`team_locales\` ADD \`resume\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`team\` DROP COLUMN \`whatsapp\`;`)
  await db.run(sql`ALTER TABLE \`team\` DROP COLUMN \`phone\`;`)
  await db.run(sql`ALTER TABLE \`team\` DROP COLUMN \`email\`;`)
  await db.run(sql`ALTER TABLE \`team\` DROP COLUMN \`instagram\`;`)
  await db.run(sql`ALTER TABLE \`team\` DROP COLUMN \`linkedin\`;`)
  await db.run(sql`ALTER TABLE \`team_locales\` DROP COLUMN \`resume\`;`)
}
