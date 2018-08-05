import * as Request from "../../../common/api/request";
import { QueryParams, links, Settings } from "../../../common/api";
import {
    CollectionDoc,
    Resource,
    SingleDoc,
    ResourceId,
    Includes,
} from "../../../common/structs";
import { DataCenter } from "./datacenter";
import { ProviderNames } from "./provider";
import { Amount } from "../../billing";

export type Collection = CollectionDoc<Server, {}, ServerIncludes>;
export type Single = SingleDoc<Server>;

export interface Server extends Resource {
    name: string;
    description: string;

    specs: {
        cpus: Array<GenericSpecs<ServerCPU>>;
        memory: Array<GenericSpecs<ServerMemory>>;
        drives: Array<GenericSpecs<ServerDrive>>;
        nics: Array<GenericSpecs<ServerNIC>>;
        features: ServerFeatures;
    };

    provider: {
        id: string;
        name: ProviderNames;
        slug: string;
    };

    pricing: ServerPricing;

    recommended_containers: {
        min: number;
        max: number;
    };

    datacenter_ids: ResourceId[];
}

export interface ServerIncludes extends Includes {
    datacenters: { [key: string]: DataCenter };
}

export interface GenericSpecs<T> {
    count: number;
    specs: T;
}

export interface ServerCPU {
    model: string;
    cores: number;
    frequency: {
        speed: number;
        unit: string;
    };
}

export interface ServerMemory {
    storage: {
        size: number;
        unit: string;
    };
    type: string;
}

export interface ServerDrive {
    storage: {
        size: number;
        unit: string;
    };
    type: string;
    raid?: {
        enabled: boolean;
        level: number;
    };
}

export interface ServerNIC {
    throughput: {
        speed: number;
        unit: string;
    };
    type: string;
    bonded: boolean;
}

export interface ServerFeatures {
    raid: boolean;
    txt: boolean;
}

export interface ServerPricing {
    infrastructure: Amount;
    licensing: Amount;
}

export async function getCollection({
    provider,
    query,
    settings,
}: {
    provider: string;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<Collection>({
        target: links
            .infrastructure()
            .providers()
            .servers(provider),
        query,
        settings,
    });
}
