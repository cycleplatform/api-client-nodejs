import {
  Resource,
  ResourceId,
  UserScope,
  Time,
  CollectionDoc,
  UserIncludes,
} from "../../common/structs";
import {
  StandardParams,
  getRequest,
  links,
  QueryParams,
} from "../../common/api";
import { Environment } from "../environments";
import { Container } from "../containers";
import { Instance } from "../containers/instances";
import { Server } from "../infrastructure/servers";
import { Pool } from "../infrastructure/ips";
import { Stack } from "../stacks";
import { Build } from "../stacks/builds";
import { Zone } from "../dns/zone";
import { Record as DNSRecord } from "../dns/records";
import { Image } from "../images";
import { ApiKey } from "./apikey";
import { Invoice } from "../billing/invoices";
import { Method } from "../billing/methods";
import { Network } from "../sdn/networks";
import { Membership } from "./membership";

export type Collection = CollectionDoc<Activity, ActivityIncludes>;
export type ActivityQuery = QueryParams<
  keyof ActivityIncludes,
  "",
  ActivityFilter
>;
export type ActivityFilter =
  | "search"
  | "environment"
  | "container"
  | "instance"
  | "server"
  | "user"
  | "verbosity";

export interface ActivityIncludes {
  // TODO: change to creators when updated on api
  users: UserIncludes;
  components?: Record<
    string,
    | Container
    | Instance
    | Environment
    | Image
    | Server
    | Pool
    | Stack
    | Build
    | Zone
    | DNSRecord
    | ApiKey
    | Invoice
    | Method
    | Network
    | Membership
  >;
}

export type EventType =
  // hubs
  | "hub.task.delete"
  | "hub.update"
  | "hub.create"
  | "hub.images.prune"
  | "hub.task.images.prune"
  // environments
  | "environment.initialize"
  | "environment.start"
  | "environment.stop"
  | "environment.task.start"
  | "environment.task.stop"
  | "environment.delete"
  | "environment.task.delete"
  | "environment.update"
  | "environment.create"
  // environment services
  | "environment.services.discovery.task.reconfigure"
  | "environment.services.lb.task.reconfigure"
  | "environment.services.vpn.task.reconfigure"
  // images
  | "image.import"
  | "image.task.import"
  | "image.update"
  | "image.create"
  | "image.delete"
  | "image.task.delete"
  // containers
  | "container.create"
  | "container.start"
  | "container.task.start"
  | "container.stop"
  | "container.task.stop"
  | "container.update"
  | "container.reconfigure"
  | "container.task.reconfigure"
  | "container.reconfigure.volumes"
  | "container.task.reconfigure.volumes"
  | "container.reimage"
  | "container.task.reimage"
  | "container.scale"
  | "container.task.scale"
  | "container.delete"
  | "container.task.delete"
  | "container.instances.create"
  // instances
  | "container.instance.error"
  | "container.instance.sftp.login"
  | "container.instance.migration.start"
  | "container.instance.migration.revert"
  | "container.instance.delete"
  // dns zones
  | "dns.zone.task.verify"
  | "dns.zone.task.delete"
  | "dns.zone.update"
  | "dns.zone.create"
  | "dns.zone.verify"
  | "dns.zone.delete"
  // dns records
  | "dns.zone.record.cert.generate.auto"
  | "dns.zone.record.delete"
  | "dns.zone.record.cert.generate"
  | "dns.zone.record.task.delete"
  | "dns.zone.record.update"
  | "dns.zone.record.create"
  // stacks
  | "stack.task.delete"
  | "stack.update"
  | "stack.create"
  | "stack.task.prune"
  // stack builds
  | "stack.build.create"
  | "stack.build.generate"
  | "stack.build.deploy"
  | "stack.build.delete"
  | "stack.build.task.generate"
  | "stack.build.task.delete"
  // servers
  | "infrastructure.server.task.delete"
  | "infrastructure.server.task.restart"
  | "infrastructure.server.task.provision"
  | "infrastructure.server.update"
  | "infrastructure.server.delete"
  | "infrastructure.server.restart"
  | "infrastructure.server.provision"
  | "infrastructure.server.live"
  | "infrastructure.server.services.sftp.lockdown.auto"
  | "infrastructure.server.reconfigure.features"
  | "infrastructure.server.task.reconfigure.features"
  // sdn
  | "sdn.network.task.delete"
  | "sdn.network.update"
  | "sdn.network.create"
  | "sdn.network.task.reconfigure"
  // ip pools
  | "infrastructure.ips.pool.task.delete"
  // orders
  | "billing.order.task.confirm"
  | "billing.order.confirm"
  // invoices
  | "billing.invoice.task.void"
  | "billing.invoice.task.credit"
  | "billing.invoice.task.refund"
  | "billing.invoice.task.pay"
  | "billing.invoice.pay"
  // methods
  | "billing.method.update"
  | "billing.method.create"
  | "billing.method.delete"
  | "billing.method.task.delete"
  // api keys
  | "hub.apikey.create"
  | "hub.apikey.update"
  | "hub.apikey.delete"
  // hub membership
  | "hub.membership.create"
  | "hub.membership.delete";

export interface Activity extends Resource {
  hub_id: ResourceId;
  // TODO: change to creator when updated on api
  user: UserScope;
  verbosity: number;
  context: Context;
  session: Session | null;
  changes: Change[];
  annotations: Record<string, any>;
  error: ActivityError | null;
  component: Component | null;
  status: ActivityStatusType;
  event: EventType;
  time: Time;
}

export interface Context {
  environment_id?: ResourceId;
  container_id?: ResourceId;
  instance_id?: ResourceId;
  server_id?: ResourceId;
  stack_id?: ResourceId;
  dns_zone_id?: ResourceId;
}

export interface Session {
  url: string;
  ip: string;
  api_key: ResourceId | null;
}

export interface Change {
  component: string;
  before?: Detail;
  after?: Detail;
}

export interface Component {
  id: string;
  type: string;
}

export type ActivityError = {
  message: string;
};

export type ActivityStatusType =
  | "info"
  | "warning"
  | "request"
  | "success"
  | "error";

export interface Detail {
  id?: ResourceId;
  number?: number;
  string?: string;
}

export async function getCollection(params: StandardParams) {
  return getRequest<Collection>({
    ...params,
    target: links.hubs().activity(),
  });
}
