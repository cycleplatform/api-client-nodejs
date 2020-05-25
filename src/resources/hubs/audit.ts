import * as Request from "../../common/api/request";
import { links, StandardParams, QueryParams } from "../../common/api";
import {
  CollectionDoc,
  ResourceId,
  Events,
  OwnerScope,
  OwnerInclude,
} from "../../common/structs";
import { Token } from "../../auth";
import { ApiKeys } from "../../resources/hubs";

export type AuditLogQuery = QueryParams<keyof AuditLogIncludes>;

export interface AuditLog {
  id: ResourceId;
  hub_id: ResourceId;
  environment_id: ResourceId;
  session: Session;
  type: AuditLogTypes;
  component: Component;
  events: Events;
  message: string;
  user: OwnerScope;
  code: string;
}

export type AuditLogTypes = "success" | "info" | "warning" | "error";

export interface Session {
  url: string;
  ip: string;
  token: Token;
  apiKeyId: ApiKeys.ApiKey;
}

export interface Component {
  id: string;
  type: string;
}

export interface AuditLogIncludes {
  owners: OwnerInclude;
}

export async function getCollection(params: StandardParams<AuditLogQuery>) {
  return Request.getRequest<CollectionDoc<AuditLog>>({
    ...params,
    target: links.hubs().audit().collection(),
  });
}
