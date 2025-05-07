import { Post, PostProps } from "@/components/Post";
import { ProfileWidget } from "@/components/ProfileWidget";

const posts: PostProps[] = [
  {
    author: "John Doe",
    title: "Deli Meat Sandwich",
    description:
      "This was an amazing deli meat sandwich that I bought from the deli next door.\nIt came in a beautiful, freshly baked ciabatta with a side of fresh lettuce and tomato.\nIt was a true work of art!",
    likes: 10,
    rating: 4.8,
    createdOn: new Date("2025-04-01"),
    image: "/images/sandwich-placeholder-1.jpg",
    comments: [
      {
        author: "Julia",
        content: "Wow! 😍",
        createdOn: new Date(),
      },
    ],
  },
  {
    author: "Jill Joe",
    title: "Grilled Cheese",
    description: "Made this awesome grilled cheese with some fresh bread and some delicious cheese.  ",
    likes: 30,
    rating: 4.1,
    createdOn: new Date(),
    image: "/images/sandwich-placeholder-2.jpg",
    comments: [
      {
        author: "Julia",
        content: "This is a comment",
        createdOn: new Date(),
      },
    ],
  },
];

export default function Feed() {
  return (
    <div className="flex h-full w-full gap-10 px-5">
      {/* Main Feed - Scrollable */}
      <div className="flex h-full w-full flex-col gap-4 pt-15 md:w-2/3 md:pl-15">
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>

      {/* Sidebar - Fixed */}
      <div className="bg-background hidden h-full pt-15 md:block md:w-1/3 md:pr-15">
        <ProfileWidget />
      </div>
    </div>
  );
}
