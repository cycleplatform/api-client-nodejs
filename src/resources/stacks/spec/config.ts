import { Deployment } from "./deployment";
import { Runtime } from "./runtime";
import { Network } from "./network";
import { Resources } from "./resources";
import { Options } from "./options";
import { Scaling } from "./scaling";

export interface Config {
    deployment?: Deployment;
    scaling?: Scaling;
    runtime?: Runtime;
    network: Network;
    resources?: Resources;
    options?: Options;
}
