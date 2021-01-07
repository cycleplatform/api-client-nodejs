import { ResourceId } from "common/structs";
import * as Cycle from "./cycle";

export type AllTasks = Cycle.Tasks;

export { Cycle };

export type Task = Partial<AllTasks> & {
  comment?: string;
  options?: TaskOptions;
};

export type TaskOptions = {
  disable?: boolean;
};

export type BaseTask = {
  id?: ResourceId;
  name?: string;
  from_task?: string;
};
