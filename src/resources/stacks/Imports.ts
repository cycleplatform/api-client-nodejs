import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import * as Structs from "../../common/Structs";
import * as Stacks from "./Stacks";

export interface RepoCreateParams {
    url: string;
    private_key?: string;
}

export async function createFromRepo({
    value,
    token,
    query,
    settings,
}: {
    value: RepoCreateParams;
    token: Token;
    query?: QueryParams;
    settings?: Structs.Settings;
}) {
    return API.postRequest<Stacks.Single>({
        target: links.stacks().createFromRepo(),
        value,
        query,
        token,
        settings,
    });
}

export interface RawCreateParams {
    file: string;
}

export async function createFromRaw({
    value,
    token,
    query,
    settings,
}: {
    value: RawCreateParams;
    token: Token;
    query?: QueryParams;
    settings?: Structs.Settings;
}) {
    return API.postRequest<Stacks.Single>({
        target: links.stacks().createFromRaw(),
        value,
        query,
        token,
        settings,
    });
}

export async function importStack({
    id,
    token,
    query,
    settings,
}: {
    id: Structs.ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Structs.Settings;
}) {
    return task({
        id,
        token,
        query,
        settings,
        value: {
            action: "import",
        },
    });
}

export type StackAction = "import";
export async function task({
    id,
    token,
    value,
    query,
    settings,
}: {
    id: Structs.ResourceId;
    token: Token;
    value: Structs.Task<StackAction>;
    query?: QueryParams;
    settings?: Structs.Settings;
}) {
    return API.postRequest<Structs.CreatedTask<StackAction>>({
        target: links.stacks().tasks(id),
        value,
        query,
        token,
        settings,
    });
}
