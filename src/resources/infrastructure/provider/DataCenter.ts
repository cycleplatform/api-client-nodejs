import {
    CollectionDoc,
    Resource,
    ResourceId,
    SingleDoc,
    Settings,
} from "../../../common/Structs";
import { QueryParams } from "../../../common/QueryParams";
import * as API from "../../../common/Api";
import { links } from "../../../common/Links";

export type Collection = CollectionDoc<DataCenter>;
export type Single = SingleDoc<DataCenter>;

export interface DataCenter extends Resource {
    name: string;
    location: Location;
    provider: DataCenterProvider;
    features: string[];
    abbreviation: string;
}

export interface Location {
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    country: string;
}

export interface DataCenterProvider {
    id: ResourceId;
    datacenter_id: ResourceId;
    code: string;
}

export async function getCollection({
    provider,
    query,
    settings,
}: {
    provider: ResourceId;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.getRequest<Collection>({
        target: links
            .infrastructure()
            .providers()
            .datacenters(provider),
        query,
        settings,
    });
}
