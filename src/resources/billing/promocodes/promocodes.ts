import { Resource, ResourceId, Time } from "../../../common/structs";
import { Amount } from "../amount";

export interface PromoCode extends Resource {
    code: string;
    credit: Amount;
    discount_id: ResourceId;
    expires: Time;
}
