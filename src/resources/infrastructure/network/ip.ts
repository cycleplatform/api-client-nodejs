import {
  Resource,
  ResourceId,
  IP as IPString,
  State,
} from "../../../common/structs";
import { Kind } from "../../network";

export type IPState = "assigning" | "assigned" | "releasing" | "available";

export interface IP extends Resource {
  hub_id: ResourceId;
  kind: Kind;
  assignment: Assignment;
  pool_id: ResourceId;
  address: IPString;
  gateway: IPString;
  cidr: string;
  state: State<IPState>;
}

export interface Assignment {
  container_id: ResourceId;
  instance_id: ResourceId;
  environment_id: ResourceId;
}
