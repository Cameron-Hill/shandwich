import { db } from "@/db";

export async function up() {
  console.log("Creating User Table 😎");
  await db.schema
    .createTable("user")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("name", "text", (col) => col.notNull())
    .ifNotExists()
    .execute();

  console.log("Creating Post table 📪");
  await db.schema
    .createTable("post")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("author", "integer", (col) => col.notNull())
    .addForeignKeyConstraint("fk_post_author", ["author"], "user", ["id"])
    .ifNotExists()
    .execute();

  console.log("Creating Comment Schema 💬");
  await db.schema
    .createTable("comment")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("post", "integer", (col) => col.notNull())
    .addColumn("author", "integer", (col) => col.notNull())
    .addForeignKeyConstraint("fk_comment_post", ["post"], "post", ["id"])
    .addForeignKeyConstraint("fk_comment_author", ["author"], "user", ["id"])
    .ifNotExists()
    .execute();

  console.log("Creating Like Schema 👍");
  await db.schema
    .createTable("like")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
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
