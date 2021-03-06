import { Webhook } from "../../../../common/structs";

export interface Integrations {
  events?: Events;
  lets_encrypt?: LetsEncrypt;
  files?: File[];
}

export interface LetsEncrypt {
  enable: boolean;
  certificate_path?: string;
  chain_path?: string;
  key_path?: string;
  bundle_path?: string;
  additional_certs_path?: string;
}

export interface Events {
  deploy?: Webhook;
  start?: Webhook;
  stop?: Webhook;
}

export interface File {
  source: string;
  destination: string;
}
