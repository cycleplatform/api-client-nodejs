import { Time, ResourceId } from "../../../common/structs";
import { AssiciatedCredit } from "../credits";

export interface Credit {
    id: ResourceId;
    associated_credit: AssociatedCredit;
    time: Time;
    description: string;
    amount: number;
}
