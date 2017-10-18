import { Time, ResourceId } from "../../../common/Structs";

export interface LateFee {
    id: ResourceId;
    time: Time;
    description: string;
    amount: number;
}
