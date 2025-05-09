"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Comment } from "./Comment";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import Rating from "./Rating";

// TODO split into server / client components
import Rating from "./Rating";

// TODO split into server / client components

export interface PostProps {
  author: string;
  title: string;
  description: string;
  likes: number;
  rating: number;
  createdOn: Date;
  image: string;
  comments: Array<{
    author: string;
    content: string;
    createdOn: Date;
  }>;
}

export function Post({ author, title, description, likes, rating, image, comments }: PostProps) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: Implement actual comment submission
      console.log("Submitting comment:", newComment);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatars/default.png" alt="Avatar" />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold">{author}</CardTitle>
            <p className="text-muted-foreground text-sm">Just now</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative aspect-video w-full">
            <Image width={600} height={400} src={image} alt="Post" className="h-full w-full rounded-md object-cover" />
          </div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button variant="ghost" className="flex items-center gap-2">
          <Rating value={rating} />
        </Button>
        <Button variant="ghost" className="flex items-center gap-2">
          <span className="text-muted-foreground">{likes}</span>
          <span>👍</span>
        </Button>
        <Button variant="ghost" className="flex items-center gap-2">
          <span className="text-muted-foreground">{comments.length}</span>
          <span>💬</span>
        </Button>
      </CardFooter>
      <CardContent>
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px]"
          />
          <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
            {isSubmitting ? "Submitting..." : "Post Comment"}
          </Button>
        </form>
        <div className="mt-4 space-y-4">
          {comments.map((comment, index) => (
            <Comment key={index} author={comment.author} content={comment.content} createdAt={comment.createdOn} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
