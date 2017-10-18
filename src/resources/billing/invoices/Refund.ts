import { Time, ResourceId } from "../../../common/Structs";
import { PaymentGateway } from "./Payment";

export interface Credit {
    id: ResourceId;
    time: Time;
    description: string;
    amount: number;
    gateway: PaymentGateway;
}
