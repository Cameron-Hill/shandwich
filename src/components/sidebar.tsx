"use client";

import Image from "next/image";
import Nav from "./nav";
import Link from "next/link";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function SideBar() {
  const isMobile = useMediaQuery("(max-width: 767px");
  return (
    <aside
      className={`bg-primary fixed left-0 z-50 transition-all duration-300 ${isMobile ? "right-0 bottom-0 h-16" : "top-0 h-screen w-1/5"}`}
      role="complementary"
      aria-label="Main navigation"
    >
      <div className={`flex ${isMobile ? "h-full flex-row items-center" : "h-full flex-col"}`}>
        {!isMobile && (
          <div className="hidden items-center justify-center gap-4 py-4 md:flex" role="banner">
            <Link href="/feed">
              <Image
                src="/sandwich-black.svg"
                width={400}
                height={400}
                alt="Shandwich Logo"
                className="aspect-auto w-4/5 fill-white invert md:w-50 dark:fill-white dark:invert-0"
              />
            </Link>
          </div>
        )}
        <nav
          className={`flex ${isMobile ? "w-full flex-row justify-around" : "flex-1 flex-col gap-4 pl-2"} overflow-y-auto text-xl`}
          role="navigation"
          aria-label="Main navigation"
        >
          <Nav hideName={isMobile} />
        </nav>
      </div>
    </aside>
  );
}
