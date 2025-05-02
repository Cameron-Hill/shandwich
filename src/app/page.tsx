// import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex w-full flex-col-reverse items-center md:flex-row">
        <div className="w-full md:w-2/5 flex flex-col items-center justify-center gap-4 p-4 md:p-8">
          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="w-full max-w-sm">
                Log In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="cursor-pointer w-full max-w-sm">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/feed" className="w-full max-w-sm">
              go to feed
            </Link>
            <SignOutButton>
              <Button className="cursor-pointer w-full max-w-sm bg-primary">Sign Out</Button>
            </SignOutButton>
          </SignedIn>
        </div>
        <div className="flex w-full items-center justify-center md:w-3/5 bg-primary">
          <Image
            src="main-logo-black-transparent.svg"
            className=" fill-white invert dark:invert-0 dark:fill-white md:w-full ratio w-30 "
            alt="Shandwich Logo"
            width={400}
            height={400}
          />
        </div>
      </main>
      <footer></footer>
    </>
  );
}
