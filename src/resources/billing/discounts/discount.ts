import { ResourceId, Events, State } from "../../../common/structs";
import { Amount } from "../amount";
import { PlanType } from "../../plans";

export type DiscountState = "new" | "live" | "expired";
export type DiscountEvent = "expires";

export type Plans<K extends PlanType = PlanType> = { [P in K]: Amount };

export interface Discount {
  id: ResourceId;
  project_id?: ResourceId;
  apply_all: boolean;
  events: Events<DiscountEvent>;
  plans: Plans;
  state: State<DiscountState>;
}

export interface AssociatedDiscount {
  id: ResourceId;
  amount: Amount;
}
