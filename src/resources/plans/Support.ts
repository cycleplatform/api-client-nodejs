import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import {
    CollectionDoc,
    Resource,
    Settings,
    SingleDoc,
} from "../../common/Structs";
import { Amount } from "../billing";

export type Collection = CollectionDoc<SupportPlan>;
export type Single = SingleDoc<SupportPlan>;

export interface SupportPlan extends Resource {
    name: string;
    price: Amount;
    description: string;
}

export async function getCollection({
    query,
    settings,
}: {
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.getRequest<Collection>({
        target: links.plans().support(),
        query,
        settings,
    });
}
