import * as Request from "../../common/api/request";
import { links } from "../../common/api";
import { ResourceId, CreatedTask } from "../../common/structs";
import { PipelineQuery, BSP } from "./pipeline";

/****************************** Actions ******************************/

export type TaskActions = "trigger" | "delete";

/****************************** Params ******************************/

export type TaskParams<T = {}> = BSP & Request.TaskParams<TaskActions, T>;

export type TriggerParams = BSP;
export type RemoveParams = BSP;
export type TriggerWithSecretParams = Request.BaseParams<PipelineQuery> & {
  id: ResourceId;
  secret: string;
};

/****************************** Functions ******************************/

export async function trigger(params: TriggerParams) {
  return task({
    ...params,
    value: {
      action: "trigger",
    },
  });
}

/** ### `triggerWithSecret()` 🚀
 *
 * Used to trigger a pipeline with a secret created
 *  from generating a trigger key. This function does not require
 *  authentication
 *
 * ---
 *
 * ## Important Notes:
 * - 🚀 Use the cycle job tracker helper function with this function to help
 * you track jobs easier. Basic usage shown in example below
 *
 * ---
 *
 * ### Params
 * @param params is an object for which to put necessary parameters
 *  for triggering a pipeline go
 *
 * @param id id of the pipeline to trigger. This can be found on
 *  the settings page of pipelines
 *
 * @param params.secret the secret from a trigger key. If you have not
 *  yet created a trigger, this can be done easily though the
 *  [Cycle portal](https://portal.cycle.io) or via our api using the
 *  create trigger key function (`Pipelines.TriggerKeys.create()`)
 *
 * ---
 *
 * ### Usage
 * @example
 *  ```ts
 *  const params: Pipelines.TriggerWithSecretParams = {
 *    ...YOUR_BASE_PARAMS,
 *    secret: YOUR_TRIGGER_KEY_SECRET
 *  }
 *
 *  async function() {
 *    const job = await Pipelines.triggerWithSecret(params);
 *
 *    try {
 *     // use our future helper lib job tracker here
 *      await jobTracker(job);
 *    } catch(e) {
 *      // do something if job errors
 *      console.error(e);
 *    }
 *  }
 *  ```
 * For more information on what a tasks returns refer to
 *  [tasks descriptor in Cycle Docs](https://docs.cycle.io/api/jobs/task-descriptor/) for more
 *  information on tasks and how to handle them
 * ---
 *
 * ### Cycle Info
 * __Something doesn't look right or work as intended?__ \
 * Help us make a better TypeScript Platform Interface by submitting an issue on
 * [Cycles Github](https://github.com/cycleplatform/api-client-nodejs) or
 * forking our repo and submitting a
 * [Pull Request](https://github.com/cycleplatform/api-client-nodejs/pulls).
 *
 * [General Docs](https://docs.cycle.io) /
 * [Public API Docs](https://docs.cycle.io/api/introduction) /
 * [Internal API Docs](https://docs.cycle.io/internal-api/introduction) /
 * [Cycle's Website](https://cycle.io)
 *
 * ---
 *
 * Last Updated: 2021.01.11 — Grady S
 */
export async function triggerWithSecret(params: TriggerWithSecretParams) {
  return Request.postRequest<CreatedTask<any>>({
    ...params,
    target: links.pipelines().trigger(params.id),
  });
}

export async function remove(params: RemoveParams) {
  return Request.deleteRequest({
    ...params,
    target: links.pipelines().single(params.id),
  });
}

export async function task<T = {}>(params: TaskParams<T>) {
  return Request.postRequest<CreatedTask<TaskActions, T>>({
    ...params,
    target: links.pipelines().tasks(params.id),
  });
}
