import db from "@/db";

export async function createSchema() {
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

export async function seed() {
  console.log("🌱 Seeding database...");

  // Users
  const [alice, bob, charlie] = await Promise.all([
    db.insertInto("user").values({ name: "Alice" }).returning("id").executeTakeFirstOrThrow(),
    db.insertInto("user").values({ name: "Bob" }).returning("id").executeTakeFirstOrThrow(),
    db.insertInto("user").values({ name: "Charlie" }).returning("id").executeTakeFirstOrThrow(),
  ]);
  console.log("Created users:", { alice, bob, charlie });

  if (!alice.id || !bob.id || !charlie.id) {
    throw new Error("User IDs should not be null");
  }

  // Posts
  const post = await db.insertInto("post").values({ author: alice.id }).returning("id").executeTakeFirstOrThrow();

  if (!post.id) {
    throw new Error("Post ID should not be null");
  }
  // Comments
  await db
    .insertInto("comment")
    .values([
      { post: post.id, author: bob.id },
      { post: post.id, author: charlie.id },
    ])
    .execute();

  // Likes
  await db
    .insertInto("like")
    .values([
      { post: post.id, author: bob.id },
      { post: post.id, author: charlie.id },
    ])
    .execute();

  // Relationships (followers)
  await db
    .insertInto("follow")
    .values([
      { user: bob.id, follow: alice.id },
      { user: charlie.id, follow: alice.id },
    ])
    .execute();

  console.log("✅ Seeding complete.");
}

export async function getAllData() {
  console.log("📦 Fetching all data from the database...");

  const users = await db.selectFrom("user").selectAll().execute();
  const posts = await db.selectFrom("post").selectAll().execute();
  const comments = await db.selectFrom("comment").selectAll().execute();
  const likes = await db.selectFrom("like").selectAll().execute();
  const follows = await db.selectFrom("follow").selectAll().execute();

  return {
    users,
    posts,
    comments,
    likes,
    relationships: follows,
  };
}
