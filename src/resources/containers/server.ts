import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, ProjectRequiredSettings } from "../../common/api";
import {
    CollectionDoc,
    Resource,
    StatefulCounts,
    ResourceId,
} from "../../common/structs";
import { InstanceState } from "../containers/instances";

export type Collection = CollectionDoc<ServerInstances>;

export interface ServerInstances extends Resource {
    instances: StatefulCounts<InstanceState>;
}

export async function getCollection({
    containerId,
    token,
    query,
    settings,
}: {
    containerId: ResourceId;
    token: Token;
    query?: QueryParams<"">;
    settings?: ProjectRequiredSettings;
}) {
    return Request.getRequest<Collection>({
        target: links.containers().servers(containerId),
        query,
        token,
        settings,
    });
}
