import { Webhook } from "common/structs";

export interface Integrations {
  events: Events | null;
  lets_encrypt: LetsEncrypt | null;
  files: File[] | null;
}

export interface LetsEncrypt {
  enable: boolean;
  certificate_path: string | null;
  chain_path: string | null;
  key_path: string | null;
  bundle_path: string | null;
}

export interface Events {
  deploy: Webhook;
  start: Webhook;
  stop: Webhook;
}

export interface File {
  source: string;
  destination: string;
}
