import { ResourceId } from "../../../common/structs";

/**
 * Information about an environment service
 */
export interface Service {
  /** A boolean, where true represents this service is enabled */
  enable: boolean;
  container_id: ResourceId;
  /** A boolean, where true represents this service is deployed in high availability mode */
  high_availability: boolean;
}
