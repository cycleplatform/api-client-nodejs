import { Deployment } from "./deployment";
import { Runtime } from "./runtime";
import { Network } from "./network";
import { Resources } from "./resources";
import { Options } from "./options";
import { Scaling } from "./scaling";

export interface Config {
    deployment: Deployment | null;
    scaling: Scaling | null;
    runtime: Runtime | null;
    network: Network;
    resources: Resources | null;
    options: Options | null;
}
