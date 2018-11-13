import { ResourceId } from "../../../common/structs";
import { Amount } from "../amount";

export interface IpsPlan {
  id: ResourceId;
  price: Amount;
  provider_network: ProviderNetwork;
}

export interface ProviderNetwork {
  network_id: string;
}
