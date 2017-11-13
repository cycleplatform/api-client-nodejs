import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../common/structs";

export type ZoneAction = "verify";

export async function verify({
    id,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    value: Task<ZoneAction>;
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
            .account()
            .invites()
            .tasks(id),
        value,
        query,
        token,
        settings,
    });
}
