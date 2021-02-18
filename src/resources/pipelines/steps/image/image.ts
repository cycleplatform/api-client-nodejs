import { ResourceId } from "../../../../common/structs";
import { ResourceLocation } from "../shared-types";

export interface Create {
  name?: string;
  source: ResourceLocation;
}

export type Import = ResourceLocation;

export interface Prune {
  source_ids: ResourceId[];
}
