import { ResourceId } from "../../../common/structs";
import { BandwidthPricing } from "../../plans/bandwidth";

export interface BandwidthPlan {
    id: ResourceId;
    price: BandwidthPricing;
}
