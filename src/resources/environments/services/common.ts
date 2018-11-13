import { IPNet } from "../../network";
import { ResourceId } from "../../../common/structs";

export interface Service {
  enable: boolean;
  container_id: ResourceId;
  instance_id: ResourceId;
  ipv4: IPNet | null;
  ipv6: IPNet | null;
}
