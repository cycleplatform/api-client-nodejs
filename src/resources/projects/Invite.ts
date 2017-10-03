import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import * as Structs from "../../common/Structs";
import * as Memberships from "./Membership";

export interface CreateParams {
    recipient: string; // Email
    role: Memberships.Role;
}

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
        target: links
            .projects()
            .invites()
            .collection(),
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
    project: Structs.ResourceId;
    token: Token;
    value: CreateParams;
    query?: QueryParams;
    settings?: Structs.Settings;
}) {
    return API.postRequest<Memberships.Single>({
        target: links
            .projects()
            .invites()
            .collection(),
        value,
        query,
        token,
        settings,
    });
}
