import { Mills } from "common/structs";
import { TermLength } from "./term";

export interface Amount {
  mills: Mills;
  term: TermLength;
}
