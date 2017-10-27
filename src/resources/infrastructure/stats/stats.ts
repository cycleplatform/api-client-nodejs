import { NetworkStats } from "./network";
import { UptimeStats } from "./uptime";
import { CPUStats } from "./cpu";
import { LoadStats } from "./load";
import { RAMStats } from "./ram";
import { StorageStats } from "./storage";
import { OSStats } from "./os";

export interface Stats {
    network: NetworkStats;
    uptime: UptimeStats;
    cpu: CPUStats;
    load: LoadStats;
    ram: RAMStats;
    storage: StorageStats;
    os: OSStats;
}
