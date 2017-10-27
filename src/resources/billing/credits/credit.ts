import {
    Time,
    ResourceId,
    UserScope,
    StandardEvents,
    ResourceState,
} from "../../../common/structs";

export type CreditState = "new" | "live" | "expired";

export interface Credit {
    id: ResourceId;
    project_id: ResourceId;
    owner: UserScope;
    amount: number;
    events: StandardEvents & {
        expires: Time;
    };
    state: ResourceState<CreditState>;
}
