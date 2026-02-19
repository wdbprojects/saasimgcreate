import { routes } from "@/config/routes";
import { auth } from "@/lib/auth";
import CustomerPortalRedirect from "@/modules/components/dashboard/customer-portal-redirect";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const CustomerPortalPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(routes.login);
  }

  return <CustomerPortalRedirect />;
};

export default CustomerPortalPage;
