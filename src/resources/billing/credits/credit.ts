import {
    ResourceId,
    UserScope,
    Events,
    State,
    CollectionDoc,
} from "../../../common/structs";
import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import {
    QueryParams,
    links,
    ProjectRequiredSettings,
} from "../../../common/api";

export type Collection = CollectionDoc<Credit>;
export type CreditState = "new" | "live" | "expired";
export type CreditEvent = "expires";

export interface Credit {
    id: ResourceId;
    project_id: ResourceId;
    description: string;
    owner: UserScope;
    amount: number;
    amount_remaining: number;
    events: Events<CreditEvent>;
    state: State<CreditState>;
}

export interface AssociatedCredit {
    id: ResourceId;
    amount: number;
}

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings: ProjectRequiredSettings;
}) {
    return Request.getRequest<Collection>({
        target: links.billing().credits(),
        query,
        token,
        settings,
    });
}
