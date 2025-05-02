import db from "@/db";

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
