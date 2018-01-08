import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../common/structs";
import { Config } from "../../stacks/spec";

export type ContainerAction = "start" | "stop" | "reconfigure";

export async function start({
    id,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return task({
        id,
        token,
        query,
        settings,
        value: {
            action: "start",
        },
    });
}

export async function stop({
    id,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return task({
        id,
        token,
        query,
        settings,
        value: {
            action: "stop",
        },
    });
}

export async function reconfigure({
    id,
    token,
    value,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    value: Config;
    query?: QueryParams;
    settings?: Settings;
}) {
    return task({
        id,
        token,
        query,
        settings,
        value: {
            action: "stop",
            contents: value,
        },
    });
}

export async function remove({
    id,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.deleteRequest<CreatedTask<"delete">>({
        target: links.containers().single(id),
        query,
        token,
        settings,
    });
}

export async function task<K = {}>({
    id,
    token,
    value,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    value: Task<ContainerAction, K>;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.postRequest<CreatedTask<ContainerAction, K>>({
        target: links.containers().tasks(id),
        value,
        query,
        token,
        settings,
    });
}
