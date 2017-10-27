import { ResourceId, Events, State } from "../../../common/structs";
import { Amount } from "../amount";

export type DiscountState = "new" | "live" | "expired";
export type DiscountEvent = "expires";

export interface Discount {
    id: ResourceId;
    project_id?: ResourceId;
    apply_all: boolean;
    events: Events<DiscountEvent>;
    plans: { [key: string]: Amount };
    state: State<DiscountState>;
}

export interface AssociatedDiscount {
    id: ResourceId;
    amount: Amount;
}
