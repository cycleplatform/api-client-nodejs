import { Time, ResourceId, Mills } from "../../../common/structs";
import { PaymentGateway } from "./payment";

export interface Credit {
    id: ResourceId;
    time: Time;
    description: string;
    amount: Mills;
    gateway: PaymentGateway;
}
