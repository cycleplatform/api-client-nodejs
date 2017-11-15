import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { Server } from "../../infrastructure/servers";
import { DataCenters } from "../../infrastructure/provider";
import {
    CollectionDoc,
    Resource,
    SingleDoc,
    ResourceId,
    State,
    Events,
    UserScope,
    Includes,
    OwnerInclude,
} from "../../../common/structs";
import { IPNet } from "../../network";

export type Collection = CollectionDoc<Instance, {}, InstanceIncludes>;
export type Single = SingleDoc<Instance>;
export type InstanceState =
    | "new"
    | "starting"
    | "reimaging"
    | "running"
    | "stopping"
    | "stopped"
    | "deleting"
    | "deleted";
export type InstanceEvent = "first_boot" | "started";
export type InstanceQuery = QueryParams<
    keyof InstanceIncludes,
    keyof InstanceMetas
>;

export interface Instance extends Resource<InstanceMetas> {
    owner: UserScope;
    project_id: ResourceId;
    container_id: ResourceId;
    environment: Environment;
    datacenter_id: ResourceId;
    server_id: ResourceId;
    hostname: string;
    state: State<InstanceState>;
    events: Events<InstanceEvent>;
}

export interface Environment {
    id: ResourceId;
    network_id: number;
    ipv4: IPNet;
    ipv6: IPNet;
}

export interface InstanceIncludes extends Includes {
    owner: OwnerInclude;
    servers: {
        [key: string]: Server;
    };
    datacenters: {
        [key: string]: DataCenters.DataCenter;
    };
}

// tslint:disable-next-line:no-empty-interface
export interface InstanceMetas {
    //
}

export async function getCollection({
    containerId,
    token,
    query,
    settings,
}: {
    containerId: ResourceId;
    token: Token;
    query?: InstanceQuery;
    settings?: Settings;
}) {
    return Request.getRequest<Collection>({
        target: links
            .containers()
            .instances()
            .collection(containerId),
        query,
        token,
        settings,
    });
}

export async function getSingle({
    id,
    containerId,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    containerId: ResourceId;
    token: Token;
    query?: InstanceQuery;
    settings?: Settings;
}) {
    return Request.getRequest<Single>({
        target: links
            .containers()
            .instances()
            .single(id, containerId),
        query,
        token,
        settings,
    });
}
