import { ResourceId, Time } from "../../../common/structs";
import { Amount } from "../amount";

export interface AssociatedDiscount {
  id: ResourceId;
  amount: Amount;
  expires: Time;
}
