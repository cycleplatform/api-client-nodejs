import { Deploy } from "./deploy";
import { Runtime } from "./runtime";
import { Network } from "./network";
import { Resources } from "./resources";
import { Integrations } from "./integrations";
import { Scaling } from "./scaling";

export interface Config {
  network: Network;
  deploy: Deploy;
  scaling?: Scaling;
  runtime?: Runtime;
  resources?: Resources;
  integrations?: Integrations;
}
