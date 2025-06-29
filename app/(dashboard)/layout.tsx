import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar></DashboardSidebar>
      <main className="flex flex-col h-screen w-screen shadow-sm">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
