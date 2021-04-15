import * as Request from "../../../../common/api/request";
import { links, StandardParams } from "../../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../../common/structs";

export type BuildAction = "deploy" | "delete" | "generate";

export interface DeployContents {
  /** The id of the environment to update with the stack build */
  environment_id: ResourceId;
  /**
   * Optional update object used to specify specific params to update from
   * the stack build.
   */
  update?: DeployContentsUpdate;
}

/**
 * The update interface used for the `update` key inside
 * of the `DeployContents` interface
 */
export interface DeployContentsUpdate {
  /**
   * This is a map of the container names to update within the
   * environment. The map follows the format of:
   * ```
   *  {
   *    container_id: {
   *      reimage: true,
   *      reconfigure: true,
   *    }
   *  }
   * ```
   */
  containers: Record<ResourceId, DeployUpdateContainers>;
}

export interface DeployUpdateContainers {
  /**
   * If set to true the container will be reimaged with the image specified in
   * the stack build
   */
  reimage: boolean;
  /**
   * If set to true the container will use the new `config` settings specified in
   * the stack build
   */
  reconfigure: boolean;
}

export async function deploy(
  params: StandardParams & {
    id: ResourceId;
    stackId: ResourceId;
    contents: DeployContents;
  },
) {
  return task<DeployContents>({
    ...params,
    value: {
      action: "deploy",
      contents: params.contents,
    },
  });
}

export async function generate(
  params: StandardParams & {
    id: ResourceId;
    stackId: ResourceId;
  },
) {
  return task({
    ...params,
    value: { action: "generate" },
  });
}

export async function remove(
  params: StandardParams & {
    id: ResourceId;
    stackId: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links.stacks().builds(params.stackId).single(params.id),
  });
}

export async function task<K = {}>(
  params: StandardParams & {
    id: ResourceId;
    stackId: ResourceId;
    value: Task<BuildAction, K>;
  },
) {
  return Request.postRequest<CreatedTask<BuildAction, K>>({
    ...params,
    target: links.stacks().builds(params.stackId).tasks(params.id),
  });
}
