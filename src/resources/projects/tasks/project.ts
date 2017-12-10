import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../common/structs";

export type ProjectAction = "leave";

export async function leave({
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
        token,
        query,
        settings,
        value: {
            action: "leave",
        },
    });
}

export async function task<K = {}>({
    token,
    value,
    query,
    settings,
}: {
    token: Token;
    value: Task<ProjectAction, K>;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.postRequest<CreatedTask<ProjectAction, K>>({
        target: links.projects().tasks(),
        value,
        query,
        token,
        settings,
    });
}
