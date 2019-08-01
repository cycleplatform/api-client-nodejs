import {
  Resource,
  OwnerScope,
  ResourceId,
  State,
  Events,
  CollectionDoc,
  SingleDoc,
} from "../../../../common/structs";
import {
  StandardParams,
  getRequest,
  links,
  postRequest,
  deleteRequest,
  patchRequest,
} from "../../../../common/api";

export type Collection = CollectionDoc<EgressGateway>;
export type Single = SingleDoc<EgressGateway>;
export type EggressGatewayState = "live" | "deleting" | "deleted";

export interface EgressGateway extends Resource {
  name: string;
  owner: OwnerScope;
  hub_id: ResourceId;
  environment_id: ResourceId;
  state: State<EggressGatewayState>;
  destinations: string[];
  ports: Port;
  events: Events;
}

export interface Port {
  internal: string;
  external: string;
}

export async function getEgressGatewayCollection(
  params: StandardParams & {
    environmentId: ResourceId;
  },
) {
  return getRequest<Collection>({
    ...params,
    target: links
      .environments()
      .services()
      .lb()
      .egress()
      .collection(params.environmentId),
  });
}

export async function getEgressGateway(
  params: StandardParams & {
    environmentId: ResourceId;
    gatewayId: ResourceId;
  },
) {
  return getRequest<Single>({
    ...params,
    target: links
      .environments()
      .services()
      .lb()
      .egress()
      .single(params.environmentId, params.gatewayId),
  });
}

export interface GatewayCreateParams {
  name: string;
  destinations: string[];
  ports: Port;
}

export async function createGateway(
  params: StandardParams & {
    environmentId: ResourceId;
    value: GatewayCreateParams;
  },
) {
  return postRequest<Single>({
    ...params,
    target: links
      .environments()
      .services()
      .lb()
      .egress()
      .collection(params.environmentId),
  });
}

export async function updateGateway(
  params: StandardParams & {
    environmentId: ResourceId;
    gatewayId: ResourceId;
    value: Partial<GatewayCreateParams>;
  },
) {
  return patchRequest<Single>({
    ...params,
    target: links
      .environments()
      .services()
      .lb()
      .egress()
      .single(params.environmentId, params.gatewayId),
  });
}

export function deleteGateway(
  params: StandardParams & {
    environmentId: ResourceId;
    gatewayId: ResourceId;
  },
) {
  return deleteRequest({
    ...params,
    target: links
      .environments()
      .services()
      .lb()
      .egress()
      .single(params.environmentId, params.gatewayId),
  });
}
