import { Webhook } from "../../../../common/structs";

export interface Integrations {
  webhooks?: Webhooks;
  lets_encrypt?: LetsEncrypt;
  files?: File[];
  backups?: Backups;
}

export interface LetsEncrypt {
  enable: boolean;
  certificate_path?: string;
  chain_path?: string;
  key_path?: string;
  bundle_path?: string;
  additional_certs_path?: string;
}

export interface Webhooks {
  events?: Events;
  config?: Webhook;
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

export interface Backups {
  destination: BackupDestination;
  backup: Backup;
  restore: Restore | null;
}

export type BackupDestination = "backblaze-b2";

export interface Backup {
  command: string;
  timeout: number | null;
  cron_string: string | null;
}

export interface Restore {
  command: string;
  timeout: number | null;
}
