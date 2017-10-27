import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { ResourceId, CreatedTask } from "../../../common/structs";
import { ImageSource } from "../../stacks/StackImage";

export type ImageAction = "image.import" | "delete";

export interface BuildParams {
    source: ImageSource;
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
    return Request.postRequest<CreatedTask<"image.import">>({
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
