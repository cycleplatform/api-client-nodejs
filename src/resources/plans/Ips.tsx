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

export type Collection = CollectionDoc<Ips>;
export type Single = SingleDoc<Ips>;

export interface Ips extends Resource {
    quantity: number;
    price: Mills;
}

export async function getCollection({
    query,
    settings,
}: {
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.getRequest<Collection>({
        target: links.plans().ips(),
        query,
        settings,
    });
}
