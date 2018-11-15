import { Resource, ResourceId, IP } from "../../common/structs";

export interface Hook extends Resource {
  pipeline_id: ResourceId;
  active: boolean;
  secret: string;
  ips: IP[];
}
