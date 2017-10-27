import { IpsPlan } from "./ip";
import { BandwidthPlan } from "./bandwidth";
import { Server } from "./server";
import { SupportPlan } from "./support";

export interface Item {
    server?: Server;
    ips?: IpsPlan;
    bandwidth?: BandwidthPlan;
    support?: SupportPlan;
}
