import { IP } from "../../common/structs";

export interface IPNet {
    ip: IP;
    cidr: string;
}
