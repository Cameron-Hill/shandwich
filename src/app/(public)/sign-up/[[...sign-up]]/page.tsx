// import { Avatar } from "@/components/ui/avatar";
import { SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <main className="flex items-center justify-center w-full h-screen">
        <SignIn />
      </main>
    </>
  );
}
