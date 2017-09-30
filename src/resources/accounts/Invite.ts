import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import * as Structs from "../../common/Structs";
import * as Memberships from "../projects/Membership";
import { Task } from "../../common/Structs";

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: Structs.Settings;
}) {
    return API.getRequest<Memberships.Collection>({
        target: links.account().invites().collection(),
        query,
        token,
        settings,
    });
}

export type InviteAction = "accept" | "decline";
export async function task({
    id,
    token,
    value,
    query,
    settings,
}: {
    id: Structs.ResourceId;
    project: Structs.ResourceId;
    token: Token;
    value: Task<InviteAction>;
    query?: QueryParams;
    settings?: Structs.Settings;
}) {
    return API.postRequest<Memberships.Single>({
        target: links.account().invites().tasks(id),
        value,
        query,
        token,
        settings,
    });
}