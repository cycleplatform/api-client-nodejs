import { ResourceId } from "../../common/structs";

export type PlanType = "servers" | "bandwidth" | "ips" | "support";
export interface PlanAssociation {
    id: ResourceId;
    type: PlanType;
}
