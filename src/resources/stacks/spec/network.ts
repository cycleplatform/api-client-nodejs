export interface Network {
  public: NetworkPublicMode;
  hostname: string;
  ports: string[];
  // dns: DNS;
  // tls: TLS;
}

export type NetworkPublicMode = "enable" | "disable" | "egress-only";

// export interface DNS {
//     nameservers?: string[];
// }

// export interface TLS {
//     enable: boolean;
//     certificate_path?: string;
// }
