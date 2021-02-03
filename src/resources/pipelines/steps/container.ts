import { Config } from "../../containers/config";
import { VolumeSummary } from "../../containers";
import { ResourceLocation } from "./shared-types";

export interface Create {
  name: string;
  environment: ResourceLocation;
  image: ResourceLocation;
  stateful: boolean;
  annotations: Record<string, any>;
  config: Config;
  volumes?: VolumeSummary[];
}

export type Start = ResourceLocation;

export type Stop = ResourceLocation;

export type Restart = ResourceLocation;

export type Reimage = ResourceLocation & {
  image: ResourceLocation;
};

export type Delete = ResourceLocation;
