import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import {
    State,
    Events,
    Resource,
    CollectionDoc,
    ResourceId,
    UserScope,
} from "../../common/structs";

export type Collection = CollectionDoc<Notification>;

export type NotificationLevel = "warn" | "error" | "info" | "success";
export type AssociationType = "invoices";
export type NotificationState = "new" | "viewed" | "deleting" | "deleted";
export type NotificationEvent = "viewed";

export enum NotificationCode {
    INVOICE_GENERATED = "invoice.generated",
    SERVER_PROVISIONING_FAILED = "server.start.failed",
    PROJECT_INVITE = "project.invitation",
}

export interface Notification extends Resource, NotificationOpts {
    association: Association;
    recipient: UserScope;
    creator_id: ResourceId;
    state: State<NotificationState>;
    events: Events<NotificationEvent>;
    code: NotificationCode;
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
