import { Deploy } from "./deploy";
import { Runtime } from "./runtime";
import { Network } from "./network";
import { Resources } from "./resources";
import { Integrations } from "./integrations";
import { Scaling } from "./scaling";

export interface Config {
  network: Network;
  deploy: Deploy;
  scaling: Scaling | null;
  runtime: Runtime | null;
  resources: Resources | null;
  integrations: Integrations | null;
}

export { Deploy, Runtime, Network, Resources, Integrations, Scaling };
