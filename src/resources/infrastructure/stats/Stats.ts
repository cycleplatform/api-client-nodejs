import { NetworkStats } from "./NetworkStats";
import { UptimeStats } from "./UptimeStats";
import { CPUStats } from "./CPUStats";
import { LoadStats } from "./LoadStats";
import { RAMStats } from "./RAMStats";
import { StorageStats } from "./StorageStats";
import { OSStats } from "./OSStats";

export interface Stats {
    network: NetworkStats;
    uptime: UptimeStats;
    cpu: CPUStats;
    load: LoadStats;
    ram: RAMStats;
    storage: StorageStats;
    os: OSStats;
}
