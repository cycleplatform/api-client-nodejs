import { ResourceId } from "../../common/Structs";
import { Providers } from "../infrastructure";

export type BillingCategory = "infrastructure" | "support" | "ips";

export interface BaseLineItem {
    id: ResourceId;
    category: BillingCategory;
    description: string;
    quantity: number;
    price: number;
    discount: number;
}

export interface ServerLineItem extends BaseLineItem {
    server: Server;
    category: "infrastructure";
}

export interface SupportLineItem extends BaseLineItem {
    support_plan: SupportPlan;
    category: "support";
}

export interface IpLineItem extends BaseLineItem {
    category: "ips";
}

export type LineItem = ServerLineItem | SupportLineItem | IpLineItem;

export interface Server {
    id: ResourceId;
    name: string;
    pricing: Providers.Servers.ServerPricing;
    provider_id: ResourceId;
}

export interface SupportPlan {
    id: ResourceId;
    name: string;
    price: number;
}
