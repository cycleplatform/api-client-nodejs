import { Service } from "./common";

export interface DiscoveryService extends Service {
  config: DiscoveryConfig | null;
}

// tslint:disable-next-line:no-empty-interface
export interface DiscoveryConfig {}
