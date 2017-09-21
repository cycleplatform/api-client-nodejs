import {
    CollectionDoc,
    Resource,
    ResourceId,
    SingleDoc,
} from "../../../common/Structs";

export type Collection = CollectionDoc<DataCenter>;
export type Single = SingleDoc<DataCenter>;

export interface DataCenter extends Resource {
    name: string;

    location: Location;

    provider: {
        id: ResourceId;
        datacenter: string;
        code: string;
    };

    features: string[];
}

export interface Location {
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    country: string;
}