import { ResourceId } from "../../../common/structs";
import { ServerPricing } from "../../infrastructure/provider/server";

export interface Server {
  pricing: ServerPricing;
  datacenter_id: ResourceId;
  tags: string[];
  provider_id: ResourceId;
  provider_server_id: ResourceId;
  hostname: string;
}
