import { Time } from "../../common/Structs";

export interface BillingProfile {
    term: Term;
    disable?: boolean;
}

export interface Term {
    start: Time;
    end: Time;
}
