import {
  Resource,
  UserScope,
  ResourceId,
  State,
  Time,
  CollectionDoc,
  CustomEvents,
} from "../../common/structs";
import { ErrorResource, StandardParams, links } from "../../common/api";
import { AllActionKeys } from "./steps";
import * as Request from "../../common/api/request";

export type Collection = CollectionDoc<PipelineRun>;

export type PipelineRun = Resource & {
  creator: UserScope;
  hubId: ResourceId;
  pipeline_id: ResourceId;
  stages: PipelineRunStages[];
  state: State<PipelineRunState>;
  events: CustomEvents<PipelineRunEvents>;
};

export type PipelineRunEvents = "started" | "queued" | "finished";

export type PipelineRunState =
  | "new"
  | "queued"
  | "running"
  | "deleting"
  | "deleted";

export type PipelineRunStages = {
  identifier: string;
  events: PipelineRunTimingEvents;
  steps: PipelineRunStep[];
};

export type PipelineRunTimingEvents = {
  started: Time;
  finished: Time;
};

export type PipelineRunStep = {
  identifier?: string;
  events: PipelineRunTimingEvents;
  action: AllActionKeys;
  success: boolean;
  error?: ErrorResource;
};

type BaseCollectionParams = StandardParams & {
  pipelineId: ResourceId;
};

export type GetRunCollectionParams = BaseCollectionParams;
export async function getRunCollection(params: GetRunCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.pipelines().runs(params.pipelineId),
  });
}
