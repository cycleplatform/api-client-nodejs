import { ResourceId } from "../structs";

/** Custom settings object for per-request customization */
export interface Settings {
  /** Override base url on a per request basis */
  url?: string;

  /** Sets the project scope. Auto injected into X-Project-Id header */
  project?: ResourceId;

  /** Allow force http in URL */
  useHttp?: boolean;

  /** If true, don't inject version into URL */
  noVersion?: boolean;

  /** Allow for fetch cancellation */
  signal?: AbortSignal;
}

/** Custom settings object that requires a project ID */
export interface ProjectRequiredSettings extends Settings {
  project: ResourceId;
}
