import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`ai_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`enabled\` integer DEFAULT false,
  	\`api_key\` text,
  	\`model\` text DEFAULT 'claude-haiku-4-5',
  	\`per_visitor_daily\` numeric DEFAULT 30,
  	\`total_daily\` numeric DEFAULT 1500,
  	\`extra_instructions\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`ai_settings\`;`)
}
