import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import {
    CollectionDoc,
    Resource,
    ResourceId,
    Settings,
    SingleDoc,
} from "../../common/Structs";

export type Collection = CollectionDoc<DataCenter>;
export type Single = SingleDoc<DataCenter>;

export interface DataCenter extends Resource {
    name: string;

    location: {
        latitude: number;
        longitude: number;
    };

    provider: {
        id: ResourceId;
        datacenter: string;
        code: string;
    };

    features: string[];
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
    return API.getRequest<Collection>(
        links.infrastructure(settings).providers().datacenters(provider),
        query,
    );
}
