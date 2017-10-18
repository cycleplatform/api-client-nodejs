import { Time } from "../../common/Structs";

export interface Term {
    start: Time;
    end: Time;
    renew?: TermLength;
}

export type TermLength = "once" | "monthly" | "yearly";
