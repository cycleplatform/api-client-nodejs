import { IP } from "../../common/Structs";

export interface IPNet {
    ip: IP;
    cidr: string;
}
