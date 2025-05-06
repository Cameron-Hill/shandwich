import { Post } from "@/components/Post";
import { ProfileWidget } from "@/components/ProfileWidget";

const posts = [
  {
    author: "John Doe",
    title: "Deli Meat Sandwich",
    description:
      "This was an amazing deli meat sandwich that I bought from the deli next door.\nIt came in a beautiful, freshly baked ciabatta with a side of fresh lettuce and tomato.\nIt was a true work of art!",
    likes: 10,
    image: "/images/sandwich-placeholder-1.jpg",
    comments: [
      {
        author: "Julia",
        content: "Wow! 😍",
        createdAt: new Date(),
      },
    ],
  },
  {
    author: "Jill Joe",
    title: "Grilled Cheese",
    description: "Made this awesome grilled cheese with some fresh bread and some delicious cheese.  ",
    likes: 30,
    image: "/images/sandwich-placeholder-2.jpg",
    comments: [
      {
        author: "Julia",
        content: "This is a comment",
        createdAt: new Date(),
      },
    ],
  },
];

export default function Feed() {
  return (
    <div className="flex h-full w-full gap-10">
      {/* Main Feed - Scrollable */}
      <div className="mt-15 ml-15 flex h-full w-2/3 flex-col gap-4">
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>

      {/* Sidebar - Fixed */}
      <div className="bg-background mt-15 mr-15 h-full w-1/4">
        <ProfileWidget />
      </div>
    </div>
  );
}
