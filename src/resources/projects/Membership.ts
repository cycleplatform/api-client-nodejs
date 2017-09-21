import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import {
    CollectionDoc,
    Resource,
    SingleDoc,
    StandardEvents,
    ResourceState,
    ResourceId,
    ProjectRequiredSettings,
    Time,
} from "../../common/Structs";

export enum Role {
    OWNER,
    ADMIN = 1 << 1,
    DEVELOPER = 1 << 2,
    ANALYST = 1 << 3,
    DEFAULT = 0,
}

export type Collection = CollectionDoc<Membership>;
export type Single = SingleDoc<Membership>;

export interface Membership extends Resource {
    account_id: ResourceId;
    project_id: ResourceId;
    role: Role;
    events: MembershipEvents;
    state: ResourceState<MembershipState>;
}

export type MembershipState = "new" | "live" | "deleting" | "deleted";

export interface MembershipEvents extends StandardEvents {
    accepted?: Time;
    declined?: Time;
    revoked?: Time;
    joined?: Time;
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
    return API.getRequest<Collection>({
        target: links.projects().members().collection(),
        query,
        token,
        settings,
    });
}
