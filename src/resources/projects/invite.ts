import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import { ResourceId, CollectionDoc, SingleDoc } from "../../common/structs";
import * as Memberships from "./membership";

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
    query?: Memberships.MembershipQuery;
    settings?: Settings;
}) {
    return Request.getRequest<CollectionDoc<Memberships.Membership>>({
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
    project: ResourceId;
    token: Token;
    value: CreateParams;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.postRequest<SingleDoc<Memberships.Membership>>({
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
