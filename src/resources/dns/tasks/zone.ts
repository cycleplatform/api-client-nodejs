import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../common/structs";

export type ZoneAction = "verify" | "change_origin";

export async function changeOrigin({
    id,
    token,
    query,
    origin,
    settings,
}: {
    id: ResourceId;
    token: Token;
    origin: string;
    query?: QueryParams;
    settings?: Settings;
}) {
    return task({
        id,
        token,
        query,
        settings,
        value: {
            action: "change_origin",
            contents: {
                origin,
            },
        },
    });
}

export async function verify({
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
            action: "verify",
        },
    });
}

export async function task({
    id,
    token,
    value,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    value: Task<ZoneAction>;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.postRequest<CreatedTask<ZoneAction>>({
        target: links
            .dns()
            .zones()
            .tasks(id),
        value,
        query,
        token,
        settings,
    });
}
