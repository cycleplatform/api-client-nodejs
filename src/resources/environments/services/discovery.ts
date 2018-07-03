import { Service } from "./common";

export interface DiscoveryService extends Service {
    config: DiscoveryConfig;
}


// tslint:disable-next-line:no-empty-interface
export interface DiscoveryConfig {

}