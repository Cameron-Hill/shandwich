import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await db.schema
    .alterTable("user")
    .addColumn("provider_id", "text", (col) => col.notNull())
    .addColumn("created_at", "text", (col) => col.notNull().defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.alterTable("user").dropColumn("provider_id").dropColumn("created_at").execute();
}
