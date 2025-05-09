import { Kysely, sql } from "kysely";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>) {
  console.log("Updating Post table...");

  // Add missing columns to post table without default constraints
  await db.schema
    .alterTable("post")
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("rating", "integer", (col) => col.notNull())
    .addColumn("image", "text")
    .addColumn("created_on", "timestamp", (col) => col.notNull().defaultTo(sql`current_timestamp`))
    .execute();

  // Update existing rows with default values
  await db
    .updateTable("post")
    .set({
      title: "Untitled Post",
      description: "",
      rating: 0,
    })
    .execute();

  console.log("Updating Comment table...");

  // Add missing columns to comment table without default constraints
  await db.schema
    .alterTable("comment")
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("created_on", "timestamp", (col) => col.notNull().defaultTo(sql`current_timestamp`))
    .execute();

  // Update existing comment rows with default values
  await db
    .updateTable("comment")
    .set({
      content: "",
    })
    .execute();

  console.log("Updating Like table...");

  // Add created_on to like table without default constraint
  await db.schema
    .alterTable("like")
    .addColumn("created_on", "timestamp", (col) => col.notNull().defaultTo(sql`current_timestamp`))
    .execute();

  console.log("Schema updates completed successfully. 🎉");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>) {
  console.log("Reverting schema changes...");

  await db.schema
    .alterTable("post")
    .dropColumn("title")
    .dropColumn("description")
    .dropColumn("rating")
    .dropColumn("image")
    .dropColumn("created_on")
    .execute();

  await db.schema.alterTable("comment").dropColumn("content").dropColumn("created_on").execute();

  await db.schema.alterTable("like").dropColumn("created_on").execute();

  console.log("Schema changes reverted successfully. 🗑️");
}
