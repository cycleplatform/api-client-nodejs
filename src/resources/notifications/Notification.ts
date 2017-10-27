import * as API from "../../common/Api";
import { Token } from "../../auth";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import {
    Time,
    State,
    StandardEvents,
    Resource,
    CollectionDoc,
    Settings,
    ResourceId,
    UserScope,
} from "../../common/Structs";

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
    return API.getRequest<Collection>({
        target: links.notifications().collection(),
        query,
        token,
        settings,
    });
}
