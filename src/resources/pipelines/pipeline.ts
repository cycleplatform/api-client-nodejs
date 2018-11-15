import {
  Resource,
  ResourceId,
  OwnerScope,
  State,
  Events,
} from "../../common/structs";

export interface Pipeline extends Resource {
  name: string;
  owner: OwnerScope;
  stack_id: ResourceId;
  project_id: ResourceId;
  stages: Stages;
  state: State;
  events: Events;
}

export interface Stages {
  labels: string[];
  default: string;
}
