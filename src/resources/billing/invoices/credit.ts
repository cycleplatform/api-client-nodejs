import { Time, ResourceId } from "../../../common/structs";
import { AssociatedCredit } from "../credits";

export interface Credit {
  id: ResourceId;
  associated_credit: AssociatedCredit;
  time: Time;
  description: string;
  amount: number;
}
