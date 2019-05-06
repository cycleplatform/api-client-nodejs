import { Image } from "./image";
import { Config } from "./config";
import { Volume } from "./volume";

export interface Container {
  name: string;
  image: Image;
  stateful: boolean;
  config: Config;
  role?: ContainerRole;
  volumes: Volume[];
}

export type ContainerRole = "orchestrator";
