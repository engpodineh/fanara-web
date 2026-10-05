import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`media\` ADD \`in_gallery\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`category\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`source_file\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`order\` numeric DEFAULT 100;`)
  await db.run(sql`CREATE INDEX \`media_in_gallery_idx\` ON \`media\` (\`in_gallery\`);`)
  await db.run(sql`CREATE INDEX \`media_category_idx\` ON \`media\` (\`category\`);`)
  await db.run(sql`CREATE INDEX \`media_source_file_idx\` ON \`media\` (\`source_file\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`media_in_gallery_idx\`;`)
  await db.run(sql`DROP INDEX \`media_category_idx\`;`)
  await db.run(sql`DROP INDEX \`media_source_file_idx\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`in_gallery\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`category\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`source_file\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`order\`;`)
}
