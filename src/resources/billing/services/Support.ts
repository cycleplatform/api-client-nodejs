import { ResourceId } from "../../../common/Structs";
import { Amount } from "../Amount";

export interface SupportPlan {
    id: ResourceId;
    name: string;
    price: Amount;
}
