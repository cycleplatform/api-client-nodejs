import { Service } from "./common";
import {
    ResourceId,
    Resource,
    UserScope,
    Events,
    CollectionDoc,
    SingleDoc,
    CreatedTask,
    Time,
} from "../../../common/structs";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import * as Request from "../../../common/api/request";

export interface VPNService extends Service {
    config: VPNConfig;
}

export interface VPNConfig {
    allow_cycle_accounts: boolean;
    allow_environment_accounts: boolean;
    auth_api: AuthAPI | null;
}

export interface AuthAPI {
    allow: boolean;
    url: string;
}

export interface VPNInfo {
    url: string;
    service: VPNService;
}

export interface VPNUser extends Resource {
    username: string;
    owner: UserScope;
    last_login: Time;
    project_id: ResourceId;
    environment_id: ResourceId;
    events: Events;
}

export interface VPNLogin extends Resource {
    username: string;
    environment_id: ResourceId;
    ip: string;
    time: Time;
    success: boolean;
}

export interface VPNReconfigureDetails {
    enable?: boolean;
    config?: Partial<VPNConfig>;
}

export type VPNUsersDoc = CollectionDoc<VPNUser>;
export type VPNUserDoc = SingleDoc<VPNUser>;

export type VPNLoginsDoc = CollectionDoc<VPNLogin>;

export async function getVPNInfo({
    environmentId,
    token,
    query,
    settings,
}: {
    environmentId: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<{ data: VPNInfo }>({
        target: links
            .environments()
            .services()
            .vpn()
            .details(environmentId),
        query,
        token,
        settings,
    });
}

export async function getVPNLogins({
    environmentId,
    token,
    query,
    settings,
}: {
    environmentId: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<VPNLoginsDoc>({
        target: links
            .environments()
            .services()
            .vpn()
            .logins(environmentId),
        query,
        token,
        settings,
    });
}

export async function getVPNUsers({
    environmentId,
    token,
    query,
    settings,
}: {
    environmentId: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<VPNUsersDoc>({
        target: links
            .environments()
            .services()
            .vpn()
            .users(environmentId),
        query,
        token,
        settings,
    });
}

export interface CreateVPNUserParams {
    username: string;
    password: string;
}

export async function createVPNUser({
    environmentId,
    value,
    token,
    query,
    settings,
}: {
    environmentId: ResourceId;
    value: CreateVPNUserParams;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.postRequest<VPNUsersDoc>({
        target: links
            .environments()
            .services()
            .vpn()
            .users(environmentId),
        value,
        query,
        token,
        settings,
    });
}

export async function deleteVPNUser({
    environmentId,
    userId,
    token,
    query,
    settings,
}: {
    environmentId: ResourceId;
    userId: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.deleteRequest<CreatedTask<"delete">>({
        target: links
            .environments()
            .services()
            .vpn()
            .user(environmentId, userId),
        query,
        token,
        settings,
    });
}

export type Action = "reconfigure";

export async function reconfigure({
    environmentId,
    token,
    value,
    query,
    settings,
}: {
    environmentId: ResourceId;
    token: Token;
    value: VPNReconfigureDetails;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.postRequest<CreatedTask<Action>>({
        target: links
            .environments()
            .services()
            .vpn()
            .tasks(environmentId),
        value: {
            action: "reconfigure",
            contents: value,
        },
        query,
        token,
        settings,
    });
}
