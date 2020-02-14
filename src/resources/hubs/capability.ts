import * as Request from "../../common/api/request";
import { QueryParams, links, Settings } from "../../common/api";

export enum Capability {
  HUBS_UPDATE = "hubs-update",
  HUBS_DELETE = "hubs-delete",
  HUBS_INVITES_SEND = "hubs-invites-send",
  HUBS_INVITES_MANAGE = "hubs-invites-manage",
  HUBS_MEMBERS_MANAGE = "hubs-members-manage",
  HUBS_MEMBERS_VIEW = "hubs-members-view",
  HUBS_NOTIFICATIONS_LISTEN = "hubs-notifications-listen",
  BILLING_METHODS_MANAGE = "billing-methods-manage",
  BILLING_INVOICES_VIEW = "billing-invoices-view",
  BILLING_INVOICES_PAY = "billing-invoices-pay",
  BILLING_ORDERS_MANAGE = "billing-orders-manage",
  BILLING_SERVICES_VIEW = "billing-services-view",
  BILLING_CREDITS_VIEW = "billing-credits-view",
  ENVIRONMENTS_CREATE = "environments-create",
  ENVIRONMENTS_DELETE = "environments-delete",
  ENVIRONMENTS_VIEW = "environments-view",
  ENVIRONMENTS_UPDATE = "environments-update",
  ENVIRONMENTS_STATE = "environments-state",
  ENVIRONMENTS_SERVICES_MANAGE = "environments-services-manage",
  ENVIRONMENTS_VPN = "environments-vpn",
  ENVIRONMENTS_VPN_MANAGE = "environments-vpn-manage",
  PROJECTS_CREATE = "projects-create",
  PROJECTS_DELETE = "projects-delete",
  PROJECTS_VIEW = "projects-view",
  PROJECTS_UPDATE = "projects-update",
  CONTAINERS_DEPLOY = "containers-deploy",
  CONTAINERS_VIEW = "containers-view",
  CONTAINERS_CONSOLE = "containers-console",
  CONTAINERS_SSH = "containers-ssh",
  CONTAINERS_UPDATE = "containers-update",
  CONTAINERS_DELETE = "containers-delete",
  CONTAINERS_STATE = "containers-state",
  CONTAINERS_VOLUMES_MANAGE = "containers-volumes-manage",
  CONTAINERS_VOLUMES_VIEW = "containers-volumes-view",
  STACKS_CREATE = "stacks-create",
  STACKS_UPDATE = "stacks-update",
  STACKS_DELETE = "stacks-delete",
  STACKS_VIEW = "stacks-view",
  STACKS_BUILDS_MANAGE = "stacks-builds-manage",
  STACKS_HOOKS_MANAGE = "stacks-hooks-manage",
  IMAGES_VIEW = "images-view",
  IMAGES_BUILD = "images-build",
  IMAGES_UPDATE = "images-update",
  IMAGES_DELETE = "images-delete",
  JOBS_VIEW = "jobs-view",
  APIKEYS_MANAGE = "apikeys-manage",
  INFRASTRUCTURE_SERVERS_PROVISION = "servers-provision",
  INFRASTRUCTURE_SERVERS_VIEW = "servers-view",
  INFRASTRUCTURE_SERVERS_LOGIN = "servers-login",
  INFRASTRUCTURE_SERVERS_UPDATE = "servers-update",
  INFRASTRUCTURE_SERVERS_STATE = "servers-state",
  INFRASTRUCTURE_SERVERS_DECOMMISSION = "servers-decommission",
  INFRASTRUCTURE_IPS_MANAGE = "ips-manage",
  USAGE_VIEW = "usage-view",
  DNS_VIEW = "dns-view",
  DNS_MANAGE = "dns-manage",
  SDN_NETWORKS_VIEW = "sdn-networks-view",
  SDN_NETWORKS_MANAGE = "sdn-networks-manage",
}

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
