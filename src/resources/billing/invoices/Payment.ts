import { Time, ResourceId } from "../../../common/Structs";

export type PaymentGateway = "stripe";

export interface Payment {
    id: ResourceId;
    time: Time;
    description: string;
    amount: number;
    amount_refunded: number;
    refunds: Refund[];
    method_id: ResourceId;
    result: PaymentResult;
    gateway: PaymentGateway;
}

export interface Refund {
    id: ResourceId;
    time: Time;
    description: string;
    amount: number;
    gateway: PaymentGateway;
}

export interface PaymentResult {
    success: boolean;
    error: string;
}
