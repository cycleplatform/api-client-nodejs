import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import {
    CollectionDoc,
    Resource,
    Time,
    ResourceId,
} from "../../common/structs";
import { PublicAccount } from "./account";

export type Collection = CollectionDoc<Login, {}, LoginIncludes>;
export type LoginType = "password" | "employee";
export type LoginQuery = QueryParams<keyof LoginIncludes>;

export interface Login extends Resource {
    account: AccountInfo;
    employee?: PublicAccount;
    time: Time;
    type: LoginType;
    success: boolean;
}

export interface AccountInfo {
    id: ResourceId;
    ip: string;
}

export interface LoginIncludes {
    accounts: {
        [key: string]: PublicAccount;
    };
}

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: LoginQuery;
    settings?: Settings;
}) {
    return Request.getRequest<Collection>({
        target: links.account().logins(),
        query,
        token,
        settings,
    });
}
