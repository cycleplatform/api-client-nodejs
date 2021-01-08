import {
  Resource,
  UserScope,
  ResourceId,
  State,
  Events,
  Time,
  CollectionDoc,
} from "common/structs";
import { ErrorResource, StandardParams, links } from "common/api";
import { AllTasks } from "../tasks";
import * as Request from "../../../common/api/request";

export type Collection = CollectionDoc<PipelineRun>;

export type PipelineRun = Resource & {
  creator: UserScope;
  hubId: ResourceId;
  pipelineId: ResourceId;
  stages: PipelineRunStages[];
  state: State<PipelineRunState>;
  events: Events;
};

export type PipelineRunState =
  | "new"
  | "ready"
  | "running"
  | "deleting"
  | "deleted";

export type PipelineRunStages = {
  name: string;
  events: PipelineRunTimingEvents;
  tasks: Partial<AllTasks>;
};

export type PipelineRunTimingEvents = {
  started: Time;
  ended: Time;
};

export type PipelineRunTasks = {
  events: PipelineRunTimingEvents;
  success: boolean;
  error?: ErrorResource;
};

export async function getRunCollection(
  params: StandardParams & {
    pipelineId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.pipelines().runs(params.pipelineId),
  });
}
