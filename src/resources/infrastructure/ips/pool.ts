import {
  Resource,
  ResourceId,
  IP,
  State,
  CollectionDoc,
  SingleDoc,
} from "../../../common/structs";
import { Kind } from "./kind";
import { ProviderIdentifier } from "../provider";
import {
  StandardParams,
  getRequest,
  patchRequest,
  links,
} from "../../../common/api";

export type Collection = CollectionDoc<Pool>;
export type Single = SingleDoc<Pool>;
export type PoolState = "live" | "releasing" | "released";

export interface Pool extends Resource {
  hub_id: ResourceId;
  kind: Kind;
  provider: Provider;
  server_id: ResourceId;
  preserve: boolean;
  location_id: ResourceId;
  ips: IPs;
  block: Block;
  state: State<PoolState>;
}

export interface IPs {
  total: number;
  available: number;
}

export interface Block {
  cidr: string;
  gateway: IP;
  netmask: IP;
  network: IP;
}

export type ReservationIdentifier = string;
export type ServerIdentifier = string;
export type ServerAssignmentIdentifier = string;

export interface Provider {
  identifier: ProviderIdentifier;
  location: string;
  reservation: ReservationIdentifier;
  server: ServerIdentifier;
  server_assignment: ServerAssignmentIdentifier;
}

export async function getCollection(params: StandardParams) {
  return getRequest<Collection>({
    ...params,
    target: links
      .infrastructure()
      .ips()
      .pools()
      .collection(),
  });
}

export async function getSingle(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return getRequest<Single>({
    ...params,
    target: links
      .infrastructure()
      .ips()
      .pools()
      .single(params.id),
  });
}

export interface UpdateParams {
  preserve: boolean;
}

export async function update(
  params: StandardParams & {
    id: ResourceId;
    value: UpdateParams;
  },
) {
  return patchRequest<Single>({
    ...params,
    target: links
      .infrastructure()
      .ips()
      .pools()
      .single(params.id),
  });
}
