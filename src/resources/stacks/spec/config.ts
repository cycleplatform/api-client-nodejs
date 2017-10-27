import { Volume } from "./volume";
import { Tags } from "./tags";
import { Runtime } from "./runtime";
import { Network } from "./network";
import { Resources } from "./resources";
import { Options } from "./options";

export interface Config {
    instances?: number;
    volumes: Volume[];
    tags: Tags;
    runtime: Runtime;
    environment_vars: { [key: string]: string };
    required_secrets: string[];
    network: Network;
    resources?: Resources;
    options?: Options;
}
