import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`contract_requests_scopes\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contract_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contract_requests_scopes_order_idx\` ON \`contract_requests_scopes\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`contract_requests_scopes_parent_idx\` ON \`contract_requests_scopes\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contract_requests\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`company\` text,
  	\`role\` text,
  	\`phone\` text NOT NULL,
  	\`email\` text,
  	\`country\` text,
  	\`city\` text,
  	\`contract_type\` text,
  	\`project_type\` text,
  	\`area\` numeric,
  	\`units\` text,
  	\`start\` text,
  	\`notes\` text,
  	\`lang\` text,
  	\`status\` text DEFAULT 'new',
  	\`internal_notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`contract_requests_updated_at_idx\` ON \`contract_requests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contract_requests_created_at_idx\` ON \`contract_requests\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contract_requests_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`order_files_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contract_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`order_files_id\`) REFERENCES \`order_files\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contract_requests_rels_order_idx\` ON \`contract_requests_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`contract_requests_rels_parent_idx\` ON \`contract_requests_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_requests_rels_path_idx\` ON \`contract_requests_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`contract_requests_rels_order_files_id_idx\` ON \`contract_requests_rels\` (\`order_files_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`contract_requests_id\` integer REFERENCES contract_requests(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contract_requests_id_idx\` ON \`payload_locked_documents_rels\` (\`contract_requests_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`contract_requests_scopes\`;`)
  await db.run(sql`DROP TABLE \`contract_requests\`;`)
  await db.run(sql`DROP TABLE \`contract_requests_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`projects_id\` integer,
  	\`team_id\` integer,
  	\`experience_id\` integer,
  	\`credentials_id\` integer,
  	\`highlights_id\` integer,
  	\`services_id\` integer,
  	\`design_orders_id\` integer,
  	\`order_files_id\` integer,
  	\`feedback_id\` integer,
  	\`highlight_comments_id\` integer,
  	\`media_id\` integer,
  	\`standards_id\` integer,
  	\`standard_files_id\` integer,
  	\`study_materials_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`team_id\`) REFERENCES \`team\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`experience_id\`) REFERENCES \`experience\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`credentials_id\`) REFERENCES \`credentials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`highlights_id\`) REFERENCES \`highlights\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`design_orders_id\`) REFERENCES \`design_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`order_files_id\`) REFERENCES \`order_files\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`feedback_id\`) REFERENCES \`feedback\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`highlight_comments_id\`) REFERENCES \`highlight_comments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`standards_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`standard_files_id\`) REFERENCES \`standard_files\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`study_materials_id\`) REFERENCES \`study_materials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "projects_id", "team_id", "experience_id", "credentials_id", "highlights_id", "services_id", "design_orders_id", "order_files_id", "feedback_id", "highlight_comments_id", "media_id", "standards_id", "standard_files_id", "study_materials_id", "users_id") SELECT "id", "order", "parent_id", "path", "projects_id", "team_id", "experience_id", "credentials_id", "highlights_id", "services_id", "design_orders_id", "order_files_id", "feedback_id", "highlight_comments_id", "media_id", "standards_id", "standard_files_id", "study_materials_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_team_id_idx\` ON \`payload_locked_documents_rels\` (\`team_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_experience_id_idx\` ON \`payload_locked_documents_rels\` (\`experience_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_credentials_id_idx\` ON \`payload_locked_documents_rels\` (\`credentials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_highlights_id_idx\` ON \`payload_locked_documents_rels\` (\`highlights_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_design_orders_id_idx\` ON \`payload_locked_documents_rels\` (\`design_orders_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_files_id_idx\` ON \`payload_locked_documents_rels\` (\`order_files_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_feedback_id_idx\` ON \`payload_locked_documents_rels\` (\`feedback_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_highlight_comments_id_idx\` ON \`payload_locked_documents_rels\` (\`highlight_comments_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_standards_id_idx\` ON \`payload_locked_documents_rels\` (\`standards_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_standard_files_id_idx\` ON \`payload_locked_documents_rels\` (\`standard_files_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_study_materials_id_idx\` ON \`payload_locked_documents_rels\` (\`study_materials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
}
