import * as Request from "../../common/api/request";
import { QueryParams, links, Settings } from "../../common/api";
import { CollectionDoc, Resource, SingleDoc } from "../../common/structs";
import { Amount } from "../billing";

export type Collection = CollectionDoc<IpsPlan>;
export type Single = SingleDoc<IpsPlan>;

export interface IpsPlan extends Resource {
    quantity: number;
    price: Amount;
}

export async function getCollection({
    query,
    settings,
}: {
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<Collection>({
        target: links.plans().ips(),
        query,
        settings,
    });
}
