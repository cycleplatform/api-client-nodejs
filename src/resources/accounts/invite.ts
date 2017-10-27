import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
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
    return Request.getRequest<Memberships.Collection>({
        target: links
            .account()
            .invites()
            .collection(),
        query,
        token,
        settings,
    });
}
