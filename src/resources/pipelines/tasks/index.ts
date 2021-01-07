import { ResourceId } from "common/structs";
import * as Cycle from "./cycle";

export type AllActions = Cycle.Actions;

export { Cycle };

export type Task = Partial<AllActions> & TaskBase;

export type TaskSelect<T extends keyof AllActions> = Pick<AllActions, T> &
  TaskBase;

export type TaskBase = {
  comment?: string;
  options?: TaskOptions;
};

export type TaskOptions = {
  disable?: boolean;
};

export type BaseAction = {
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
