import { Webhooks } from "../../../common/structs";

export interface Integrations {
  events: Events;
  // monitor: Monitor;
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
