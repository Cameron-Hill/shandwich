"use server";

import { getDb } from "@/db";

interface CreatePostInput {
  userId: number;
  title: string;
  description: string;
  image?: string | null;
  rating: number;
}

export async function createPost({ userId, title, description, image = null, rating }: CreatePostInput) {
  const db = getDb();

  try {
    const [post] = await db
      .insertInto("post")
      .values({
        author: userId,
        title,
        description,
        image,
        rating,
      })
      .returningAll()
      .execute();

    return { success: true, post };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { success: false, error: "Failed to create post" };
  }
}

interface UpdatePostInput {
  userId: number;
  postId: number;
  title?: string;
  description?: string;
  image?: string | null;
  rating?: number;
}

export async function updatePost({ userId, postId, ...updates }: UpdatePostInput) {
  const db = getDb();

  try {
    // First verify the post belongs to the user
    const post = await db
      .selectFrom("post")
      .where("id", "=", postId)
      .where("author", "=", userId)
      .selectAll()
      .executeTakeFirst();

    if (!post) {
      return { success: false, error: "Post not found or unauthorized" };
    }

    const [updatedPost] = await db
      .updateTable("post")
      .set({
        ...updates,
        // Only include fields that are defined in updates
        ...(updates.title !== undefined && { title: updates.title }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.image !== undefined && { image: updates.image }),
        ...(updates.rating !== undefined && { rating: updates.rating }),
      })
      .where("id", "=", postId)
      .where("author", "=", userId)
      .returningAll()
      .execute();

    return { success: true, post: updatedPost };
  } catch (error) {
    console.error("Failed to update post:", error);
    return { success: false, error: "Failed to update post" };
  }
}

export async function deletePost(userId: number, postId: number) {
  const db = getDb();

  try {
    // First verify the post belongs to the user
    const post = await db
      .selectFrom("post")
      .where("id", "=", postId)
      .where("author", "=", userId)
      .selectAll()
      .executeTakeFirst();

    if (!post) {
      return { success: false, error: "Post not found or unauthorized" };
    }

    // Delete related likes and comments first
    await db.deleteFrom("like").where("post", "=", postId).execute();

    await db.deleteFrom("comment").where("post", "=", postId).execute();

    // Then delete the post
    await db.deleteFrom("post").where("id", "=", postId).where("author", "=", userId).execute();

    return { success: true };
  } catch (error) {
    console.error("Failed to delete post:", error);
    return { success: false, error: "Failed to delete post" };
  }
}

export async function likePost(userId: number, postId: number) {
  const db = getDb();

  try {
    // Check if already liked
    const existingLike = await db
      .selectFrom("like")
      .where("author", "=", userId)
      .where("post", "=", postId)
      .selectAll()
      .executeTakeFirst();

    if (existingLike) {
      return { success: true, like: existingLike };
    }

    const [like] = await db
      .insertInto("like")
      .values({
        author: userId,
        post: postId,
      })
      .returningAll()
      .execute();

    return { success: true, like };
  } catch (error) {
    console.error("Failed to like post:", error);
    return { success: false, error: "Failed to like post" };
  }
}

export async function unlikePost(userId: number, postId: number) {
  const db = getDb();

  try {
    const result = await db
      .deleteFrom("like")
      .where("author", "=", userId)
      .where("post", "=", postId)
      .executeTakeFirst();

    return {
      success: true,
      deleted: Number(result.numDeletedRows) > 0,
    };
  } catch (error) {
    console.error("Failed to unlike post:", error);
    return { success: false, error: "Failed to unlike post" };
  }
}

export async function commentOnPost(userId: number, postId: number, content: string) {
  const db = getDb();

  try {
    const [comment] = await db
      .insertInto("comment")
      .values({
        author: userId,
        post: postId,
        content,
      })
      .returningAll()
      .execute();

    return { success: true, comment };
  } catch (error) {
    console.error("Failed to add comment:", error);
    return { success: false, error: "Failed to add comment" };
  }
}

interface GetPostsOptions {
  limit?: number;
  offset?: number;
  userId?: number;
}

export async function getFeedPosts(userId: number, options: GetPostsOptions = {}) {
  const { limit = 10, offset = 0 } = options;
  const db = getDb();

  try {
    // Get posts from users that the current user follows
    const posts = await db
      .selectFrom("post")
      .innerJoin("follow", "follow.follow", "post.author")
      .where("follow.user", "=", userId)
      .selectAll("post")
      .orderBy("post.created_on", "desc")
      .limit(limit)
      .offset(offset)
      .execute();

    return { success: true, posts };
  } catch (error) {
    console.error("Failed to fetch feed posts:", error);
    return { success: false, error: "Failed to fetch feed posts" };
  }
}

export async function getMyPosts(userId: number, options: GetPostsOptions = {}) {
  const { limit = 10, offset = 0 } = options;
  const db = getDb();

  try {
    const posts = await db
      .selectFrom("post")
      .where("author", "=", userId)
      .selectAll()
      .orderBy("created_on", "desc")
      .limit(limit)
      .offset(offset)
      .execute();

    return { success: true, posts };
  } catch (error) {
    console.error("Failed to fetch user posts:", error);
    return { success: false, error: "Failed to fetch user posts" };
  }
}

// Additional helper functions
export async function getPostLikes(postId: number) {
  const db = getDb();

  try {
    const likes = await db.selectFrom("like").where("post", "=", postId).selectAll().execute();

    return { success: true, likes };
  } catch (error) {
    console.error("Failed to fetch post likes:", error);
    return { success: false, error: "Failed to fetch post likes" };
  }
}

export async function getPostComments(postId: number) {
  const db = getDb();

  try {
    const comments = await db
      .selectFrom("comment")
      .where("post", "=", postId)
      .selectAll()
      .orderBy("created_on", "asc")
      .execute();

    return { success: true, comments };
  } catch (error) {
    console.error("Failed to fetch post comments:", error);
    return { success: false, error: "Failed to fetch post comments" };
  }
}
