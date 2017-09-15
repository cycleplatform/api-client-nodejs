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
