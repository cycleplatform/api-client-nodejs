import * as Request from "../../common/api/request";
import { links, QueryParams, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  CreatedTask,
  UserIncludes,
  UserScope,
  Events as BaseEvents,
  Resource,
  ResourceId,
  SingleDoc,
  Time,
  State,
} from "../../common/structs";
import { Step } from "./steps";

export type Collection = CollectionDoc<Pipeline, PipelineIncludes>;
export type Single = SingleDoc<Pipeline, PipelineIncludes>;
export type PipelineQuery = QueryParams<keyof PipelineIncludes>;

export type Events = BaseEvents & {
  last_run: Time;
};

export type PipelineState = "new" | "deleting" | "deleted";

export type Pipeline = Resource & {
  name: string;
  creator: UserScope;
  hub_id: ResourceId;
  disable: boolean;
  stages: Stage[];
  events: Events;
  state: State<PipelineState>;
};

export type Stage = {
  identifier?: string;
  name: string;
  disabled: boolean;
  steps: Step[];
};

export type PipelineIncludes = {
  name: string;
  creators: UserIncludes;
};

type BaseCollectionParams = StandardParams;
type BaseSingleDocParams = StandardParams<PipelineQuery> & {
  id: ResourceId;
};

export type GetCollectionParams = BaseCollectionParams;
export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.pipelines().collection(),
  });
}

export type GetSingleParams = BaseSingleDocParams;
export async function getSingle(params: GetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.pipelines().single(params.id),
  });
}

export type CreateValues = {
  name: string;
};
export type CreateParams = BaseCollectionParams &
  Request.PostParams<CreateValues>;
export async function create(params: CreateParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.pipelines().collection(),
  });
}

export type UpdateValues = {
  name: string;
  stages: Stage[];
  disable: boolean;
};
export type UpdateParams = BaseSingleDocParams & {
  value: Partial<UpdateValues>;
};
export async function update(params: UpdateParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.pipelines().single(params.id),
  });
}

export type RemoveParams = BaseSingleDocParams;
export async function remove(params: RemoveParams) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links.pipelines().single(params.id),
  });
}

/**
 * trigger params for triggerWithSecret function
 */
export type TriggerWithSecretParams = {
  id: ResourceId;
  secret: string;
};

/** ### `triggerWithSecret()` 🚀
 *
 * Used to trigger a pipeline with a secret created
 *  from generating a trigger key. This function does not require
 *  authentication
 *
 * ---
 *
 * ##  Important Notes
 * - 🚀 Use the cycle job tracker helper function with this function to help
 * you track jobs easier. Basic usage shown in example below
 *
 * ---
 *
 * ## Params:
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
 * ## Usage:
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
 * ## Cycle Info
 *
 * __Something doesn't look right or work as intended?__ \
 * Help us make a better Node API Interface by submitting a PR on
 * [Cycles Github](https://github.com/cycleplatform/api-client-nodejs/pulls)
 *
 * ### Websites
 * - [__General Docs__](https://docs.cycle.io)
 * - [__Public API Docs__](https://docs.cycle.io/api/introduction)
 * - [__Internal API Docs__](https://docs.cycle.io/internal-api/introduction)
 * - [__Cycle's Website__](https://cycle.io)
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
