import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import {
    CollectionDoc,
    Resource,
    Time,
    ResourceId,
} from "../../common/structs";

export type Collection = CollectionDoc<Login>;
export type LoginType = "password" | "employee";

export interface Login extends Resource {
    account: AccountInfo;
    time: Time;
    type: LoginType;
    success: boolean;
}

export interface AccountInfo {
    id: ResourceId;
    ip: string;
}

export interface PublicLogin extends Resource {
    account: AccountInfo;
    employee: PublicEmployeeInfo;
    time: Time;
    type: LoginType;
    success: boolean;
}

export interface PublicEmployeeInfo {
    id: ResourceId;
}

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<Collection>({
        target: links.account().logins(),
        query,
        token,
        settings,
    });
}
