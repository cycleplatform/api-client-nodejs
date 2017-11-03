import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, ProjectRequiredSettings } from "../../common/api";
import {
    CollectionDoc,
    Resource,
    State,
    Events,
    UserScope,
    ResourceId,
} from "../../common/structs";

export type Collection = CollectionDoc<Record>;
export type RecordState =
    | "pending"
    | "verifying"
    | "live"
    | "disabled"
    | "deleting"
    | "deleted";
export type RecordEvent = "last_verification" | "verified";

export interface Record extends Resource {
    project_id: ResourceId;
    owner: UserScope;
    origin: string;
    state: State<RecordState>;
    events: Events<RecordEvent>;
}

export async function getCollection({
    containerId,
    token,
    query,
    settings,
}: {
    containerId: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: ProjectRequiredSettings;
}) {
    return Request.getRequest<Collection>({
        target: links.containers().servers(containerId),
        query,
        token,
        settings,
    });
}
