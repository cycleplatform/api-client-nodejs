import { ResourceId } from "../../../common/Structs";
import { BandwidthPricing } from "../../plans/Bandwidth";

export interface BandwidthPlan {
    id: ResourceId;
    price: BandwidthPricing;
}
