import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import { CollectionDoc } from "../../common/structs";
import * as Memberships from "../projects/membership";

export * from "./tasks/invite";

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<CollectionDoc<Memberships.Membership>>({
        target: links
            .account()
            .invites()
            .collection(),
        query,
        token,
        settings,
    });
}
