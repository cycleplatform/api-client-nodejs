import { Time, ResourceId } from "../../common/Structs";

export interface Credit {
    id: ResourceId;
    time: Time;
    description: string;
    amount: number;
    project_credit?: ResourceId;
}
