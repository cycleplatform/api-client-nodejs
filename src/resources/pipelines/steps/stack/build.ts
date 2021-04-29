import { ResourceLocation } from "../shared-types";
import { Instructions, About } from "../../../../resources/stacks/builds";

export type CreateType = "direct";
export interface Create {
  stack: ResourceLocation;
  type: CreateType;
  instructions: Instructions;
  about?: About;
}

export type Generate = ResourceLocation;

export type Deploy = ResourceLocation & {
  environment: ResourceLocation;
};
