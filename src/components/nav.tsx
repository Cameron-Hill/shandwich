import Link from "next/link";
export type Link = {
  name: string;
  path: string;
  icon: React.ReactNode;
};
import { GalleryVertical } from "lucide-react";
import { Users } from "lucide-react";
import { MessageCircle } from "lucide-react";

export const links: Link[] = [
  { name: "feed", path: "/feed", icon: <GalleryVertical /> },
  { name: "friends", path: "/friends", icon: <Users /> },
  { name: "posts", path: "/posts", icon: <MessageCircle /> },
];

export default function Nav({ hideName, hideIcon }: { hideName?: boolean; hideIcon?: boolean }) {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.path}
          className="flex flex-1 flex-col items-center justify-center p-2 text-white transition-colors hover:bg-gray-400 md:flex md:flex-row md:justify-start md:text-left dark:text-black dark:hover:bg-gray-700"
          aria-label={link.name}
        >
          <div className="flex flex-col items-center md:flex-row md:gap-4">
            {!hideIcon && link.icon}
            {!hideName && <span className="text-xs md:text-base">{link.name}</span>}
          </div>
        </Link>
      ))}
    </>
  );
}
