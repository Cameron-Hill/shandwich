import Link from "next/link";
export type Link = {
  name: string;
  path: string;
  icon: string;
};

export const links: Link[] = [
  { name: "feed", path: "/href", icon: "#" },
  { name: "friends", path: "/friends", icon: "#" },
  { name: "posts", path: "/posts", icon: "#" },
];

export default function Nav() {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.path}
          className="gray-200 flex items-center gap-2 p-2 text-white hover:bg-gray-400 dark:text-black dark:hover:bg-gray-700"
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}
