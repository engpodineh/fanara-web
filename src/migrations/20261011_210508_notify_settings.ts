import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`notify_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`enabled\` integer DEFAULT false,
  	\`smtp_user\` text,
  	\`smtp_pass\` text,
  	\`to\` text,
  	\`on_orders\` integer DEFAULT true,
  	\`on_feedback\` integer DEFAULT true,
  	\`on_comments\` integer DEFAULT true,
  	\`send_test\` integer DEFAULT false,
  	\`last_result\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`notify_settings\`;`)
}
