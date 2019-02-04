export interface NetworkStats {
  interfaces?: { [key: string]: NetworkInterface };
  external_ipv4: string;
  external_ipv6: string;
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
