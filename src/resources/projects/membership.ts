import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, ProjectRequiredSettings } from "../../common/api";
import {
    CollectionDoc,
    Resource,
    SingleDoc,
    Events,
    State,
    ResourceId,
} from "../../common/structs";

export enum Role {
    OWNER,
    ADMIN = 1 << 1,
    DEVELOPER = 1 << 2,
    ANALYST = 1 << 3,
    DEFAULT = 0,
}

export type Collection = CollectionDoc<Membership>;
export type Single = SingleDoc<Membership>;
export type MembershipState = "new" | "active" | "deleting" | "deleted";
export type MembershipEvent = "accepted" | "declined" | "revoked" | "joined";

export interface Membership extends Resource {
    account_id: ResourceId;
    project_id: ResourceId;
    role: Role;
    events: Events<MembershipEvent>;
    state: State<MembershipState>;
}

/**
 * Members in this project
 */
export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: ProjectRequiredSettings;
}) {
    return Request.getRequest<Collection>({
        target: links
            .projects()
            .members()
            .collection(),
        query,
        token,
        settings,
    });
}
