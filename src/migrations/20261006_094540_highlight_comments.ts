import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`highlight_comments\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`highlight_id\` integer NOT NULL,
  	\`name\` text NOT NULL,
  	\`message\` text NOT NULL,
  	\`hidden\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`highlight_id\`) REFERENCES \`highlights\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`highlight_comments_highlight_idx\` ON \`highlight_comments\` (\`highlight_id\`);`)
  await db.run(sql`CREATE INDEX \`highlight_comments_hidden_idx\` ON \`highlight_comments\` (\`hidden\`);`)
  await db.run(sql`CREATE INDEX \`highlight_comments_updated_at_idx\` ON \`highlight_comments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`highlight_comments_created_at_idx\` ON \`highlight_comments\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`highlight_comments_id\` integer REFERENCES highlight_comments(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_highlight_comments_id_idx\` ON \`payload_locked_documents_rels\` (\`highlight_comments_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`highlight_comments\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`projects_id\` integer,
  	\`experience_id\` integer,
  	\`credentials_id\` integer,
  	\`highlights_id\` integer,
  	\`services_id\` integer,
  	\`design_orders_id\` integer,
  	\`order_files_id\` integer,
  	\`feedback_id\` integer,
  	\`media_id\` integer,
  	\`standards_id\` integer,
  	\`standard_files_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`experience_id\`) REFERENCES \`experience\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`credentials_id\`) REFERENCES \`credentials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`highlights_id\`) REFERENCES \`highlights\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`design_orders_id\`) REFERENCES \`design_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`order_files_id\`) REFERENCES \`order_files\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`feedback_id\`) REFERENCES \`feedback\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`standards_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`standard_files_id\`) REFERENCES \`standard_files\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "projects_id", "experience_id", "credentials_id", "highlights_id", "services_id", "design_orders_id", "order_files_id", "feedback_id", "media_id", "standards_id", "standard_files_id", "users_id") SELECT "id", "order", "parent_id", "path", "projects_id", "experience_id", "credentials_id", "highlights_id", "services_id", "design_orders_id", "order_files_id", "feedback_id", "media_id", "standards_id", "standard_files_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_experience_id_idx\` ON \`payload_locked_documents_rels\` (\`experience_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_credentials_id_idx\` ON \`payload_locked_documents_rels\` (\`credentials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_highlights_id_idx\` ON \`payload_locked_documents_rels\` (\`highlights_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_design_orders_id_idx\` ON \`payload_locked_documents_rels\` (\`design_orders_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_files_id_idx\` ON \`payload_locked_documents_rels\` (\`order_files_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_feedback_id_idx\` ON \`payload_locked_documents_rels\` (\`feedback_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_standards_id_idx\` ON \`payload_locked_documents_rels\` (\`standards_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_standard_files_id_idx\` ON \`payload_locked_documents_rels\` (\`standard_files_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
}
