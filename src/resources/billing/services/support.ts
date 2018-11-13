import { ResourceId } from "../../../common/structs";
import { Amount } from "../amount";

export interface SupportPlan {
  id: ResourceId;
  name: string;
  price: Amount;
}
