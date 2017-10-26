import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import {
    CollectionDoc,
    Resource,
    StatefulCounts,
    ProjectRequiredSettings,
    ResourceId,
} from "../../common/Structs";
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
    return API.getRequest<Collection>({
        target: links.containers().servers(containerId),
        query,
        token,
        settings,
    });
}
