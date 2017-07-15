import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import * as Structs from "../../common/Structs";
import * as Members from "./Members";
import { Action } from "../../common/Structs";

export interface CreateParams {
    recipient: string; // Email
    role: Members.Role;
}

export async function getCollection({
    project,
    token,
    query,
    settings,
}: {
    project: Structs.ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Structs.Settings;
}) {
    return API.getRequest<Members.Collection>({
        target: links.projects().invites(project).collection(),
        query,
        token,
        settings,
    });
}

export async function create({
    project,
    token,
    value,
    query,
    settings,
}: {
    project: Structs.ResourceId;
    token: Token;
    value: CreateParams;
    query?: QueryParams;
    settings?: Structs.Settings;
}) {
    return API.postRequest<Members.Single>({
        target: links.projects().invites(project).collection(),
        value,
        query,
        token,
        settings,
    });
}

export type InviteAction = "accept" | "decline";
export async function task({
    id,
    project,
    token,
    value,
    query,
    settings,
}: {
    id: Structs.ResourceId;
    project: Structs.ResourceId;
    token: Token;
    value: Action<InviteAction>;
    query?: QueryParams;
    settings?: Structs.Settings;
}) {
    return API.postRequest<Members.Single>({
        target: links.projects().invites(project).tasks(id),
        value,
        query,
        token,
        settings,
    });
}
