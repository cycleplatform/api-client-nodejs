import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { ResourceId, CreatedTask } from "../../../common/structs";
import { Spec } from "../../stacks";

export type ImageAction = "import";

export interface BuildParams {
    source: Spec.ImageSource;
}

export async function build({
    value,
    token,
    query,
    settings,
}: {
    value: BuildParams;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.postRequest<CreatedTask<"import">>({
        target: links.images().build(),
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
    id: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.deleteRequest<CreatedTask<"delete">>({
        target: links.images().single(id),
        query,
        token,
        settings,
    });
}
