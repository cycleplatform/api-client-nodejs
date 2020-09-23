import { CreatorScope, Events, Resource, ResourceId } from "common/structs";
import { Tasks } from "../tasks";

export interface Pipeline extends Resource {
  name: string;
  creator: CreatorScope;
  hubId: ResourceId;
  stages: Stages[];
  events: Events;
}

export type Stages = {
  name: string;
  tasks: Tasks;
  disabled: boolean;
};
