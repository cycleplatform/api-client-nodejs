import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import { ResourceId, Task, CreatedTask } from "../../common/structs";

export type StackAction = "trigger";

type BaseTaskParams = StandardParams & {
  id: ResourceId;
};

export type TriggerPipelineParams = BaseTaskParams;
export async function triggerPipeline(params: TriggerPipelineParams) {
  return task({
    ...params,
    value: {
      action: "trigger",
    },
  });
}

export type TaskParams<T = {}> = BaseTaskParams & {
  value: Task<StackAction, T>;
};

export async function task<T = {}>(params: TaskParams<T>) {
  return Request.postRequest<CreatedTask<StackAction, T>>({
    ...params,
    target: links.pipelines().tasks(params.id),
  });
}
