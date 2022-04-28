import {
  Resource,
  ResourceId,
  State as BaseState,
  Events as BaseEvents,
  CollectionDoc,
  SingleDoc,
} from "../../../common/structs";
import { BackupDestination } from "../../stacks/spec/v1/integrations";
import { StandardParams, links } from "../../../common/api";
import * as Request from "../../../common/api/request";

/****************************** Backup Struct ******************************/

export interface Backup extends Resource {
  hub_id: ResourceId;
  container_id: ResourceId;
  instance_id: ResourceId;
  target: Target;
  state: State;
  events: Events;
}

/****************************** Backup Struct Sub Types ******************************/

export type State = BaseState<States>;

export type States = "saving" | "live" | "deleting" | "deleted";

export type Events = BaseEvents;

export interface Target {
  destination: BackupDestination;
  path: string;
  size: number;
}

/****************************** Metas, Includes, Docs, Query ******************************/

export type Collection = CollectionDoc<Backup>;
export type Single = SingleDoc<Backup>;

/****************************** Params ******************************/

/** Base Collection Params */
interface BCP extends StandardParams {
  containerId: ResourceId;
}

interface BSP extends BCP {
  id: ResourceId;
}

/**
 * getCollection function params
 */
export type GetCollectionParams = BCP;
export type GetSingleParams = BSP;

export async function getSingle(params: GetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.containers().backups().single(params.id, params.containerId),
  });
}

export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.containers().backups().collection(params.containerId),
  });
}
