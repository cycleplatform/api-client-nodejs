import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, ProjectRequiredSettings } from "../../common/api";
import { ResourceId, CollectionDoc, SingleDoc } from "../../common/structs";
import { Record } from "./record";

export type Collection = CollectionDoc<Record>;
export type Single = SingleDoc<Record>;

export async function getCollection({
    token,
    query,
    settings,
}: {
    zoneId: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: ProjectRequiredSettings;
}) {
    return Request.getRequest<Collection>({
        target: links
            .dns()
            .domains()
            .collection(),
        query,
        token,
        settings,
    });
}

export interface CreateParams {
    domain: string;
    container_id?: ResourceId;
}

export async function create({
    value,
    token,
    query,
    settings,
}: {
    zoneId: ResourceId;
    value: CreateParams;
    token: Token;
    query?: QueryParams;
    settings?: ProjectRequiredSettings;
}) {
    return Request.postRequest<Single>({
        target: links
            .dns()
            .domains()
            .collection(),
        query,
        token,
        settings,
        value,
    });
}
