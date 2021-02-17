import {
  Resource,
  UserScope,
  ResourceId,
  State as StateBase,
  Time,
  CollectionDoc,
  CustomEvents,
} from "../../../common/structs";
import { ErrorResource, StandardParams, links } from "../../../common/api";
import { AllActionKeys } from "../steps";
import * as Request from "../../../common/api/request";

/****************************** Run Struct ******************************/
export type Run = Resource & {
  creator: UserScope;
  hub_id: ResourceId;
  pipeline_id: ResourceId;
  stages: Stage[];
  state: State;
  events: Events;
};

/****************************** Run Struct Sub Types ******************************/

export type Events = CustomEvents<"started" | "queued" | "finished">;

export type State = StateBase<States>;

export type States = "new" | "queued" | "running" | "deleting" | "deleted";

/**
 * This is stage struct is specific to runs. If you are looking for
 * the stage struct within the root pipeline object, use `Pipelines.Stage`
 */
export type Stage = {
  identifier: string;
  events: TimingEvents;
  steps: Step[];
};

export type TimingEvents = {
  started: Time;
  finished: Time;
};

/**
 * This is step struct is specific to runs. If you are looking for
 * the step for a step within a pipeline stage, use `Pipelines.Step`
 */
export type Step = {
  identifier?: string;
  events: TimingEvents;
  action: AllActionKeys;
  success: boolean;
  error?: ErrorResource;
};

/****************************** Metas, Includes, Docs, Query ******************************/

export type Collection = CollectionDoc<Run>;

/****************************** Params ******************************/
/** Base Collection Params */
type BCP = StandardParams & {
  pipelineId: ResourceId;
};

export type GetCollectionParams = BCP;

/****************************** Functions ******************************/

export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.pipelines().runs(params.pipelineId),
  });
}
