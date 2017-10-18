import { Mills } from "../../common/Structs";
import { TermLength } from "./Term";

export interface Amount {
    mills: Mills;
    term: TermLength;
}
