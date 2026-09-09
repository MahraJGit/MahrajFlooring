/**
 * Legacy static services content kept only as a thin compatibility shim.
 * All live data now comes from Payload via `@/lib/payload/services`.
 */
export type {
  MegaMenuColumn,
  ServiceCard as Service,
  ServiceDetailView as ServiceDetail,
} from "@/lib/payload/services";
