import { ResourceId } from "../../../common/structs";
import * as CycleTasks from "./cycle";

export { CycleTasks };

export type AllTasks = CycleTasks.Tasks;

export type Task = Partial<AllTasks> & TaskBase;

export type TaskSelect<T extends keyof AllTasks> = Pick<AllTasks, T> & TaskBase;

export type TaskBase = {
  comment?: string;
  options?: TaskOptions;
};

export type TaskOptions = {
  disable?: boolean;
};

export type ActionBase = {
  id?: ResourceId;
  name?: string;
  from_task?: FromTask;
};

/**
 * @param task the name of the task to pull data from
 * @param stage the name of the stage to pull data from
 */
export type FromTask = {
  task: string;
  stage: string;
};
