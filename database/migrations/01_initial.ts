import { Kysely } from "kysely";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>) {
  console.log("Creating User Table 😎");
  await db.schema
    .createTable("user")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull())
    .ifNotExists()
    .execute();

  console.log("Creating Post table 📪");
  await db.schema
    .createTable("post")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("author", "integer", (col) => col.notNull())
    .addForeignKeyConstraint("fk_post_author", ["author"], "user", ["id"])
    .ifNotExists()
    .execute();

  console.log("Creating Comment Schema 💬");
  await db.schema
    .createTable("comment")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("post", "integer", (col) => col.notNull())
    .addColumn("author", "integer", (col) => col.notNull())
    .addForeignKeyConstraint("fk_comment_post", ["post"], "post", ["id"])
    .addForeignKeyConstraint("fk_comment_author", ["author"], "user", ["id"])
    .ifNotExists()
    .execute();

  console.log("Creating Like Schema 👍");
  await db.schema
    .createTable("like")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("post", "integer", (col) => col.notNull())
    .addColumn("author", "integer", (col) => col.notNull())
    .addForeignKeyConstraint("fk_like_post", ["post"], "post", ["id"])
    .addForeignKeyConstraint("fk_like_author", ["author"], "user", ["id"])
    .ifNotExists()
    .execute();

  console.log("Creating Relationship Schema 👥");
  await db.schema
    .createTable("follow")
    .addColumn("user", "integer", (col) => col.notNull())
    .addColumn("follow", "integer", (col) => col.notNull())
    .addPrimaryKeyConstraint("pk_relationship", ["user", "follow"])
    .addForeignKeyConstraint("fk_relationship_from", ["user"], "user", ["id"])
    .addForeignKeyConstraint("fk_relationship_to", ["follow"], "user", ["id"])
    .ifNotExists()
    .execute();

  console.log("All tables created successfully. 🎉");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>) {
  console.log("Dropping tables... 🗑️");
  await db.schema.dropTable("follow").execute();
  await db.schema.dropTable("like").execute();
  await db.schema.dropTable("comment").execute();
  await db.schema.dropTable("post").execute();
  await db.schema.dropTable("user").execute();

  console.log("All tables dropped successfully. 🗑️");
}
