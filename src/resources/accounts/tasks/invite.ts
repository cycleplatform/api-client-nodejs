import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../common/structs";

export type InviteAction = "accept" | "decline";

export async function task({
    id,
    token,
    value,
    query,
    settings,
}: {
    id: ResourceId;
    project: ResourceId;
    token: Token;
    value: Task<InviteAction>;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.postRequest<CreatedTask<InviteAction>>({
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
