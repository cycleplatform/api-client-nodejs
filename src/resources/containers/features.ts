import { ResourceId } from "../../common/structs";

export interface Features {
  tls: TLS | null;
}

export interface TLS {
  domain: string;
  certificate_id?: ResourceId;
}
