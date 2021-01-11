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
import { StageTask } from "./stage-tasks";

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
  name: string;
  disabled: boolean;
  tasks: Record<string, StageTask>;
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
export type TriggerWithSecretParams = BaseSingleDocParams & {
  secret: string;
};
/**
 * @description used to trigger a pipeline with a secret created
 *  from generating a trigger key. This function does not require
 *  authentication
 *
 * ---
 *
 * @param params is an object of base params for a single pipeline
 *  as well as a secret. The secret is your trigger key secret.
 *
 * ---
 *
 * @example
 * ```ts
 * async function() {
 *   const job = await Pipelines.triggerWithSecret({
 *     ...base_api_param,
 *     secret: 'YOUR_TRIGGER_KEY_SECRET',
 *   });
 *
 *   try {
 *    // use our future helper lib job tracker here
 *     await jobTrack(job);
 *   } catch(e) {
 *     // do something if job errors
 *     console.error(e);
 *   }
 * }
 *
 * ```
 *
 * For more information on what a tasks returns refer to
 *  [tasks descriptor in Cycle Docs](https://docs.cycle.io/api/jobs/task-descriptor/) for more
 *  information on tasks and how to handle them
 *
 * Last Updated: 2021.01.11 — Grady
 */
export async function triggerWithSecret(params: TriggerWithSecretParams) {
  return Request.postRequest<CreatedTask<any>>({
    ...params,
    target: links.pipelines().trigger(params.id),
  });
}
