import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  ResourceId,
  Events,
  OwnerScope,
} from "../../common/structs";
import { Token } from "../../auth";
import { ApiKeys } from "../../resources/hubs";

export interface AuditLog {
  id: ResourceId;
  hub_id: ResourceId;
  environment_id: ResourceId;
  session: Session;
  type: string;
  component: Component;
  events: Events;
  message: string;
  user: OwnerScope;
  code: string;
}

export interface Session {
  url: string;
  ip: string;
  token: Token;
  apiKeyId: ApiKeys.ApiKey;
}

export interface Component {
  type: string;
}

export async function getCollection(params: StandardParams) {
  return Request.getRequest<CollectionDoc<AuditLog>>({
    ...params,
    target: links.hubs().audit(),
  });
}
