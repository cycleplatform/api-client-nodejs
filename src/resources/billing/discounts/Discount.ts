import {
    Time,
    ResourceId,
    StandardEvents,
    ResourceState,
} from "../../../common/Structs";
import { Amount } from "../Amount";

export type DiscountState = "new" | "live" | "expired";

export interface Discount {
    id: ResourceId;
    project_id?: ResourceId;
    apply_all: boolean;
    events: StandardEvents & {
        expires: Time;
    };
    plans: { [key: string]: Amount };
    state: ResourceState<DiscountState>;
}

export interface AssociatedDiscount {
    id: ResourceId;
    amount: Amount;
}
