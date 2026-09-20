import { AdminPageHeader } from "@/components/admin/page-chrome";
import { ServiceForm } from "@/components/admin/service-form";
import { requireUser } from "@/actions/auth";
import { listGroupOptions, listServiceOptions } from "@/lib/services/queries";

export default async function NewServicePage() {
  await requireUser();
  const [groups, relatedOptions] = await Promise.all([
    listGroupOptions(),
    listServiceOptions(),
  ]);

  return (
    <>
      <AdminPageHeader
        title="New service"
        description="Choose a group first. Publish when the listing image and summary are ready."
      />
      <ServiceForm groups={groups} relatedOptions={relatedOptions} />
    </>
  );
}
