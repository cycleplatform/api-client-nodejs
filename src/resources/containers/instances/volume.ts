import * as Request from "../../../common/api/request";
import {
    CollectionDoc,
    Resource,
    SingleDoc,
    ResourceId,
    Megabytes,
    Time,
} from "../../../common/structs";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { Spec } from "../../stacks";

export type Collection = CollectionDoc<Volume>;
export type Single = SingleDoc<Volume>;
export type SecretState = "live" | "deleting" | "deleted";

export interface Volume extends Resource {
    config: Spec.Volume;
    deployed: {
        server_id: ResourceId | null;
        container_id: ResourceId;
        container_volume_id: ResourceId;
        hash: string;
        path: string;
        storage: Storage;
        last_updated: Time;
    };
    sftp: SFTP;
}

export interface Storage {
    used: Megabytes;
    total: Megabytes;
}

export interface SFTP {
    host: string;
    port: number;
    username: string;
}

export async function getCollection({
    instanceId,
    containerId,
    token,
    query,
    settings,
}: {
    instanceId: ResourceId;
    containerId: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<Collection>({
        target: links
            .containers()
            .instances()
            .volumes(instanceId, containerId),
        query,
        token,
        settings,
    });
}
