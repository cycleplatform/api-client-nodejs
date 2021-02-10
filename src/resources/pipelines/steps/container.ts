import { Config, Volumes } from "../../containers/config";
import { ResourceLocation } from "./shared-types";

export interface Create {
  name: string;
  environment: ResourceLocation;
  image: ResourceLocation;
  stateful: boolean;
  annotations: Record<string, any>;
  config: Config;
  volumes?: Volumes.Volume[];
}

export type Start = ResourceLocation;

export type Stop = ResourceLocation;

export type Restart = ResourceLocation;

export type Reimage = ResourceLocation & {
  image: ResourceLocation;
};

export type Delete = ResourceLocation;
