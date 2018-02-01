import { Time, ResourceId } from "../../common/structs";

export interface Features {
    tls?: TLS;
    dns_record_id?: ResourceId;
}

export interface TLS {
    enabled: boolean;
    path: string;
    domain: string;
    created: Time;
    certificate_id?: ResourceId;
}
