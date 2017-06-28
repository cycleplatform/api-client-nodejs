import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import {
    CollectionDoc,
    Resource,
    Settings,
    SingleDoc,
    Mills,
} from "../../common/Structs";

import { ProviderName } from "./Providers";

export type Collection = CollectionDoc<Server>;
export type Single = SingleDoc<Server>;

export interface Server extends Resource {
    slug: string;
    name: string;
    description: string;

    specs: {
        cpu: ServerCPU[];
        memory: ServerMemory;
        drives: ServerDrive[];
        nics: ServerNIC[];
        features: ServerFeatures;
    };

    provider: {
        id: string;
        name: ProviderName;
    };

    pricing: {
        monthly: Mills;
        yearly: Mills;
    };

    containers: {
        min: number;
        max: number;
    };
}

export interface ServerCPU {
    count: number;
    type: string;
}

export interface ServerMemory {
    total: string;
}

export interface ServerDrive {
    count: number;
    size: string;
    type: string;
}

export interface ServerNIC {
    count: number;
    type: string;
}

export interface ServerFeatures {
    raid: boolean;
    txt: boolean;
}

export async function getCollection({
    provider,
    query,
    settings,
}: {
    provider: ProviderName;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.getRequest<Single>(
        links.infrastructure(settings).providers().servers(provider),
        query,
    );
}
