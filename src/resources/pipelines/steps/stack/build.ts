import { ResourceLocation } from "../shared-types";
import { Instructions, About } from "../../../../resources/stacks/builds";

export interface Create {
  stack: ResourceLocation;
  instructions: Instructions;
  about?: About;
}

export type Generate = ResourceLocation;
