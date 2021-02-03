import { Cluster } from "common/structs";
import { ResourceLocation } from "./shared-types";

export interface Create {
  name: string;
  about?: {
    description: string;
  };
  cluster: Cluster;
  features: {
    legacy_networking: boolean;
  };
  stack_build?: ResourceLocation;
}

export type Start = ResourceLocation;

export type Stop = ResourceLocation;

export type Delete = ResourceLocation;
