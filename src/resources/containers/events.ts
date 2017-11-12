import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, ProjectRequiredSettings } from "../../common/api";
import {
    CollectionDoc,
    Resource,
    ResourceId,
    Time,
} from "../../common/structs";

export type Collection = CollectionDoc<Event>;
export type EventType = "default" | "info" | "success" | "error";

export interface Event extends Resource {
    platform: boolean;
    project_id: ResourceId;
    container_id: ResourceId;
    caption: string;
    instance_id: ResourceId;
    type: EventType;
    time: Time;
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
        target: links.containers().events(containerId),
        query,
        token,
        settings,
    });
}
