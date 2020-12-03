import * as Request from "../../common/api/request";
import { QueryParams, links, Settings } from "../../common/api";

/**
 * All capabilities available
 */
export type Capability =
  // hubs
  | "hubs-update"
  | "hubs-delete"
  | "hubs-invites-send"
  | "hubs-invites-manage"
  | "hubs-members-manage"
  | "hubs-members-view"
  | "hubs-notifications-listen"

  // billing
  | "billing-methods-manage"
  | "billing-invoices-view"
  | "billing-invoices-pay"
  | "billing-orders-manage"
  | "billing-services-view"
  | "billing-credits-view"

  // environments
  | "environments-create"
  | "environments-delete"
  | "environments-view"
  | "environments-update"
  | "environments-state"
  | "environments-services-manage"
  | "environments-vpn"
  | "environments-vpn-manage"

  // containers
  | "containers-deploy"
  | "containers-view"
  | "containers-console"
  | "containers-ssh"
  | "containers-update"
  | "containers-delete"
  | "containers-state"
  | "containers-volumes-manage"
  | "containers-volumes-view"
  | "containers-instances-migrate"

  // stacks
  | "stacks-create"
  | "stacks-update"
  | "stacks-delete"
  | "stacks-view"
  | "stacks-builds-manage"
  | "stacks-hooks-manage"

  // images
  | "images-view"
  | "images-import"
  | "images-update"
  | "images-delete"

  // jobs
  | "jobs-view"

  // api keys
  | "api-keys-manage"

  // infrastructure
  | "servers-provision"
  | "servers-view"
  | "servers-update"
  | "servers-state"
  | "servers-decommission"
  | "ips-manage"

  // usage
  | "usage-view"

  // dns
  | "dns-view"
  | "dns-manage"

  // sdn
  | "sdn-networks-view"
  | "sdn-networks-manage";

/**
 * Information including a collection of capabilities
 */
export interface CapabilityDoc {
  data: Capability[];
}

export async function getCapabilities({
  query,
  settings,
}: {
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<CapabilityDoc>({
    query,
    settings,
    target: links.hubs().capabilities(),
  });
}
