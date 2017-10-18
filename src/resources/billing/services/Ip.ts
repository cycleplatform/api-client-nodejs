import { ResourceId } from "../../../common/Structs";
import { Amount } from "../Amount";

export interface IpsPlan {
    id: ResourceId;
    price: Amount;
    provider_network: ProviderNetwork;
}

export interface ProviderNetwork {
    network_id: string;
}
