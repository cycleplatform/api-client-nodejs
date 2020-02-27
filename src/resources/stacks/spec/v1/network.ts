export interface Network {
  public: NetworkPublicMode;
  hostname: string;
  ports?: string[];
}

export type NetworkPublicMode = "enable" | "disable" | "egress-only";
