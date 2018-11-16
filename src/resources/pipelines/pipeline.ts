import {
  Resource,
  ResourceId,
  OwnerScope,
  State,
  Events,
} from "../../common/structs";

export type PipelineState =
  | "new"
  | "live"
  | "building"
  | "deploying"
  | "deleting"
  | "deleted";

export interface Pipeline extends Resource {
  name: string;
  owner: OwnerScope;
  stack_id: ResourceId;
  project_id: ResourceId;
  stages: Stages;
  state: State<PipelineState>;
  events: Events;
}

export interface Stages {
  labels: string[];
  default: string;
}
