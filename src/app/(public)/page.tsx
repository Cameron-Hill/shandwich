// import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="full flex flex-col-reverse items-center md:flex-row">
        <div className="mt-32 flex w-full flex-col items-center justify-center gap-4 p-4 md:mt-0 md:h-screen md:w-2/5 md:p-8">
          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="w-full max-w-sm cursor-pointer">
                Log In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="w-full max-w-sm cursor-pointer">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/feed" className="w-full max-w-sm">
              go to feed
            </Link>
            <SignOutButton>
              <Button className="bg-primary w-full max-w-sm cursor-pointer">Sign Out</Button>
            </SignOutButton>
          </SignedIn>
        </div>
        <div className="bg-primary flex w-full items-center justify-center md:h-screen md:w-3/5">
          <div className="flex h-1/2 w-1/2 items-center justify-center gap-4">
            <Image
              src="sandwich-black.svg"
              className="aspect-auto w-40 fill-white invert md:w-50 dark:fill-white dark:invert-0"
              alt="Shandwich Logo"
              width={400}
              height={400}
            />
            <p className="text-4xl font-bold text-white">shandwich</p>
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}
