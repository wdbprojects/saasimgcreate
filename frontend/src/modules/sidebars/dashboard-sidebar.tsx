import { Sidebar } from "@/components/ui/sidebar";
import DashboardSidebarContent from "@/modules/components/sidebar/dashboard-sidebar-content";
import MobileSidebarClose from "@/modules/components/sidebar/mobile-sidebar-close";

const DashboardSidebar = () => {
  return (
    <Sidebar
      className="z-40 rounded-sm border-none pt-15"
      variant="floating"
      collapsible="icon"
    >
      <MobileSidebarClose />
      <DashboardSidebarContent />
    </Sidebar>
  );
};

export default DashboardSidebar;
