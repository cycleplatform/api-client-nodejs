import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, ProjectRequiredSettings } from "../../common/api";
import { ResourceId, CollectionDoc } from "../../common/structs";
import { Events } from "../containers";

export async function getCollection({
    environmentId,
    token,
    query,
    settings,
}: {
    environmentId: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: ProjectRequiredSettings;
}) {
    return Request.getRequest<CollectionDoc<Events.Event>>({
        target: links.environments().events(environmentId),
        query,
        token,
        settings,
    });
}
