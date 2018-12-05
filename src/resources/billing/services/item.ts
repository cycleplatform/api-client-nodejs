import { ResourceId } from "../../../common/structs";
import { Amount } from "../amount";

export interface Item {
  support?: ItemPlan;
  tier?: ItemPlan;
}

export interface ItemPlan {
  id: ResourceId;
  name: string;
  price: Amount;
}
