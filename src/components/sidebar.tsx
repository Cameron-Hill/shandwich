import Image from "next/image";
import Nav from "./nav";
import Link from "next/link";

export default function sideBar() {
  return (
    <div className="bg-primary h-screen w-1/5">
      <div className="flex items-center justify-center gap-4">
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
      <div className="flex flex-col gap-4 pl-2 text-xl">
        <Nav />
      </div>
    </div>
  );
}
