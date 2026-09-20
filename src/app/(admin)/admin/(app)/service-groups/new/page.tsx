import { AdminPageHeader } from "@/components/admin/page-chrome";
import { ServiceGroupForm } from "@/components/admin/service-group-form";
import { requireUser } from "@/actions/auth";
import { nextSortOrder } from "@/lib/services/queries";

export default async function NewServiceGroupPage() {
  await requireUser();
  const defaultSortOrder = await nextSortOrder("main-services");
  return (
    <>
      <AdminPageHeader
        title="New service group"
        description="Creates a mega-menu column. Add services to it afterwards."
      />
      <ServiceGroupForm defaultSortOrder={defaultSortOrder} />
    </>
  );
}
