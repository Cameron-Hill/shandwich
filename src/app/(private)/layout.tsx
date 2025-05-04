import SideBar from "@/components/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SideBar />
      <div>{children}</div>
    </div>
  );
}
