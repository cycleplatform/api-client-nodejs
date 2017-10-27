export interface Network {
    public: boolean;
    hostname?: string;
    ports?: string[];
    dns: DNS;
    tls: TLS;
}

export interface DNS {
    domain?: string;
    nameservers?: string[];
}

export interface TLS {
    enable: boolean;
    certificate_path?: string;
}
