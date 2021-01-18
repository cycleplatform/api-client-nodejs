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
import { Step } from "./steps";
import * as Request from "../../common/api/request";

export type Collection = CollectionDoc<PipelineRun>;

export type PipelineRun = Resource & {
  creator: UserScope;
  hubId: ResourceId;
  pipelineId: ResourceId;
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
  name: string;
  events: PipelineRunTimingEvents;
  steps: Step[];
};

export type PipelineRunTimingEvents = {
  started: Time;
  finished: Time;
};

export type PipelineRunTasks = {
  events: PipelineRunTimingEvents;
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
