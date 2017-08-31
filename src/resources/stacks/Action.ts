import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import * as Structs from "../../common/Structs";
import * as Stacks from "./Stack";

export interface StackCreateParams {
    name: string;
    source: Stacks.Source;
}

export async function create({
    value,
    token,
    query,
    settings,
}: {
    value: StackCreateParams;
    token: Token;
    query?: QueryParams;
    settings?: Structs.Settings;
}) {
    return API.postRequest<Stacks.Single>({
        target: links.stacks().collection(),
        value,
        query,
        token,
        settings,
    });
}

export async function buildStack({
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
            action: "build",
        },
    });
}

export type StackAction = "build";
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

export async function update({
    id,
    token,
    value,
    query,
    settings,
}: {
    id: Structs.ResourceId;
    token: Token;
    value: StackCreateParams;
    query?: QueryParams;
    settings?: Structs.Settings;
}) {
    return API.patchRequest<Stacks.Single>({
        target: links.stacks().single(id),
        value,
        query,
        token,
        settings,
    });
}

export async function remove({
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
    return API.deleteRequest<Stacks.Single>({
        target: links.stacks().single(id),
        query,
        token,
        settings,
    });
}
