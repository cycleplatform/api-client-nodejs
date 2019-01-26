import { Webhooks } from "../../../common/structs";

export interface Integrations {
  events: Events | null;
  lets_encrypt: LetsEncrypt | null;
  // monitor: Monitor;
}

export interface LetsEncrypt {
  enable: boolean;
  certificate_path: string | null;
  chain_path: string | null;
  key_path: string | null;
  bundle_path: string | null;
}

export interface Events {
  deploy: Webhooks;
  start: Webhooks;
  stop: Webhooks;
}

// export interface Monitor {
//   auto_restart: boolean;
//   max_restarts?: number;
//   restart_delay_secs?: number; // seconds
//   notify: Notify;
// }

// export interface Notify {
//   email: string;
//   web_hook: string;
// }
