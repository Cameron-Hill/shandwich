import SideBar from "@/components/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full">
      <SideBar />
      <div className="w-1/5"></div>
      <div className="w-4/5 flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
