import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`feedback\` ADD \`name\` text;`)
  await db.run(sql`ALTER TABLE \`feedback\` ADD \`contact\` text;`)
  await db.run(sql`ALTER TABLE \`highlight_comments\` ADD \`contact\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`feedback\` DROP COLUMN \`name\`;`)
  await db.run(sql`ALTER TABLE \`feedback\` DROP COLUMN \`contact\`;`)
  await db.run(sql`ALTER TABLE \`highlight_comments\` DROP COLUMN \`contact\`;`)
}
