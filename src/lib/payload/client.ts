import config from "@payload-config";
import { getPayload } from "payload";

/**
 * Payload's Local API — queries the database in-process, with no HTTP hop.
 * Server components should use this instead of fetching /api.
 */
export const getPayloadClient = () => getPayload({ config });
