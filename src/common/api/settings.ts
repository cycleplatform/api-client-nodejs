import { ResourceId } from "../structs";

/** Custom settings object for per-request customization */
export interface Settings {
  /** Override base url on a per request basis */
  url?: string;

  /** Sets the cloud scope. Auto injected into X-Cloud-Id header */
  cloud?: ResourceId;

  /** Force http in URL */
  useHttp?: boolean;

  /** If true, don't inject version into URL */
  noVersion?: boolean;

  /** Allow for fetch cancellation */
  signal?: AbortSignal;
}
