import {
    Time,
    ResourceId,
    StandardEvents,
    ResourceState,
} from "../../common/Structs";
import { Term } from "./Term";
import { ServerPricing } from "../infrastructure/Servers";
import { BandwidthPricing } from "../plans/Bandwidth";

export interface Service {
    id: ResourceId;
    project: ResourceId;
    title: string;
    order: ResourceId;
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
    plan: ResourceId;
    pricing: ServerPricing;
    datacenter: ResourceId;
    provider: ResourceId;
    hostname: string;
    server?: ResourceId;
}

export interface IPs {
    plan: ResourceId;
    price: number;
    provider_network: {
        network_id: string;
    };
}

export interface Bandwidth {
    plan: ResourceId;
    pricing: BandwidthPricing;
}

export interface Support {
    plan: ResourceId;
    name: string;
    price: number;
}
