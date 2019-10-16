import { ResourceId } from "../../../common/structs";

export interface Service {
  enable: boolean;
  container_id: ResourceId;
  high_availability: boolean;
}
