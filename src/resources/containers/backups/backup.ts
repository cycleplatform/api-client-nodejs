import {
  Resource,
  ResourceId,
  State as BaseState,
  Events as BaseEvents,
  CollectionDoc,
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

/****************************** Params ******************************/

/** Base Collection Params */
interface BCP extends StandardParams {
  containerId: ResourceId;
}

/**
 * getCollection function params
 */
export type GetCollectionParams = BCP;

export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.containers().backups().collection(params.containerId),
  });
}

