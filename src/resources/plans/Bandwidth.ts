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

export type Collection = CollectionDoc<Bandwidth>;
export type Single = SingleDoc<Bandwidth>;

export interface Bandwidth extends Resource {
    quantity: number;
    unit: string;
    price: BandwidthPricing;
}

export interface BandwidthPricing {
    fixed: Mills;
    overage: {
        cost: Mills;
        per: string;
    };
}

export async function getCollection({
    query,
    settings,
}: {
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.getRequest<Collection>({
        target: links.plans().bandwidth(),
        query,
        settings,
    });
}
