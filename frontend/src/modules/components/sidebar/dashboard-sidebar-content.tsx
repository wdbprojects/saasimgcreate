import { getUserCreditsAction } from "@/_actions/credit-actions";
import { Separator } from "@/components/ui/separator";
import {
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavMain from "@/modules/components/sidebar/nav-main";
import NavUser from "@/modules/components/sidebar/nav-user";
import UserCredits from "@/modules/components/sidebar/user-credits";

const DashboardSidebarContent = async () => {
  const result = await getUserCreditsAction();
  const credits = result?.success ? result.credits : 0;

  return (
    <>
      {/* <SidebarHeader>Sidebar Header</SidebarHeader> */}
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <UserCredits credits={credits} />
        <Separator />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </>
  );
};

export default DashboardSidebarContent;
