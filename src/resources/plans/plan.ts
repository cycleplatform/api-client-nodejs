import { ResourceId } from "../../common/structs";

export type PlanType = "tier" | "support";
export interface PlanAssociation {
  id: ResourceId;
  type: PlanType;
}
