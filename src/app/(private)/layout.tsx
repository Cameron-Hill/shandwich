import SideBar from "@/components/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full">
      <SideBar />
      <div className="hidden md:block md:w-1/5"></div>
      <div className="flex-1 overflow-y-auto md:w-4/5">{children}</div>
    </div>
  );
}
