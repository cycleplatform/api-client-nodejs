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
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: Structs.ProjectRequiredSettings;
}) {
    return API.getRequest<Members.Collection>({
        target: links.projects().invites().collection(),
        query,
        token,
        settings,
    });
}

export async function create({
    token,
    value,
    query,
    settings,
}: {
    token: Token;
    value: CreateParams;
    query?: QueryParams;
    settings?: Structs.ProjectRequiredSettings;
}) {
    return API.postRequest<Members.Single>({
        target: links.projects().invites().collection(),
        value,
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
    token: Token;
    value: Action<InviteAction>;
    query?: QueryParams;
    settings?: Structs.ProjectRequiredSettings;
}) {
    return API.postRequest<Members.Single>({
        target: links.projects().invites().tasks(id),
        value,
        query,
        token,
        settings,
    });
}
