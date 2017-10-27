import { Time, ResourceId, Mills } from "../../../common/structs";
import { PaymentGateway } from "./Payment";

export interface Credit {
    id: ResourceId;
    time: Time;
    description: string;
    amount: Mills;
    gateway: PaymentGateway;
}
