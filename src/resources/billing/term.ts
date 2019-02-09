import { Time } from "../../common/structs";

export interface Term {
  start: Time;
  end: Time;
  renew?: TermLength;
}

export interface Expiration {
  interval: "days" | "weeks" | "months" | "years";
  number: number;
}

export type TermLength = "once" | "monthly" | "yearly";
