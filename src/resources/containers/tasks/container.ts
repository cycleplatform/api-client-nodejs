import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../common/structs";
import { Config } from "../../stacks/spec";
import { ContainerVolume } from "../volumes";

export type ContainerAction =
    | "start"
    | "stop"
    | "reconfigure"
    | "reimage"
    | "reconfigure_volumes"
    | "reconfigure_domain";

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
            action: "reconfigure",
            contents: value,
        },
    });
}

export async function reconfigureVolumes({
    id,
    token,
    value,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    value: ContainerVolume[];
    query?: QueryParams;
    settings?: Settings;
}) {
    return task({
        id,
        token,
        query,
        settings,
        value: {
            action: "reconfigure_volumes",
            contents: value,
        },
    });
}

export interface ReimageParams {
    image_id: string;
}

export async function reimage({
    id,
    token,
    value,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    value: ReimageParams;
    query?: QueryParams;
    settings?: Settings;
}) {
    return task({
        id,
        token,
        query,
        settings,
        value: {
            action: "reimage",
            contents: value,
        },
    });
}

export interface ReconfigureDomainParams {
    hosted_domain_id: string;
}

export async function reconfigureDomain({
    id,
    token,
    value,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    value: ReconfigureDomainParams;
    query?: QueryParams;
    settings?: Settings;
}) {
    return task({
        id,
        token,
        query,
        settings,
        value: {
            action: "reconfigure_domain",
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
