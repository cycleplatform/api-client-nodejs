import * as Request from "../../common/api/request";
import { QueryParams, links, Settings } from "../../common/api";

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

  // sdn
  | "sdn-networks-view"
  | "sdn-networks-manage"

  // pipelines
  | "pipelines-manage"
  | "pipelines-view"
  | "pipelines-trigger"

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

  // images
  | "images-view"
  | "images-import"
  | "images-update"
  | "images-delete"
  | "images-build"
  | "images-sources-view"
  | "images-sources-manage"

  // jobs
  | "jobs-view"

  // api keys
  | "api-keys-manage"

  // infrastructure
  | "ips-manage"
  | "servers-provision"
  | "servers-view"
  | "servers-update"
  | "servers-login"
  | "servers-state"
  | "servers-decommission"

  // usage
  | "usage-view"

  // dns
  | "dns-view"
  | "dns-manage";

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
