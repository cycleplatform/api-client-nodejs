import { ResourceId } from "../../../common/Structs";
import { ServerPricing } from "../../infrastructure/provider/Server";

export interface Server {
    pricing: ServerPricing;
    datacenter_id: ResourceId;
    tags: string[];
    provider_id: ResourceId;
    provider_server_id: ResourceId;
    hostname: string;
}
