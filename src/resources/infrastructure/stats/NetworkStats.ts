export interface NetworkStats {
    interfaces?: {[key: string]: NetworkInterface};
    primary_routes?: NetworkRoute[];
    primary_ip: string;
    primary_mac_addr: string; 
}

export interface NetworkInterface {
    interface?: string;
    flags?: string;
    mtu?: number;
    mac_addr?: string;
    addrs?: string[];
}

export interface NetworkRoute {
    gateway?: string;
    interface?: string;
    source?: string;
}