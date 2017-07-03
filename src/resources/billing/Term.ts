import { Time } from "../../common/Structs";

export interface Term {
    start: Time;
    end: Time;
    length: TermLength;
}

export type TermLength = "monthly" | "yearly" | "bi_yearly";
