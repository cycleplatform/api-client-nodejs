import * as Request from "../../common/api/request";
import { QueryParams, links, Settings } from "../../common/api";
import { CollectionDoc, Resource, SingleDoc } from "../../common/structs";
import { Amount } from "../billing";

export type Collection = CollectionDoc<BandwidthPlan>;
export type Single = SingleDoc<BandwidthPlan>;

export interface BandwidthPlan extends Resource {
    quantity: number;
    unit: string;
    price: BandwidthPricing;
}

export interface BandwidthPricing {
    fixed: Amount;
    overage: {
        price: Amount;
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
    return Request.getRequest<Collection>({
        target: links.plans().bandwidth(),
        query,
        settings,
    });
}
