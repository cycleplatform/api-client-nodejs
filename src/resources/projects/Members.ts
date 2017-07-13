import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import {
    CollectionDoc,
    Resource,
    Settings,
    SingleDoc,
    StandardEvents,
    CommonStates,
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
    account: ResourceId;
    project: ResourceId;
    invited_by?: ResourceId;
    role: Role;
    events: MembershipEvents;
    state: ResourceState<MembershipState>;
}

export type MembershipState = CommonStates | "deleting";

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

/**
 * Projects you are a member of 
 */
export async function getMemberships({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.getRequest<Collection>({
        target: links.projects().members().memberships(),
        query,
        token,
        settings,
    });
}
