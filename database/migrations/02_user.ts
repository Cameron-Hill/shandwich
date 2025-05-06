import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await db.schema
    .alterTable("user")
    .addColumn("provider_id", "text", (col) => col.notNull())
    .addColumn("created_at", "text", (col) => col.notNull().defaultTo(sql`now()`))
    .execute();
  await db.schema.alterTable("user").addUniqueConstraint("uq_user_provider_id", ["provider_id"]).execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.alterTable("user").dropConstraint("uq_user_provider_id").execute();
  await db.schema.alterTable("user").dropColumn("provider_id").dropColumn("created_at").execute();
}
