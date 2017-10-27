import { Time, ResourceId, Mills } from "../../../common/structs";

export interface LateFee {
    id: ResourceId;
    time: Time;
    description: string;
    amount: Mills;
}
