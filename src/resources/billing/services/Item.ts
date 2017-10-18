import { IpsPlan } from "./Ip";
import { BandwidthPlan } from "./Bandwidth";
import { Server } from "./Server";
import { SupportPlan } from "./Support";

export interface Item {
    server?: Server;
    ips?: IpsPlan;
    bandwidth?: BandwidthPlan;
    support?: SupportPlan;
}
