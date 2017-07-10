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

export type Collection = CollectionDoc<BandwidthPlan>;
export type Single = SingleDoc<BandwidthPlan>;

export interface BandwidthPlan extends Resource {
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
