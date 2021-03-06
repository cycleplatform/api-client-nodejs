import { IP } from "../../../common/structs";

export interface IPNet {
  ip: IP;
  cidr: string;
}

export type Kind = "ipv4" | "ipv6";
