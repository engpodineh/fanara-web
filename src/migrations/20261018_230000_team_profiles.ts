import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`team_documents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text DEFAULT 'resume' NOT NULL,
  	\`lang\` text,
  	\`file_id\` integer NOT NULL,
  	\`preview_id\` integer,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`preview_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_documents_order_idx\` ON \`team_documents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_documents_parent_id_idx\` ON \`team_documents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_documents_file_idx\` ON \`team_documents\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`team_documents_preview_idx\` ON \`team_documents\` (\`preview_id\`);`)
  await db.run(sql`CREATE TABLE \`team_documents_locales\` (
  	\`title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`team_documents_locales_locale_parent_id_unique\` ON \`team_documents_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`team\` ADD \`slug\` text;`)
  await db.run(sql`CREATE UNIQUE INDEX \`team_slug_idx\` ON \`team\` (\`slug\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`team_documents\`;`)
  await db.run(sql`DROP TABLE \`team_documents_locales\`;`)
  await db.run(sql`DROP INDEX \`team_slug_idx\`;`)
  await db.run(sql`ALTER TABLE \`team\` DROP COLUMN \`slug\`;`)
}
