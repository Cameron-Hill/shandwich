import Image from "next/image";
import Nav from "./nav";
import Link from "next/link";

export default function sideBar() {
  return (
    <aside className="bg-primary h-screen w-1/5" role="complementary" aria-label="Main navigation">
      <div className="flex items-center justify-center gap-4" role="banner">
        <Link href="/feed">
          <Image
            src="sandwich-black.svg"
            width={400}
            height={400}
            alt="Shandwich Logo"
            className="aspect-auto w-4/5 fill-white invert md:w-50 dark:fill-white dark:invert-0"
          />
        </Link>
      </div>
      <nav className="flex flex-col gap-4 pl-2 text-xl" role="navigation" aria-label="Main navigation">
        <Nav />
      </nav>
    </aside>
  );
}
