import {
    Time,
    ResourceId,
    StandardEvents,
    ResourceState,
} from "../../common/Structs";
import { Term } from "./Term";
import { Providers } from "../infrastructure";
import { BandwidthPricing } from "../plans/Bandwidth";

export interface Service {
    id: ResourceId;
    project_id: ResourceId;
    title: string;
    order_id: ResourceId;
    item: ServiceItem;
    events: StandardEvents & {
        billed?: Time;
        paid?: Time;
        payment_attempt?: Time;
        credited?: Time;
        voided?: Time;
    };
    price: number;
    term: Term;
    state: ResourceState;
}

export interface ServiceItem {
    server?: Server;
    ips?: IPs;
    bandwidth?: Bandwidth;
    support?: Support;
}

export interface Server {
    plan_id: ResourceId;
    pricing: Providers.Servers.ServerPricing;
    datacenter_id: ResourceId;
    provider_id: ResourceId;
    hostname: string;
    server_id?: ResourceId;
}

export interface IPs {
    plan_id: ResourceId;
    price: number;
    provider_network: {
        network_id: string;
    };
}

export interface Bandwidth {
    plan_id: ResourceId;
    pricing: BandwidthPricing;
}

export interface Support {
    plan_id: ResourceId;
    name: string;
    price: number;
}
