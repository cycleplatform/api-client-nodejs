import { Time } from "../../common/structs";

export interface Term {
  start: Time;
  end: Time;
  renew?: TermLength;
}

export type TermLength = "once" | "monthly" | "yearly";
