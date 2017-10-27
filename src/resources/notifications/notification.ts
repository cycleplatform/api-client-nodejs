import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import {
    Time,
    State,
    StandardEvents,
    Resource,
    CollectionDoc,
    ResourceId,
    UserScope,
} from "../../common/structs";

export type Collection = CollectionDoc<Notification>;

export type NotificationLevel = "warn" | "error" | "info" | "success";
export type AssociationType = "invoices";
export type NotificationState = "new" | "viewed" | "deleting" | "deleted";

export interface Notification extends Resource, NotificationOpts {
    association: Association;
    recipient: UserScope;
    creator_id: ResourceId;
    state: State<NotificationState>;
    events: StandardEvents & {
        viewed: Time;
    };
}

export interface NotificationOpts {
    message: string;
    level: NotificationLevel;
}

export interface Association {
    id: ResourceId;
    type: AssociationType;
}

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<Collection>({
        target: links.notifications().collection(),
        query,
        token,
        settings,
    });
}
