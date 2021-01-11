import { ResourceId } from "../../../common/structs";
import * as CycleTasks from "./cycle";

export { CycleTasks };

export type AllStageTasks = CycleTasks.StageTasks;

export type StageTask = Partial<AllStageTasks> & StageTaskBase;

export type StageTaskSelect<T extends keyof AllStageTasks> = Pick<
  AllStageTasks,
  T
> &
  StageTaskBase;

export type StageTaskBase = {
  comment?: string;
  options?: StageTaskOptions;
};

export type StageTaskOptions = {
  disable?: boolean;
};

export type StageTaskActionBase = {
  id?: ResourceId;
  name?: string;
  from_task?: StageTaskFromTask;
};

/**
 * @param task the name of the task to pull data from
 * @param stage the name of the stage to pull data from
 */
export type StageTaskFromTask = {
  task: string;
  stage: string;
};
