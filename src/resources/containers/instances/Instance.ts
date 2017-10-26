import { Server } from "../../infrastructure/servers";
import { DataCenters } from "../../infrastructure/provider";
import {
    CollectionDoc,
    Resource,
    SingleDoc,
    ResourceId,
    ResourceState,
    StandardEvents,
    Time,
    UserScope,
    Includes,
    OwnerIncludes,
} from "../../../common/Structs";
import { IPNet } from "../../network";

export type Collection = CollectionDoc<Instance, {}, CollectionIncludes>;
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

export interface Instance extends Resource<InstanceMeta> {
    owner: UserScope;
    project_id: ResourceId;
    container_id: ResourceId;
    environment: Environment;
    datacenter_id: ResourceId;
    server_id: ResourceId;
    hostname: string;
    state: ResourceState<InstanceState>;
    events: StandardEvents & {
        first_boot?: Time;
        started?: Time;
    };
}

export interface Environment {
    id: ResourceId;
    network_id: number;
    ipv4: IPNet;
    ipv6: IPNet;
}

export interface CollectionIncludes extends Includes {
    owner: OwnerIncludes;
    servers: {
        [key: string]: Server;
    };
    datacenters: {
        [key: string]: DataCenters.DataCenter;
    };
}

// tslint:disable-next-line:no-empty-interface
export interface InstanceMeta {
    //
}
