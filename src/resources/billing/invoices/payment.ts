import { Time, ResourceId, Mills } from "../../../common/structs";

export type PaymentGateway = "stripe";

export interface Payment {
    id: ResourceId;
    time: Time;
    description: string;
    amount: Mills;
    amount_refunded: Mills;
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
