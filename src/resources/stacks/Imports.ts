import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import * as Structs from "../../common/Structs";
import * as Stacks from "./Stacks";

export interface RepoImportParams {
    url: string;
    private_key?: string;
}

export async function importRepo({
    value,
    token,
    query,
    settings,
}: {
    value: RepoImportParams;
    token: Token;
    query?: QueryParams;
    settings?: Structs.Settings;
}) {
    return API.postRequest<Stacks.Single>({
        target: links.stacks().importRepo(),
        value,
        query,
        token,
        settings,
    });
}

export interface RawImportParams {
    file: string;
}

export async function importRaw({
    value,
    token,
    query,
    settings,
}: {
    value: RawImportParams;
    token: Token;
    query?: QueryParams;
    settings?: Structs.Settings;
}) {
    return API.postRequest<Stacks.Single>({
        target: links.stacks().importRaw(),
        value,
        query,
        token,
        settings,
    });
}
