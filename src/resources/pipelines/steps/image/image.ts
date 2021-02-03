import { ResourceId } from "common/structs";
import { ResourceLocation } from "../shared-types";
import { Source } from "../../../images";

export interface Create {
  name?: string;
  source: Source;
}

export type Import = ResourceLocation;

export interface Prune {
  source_ids: ResourceId[];
}
