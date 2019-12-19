import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import { ResourceId, Task, CreatedTask } from "../../common/structs";
import { Config } from "./config";
import { VolumeSummary } from "./container";

export type ContainerAction =
  | "start"
  | "stop"
  | "reconfigure"
  | "reimage"
  | "scale"
  | "reconfigure_volumes"
  | "reconfigure_domain";

export async function start(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return task({
    ...params,
    value: {
      action: "start",
    },
  });
}

export async function stop(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return task({
    ...params,
    value: {
      action: "stop",
    },
  });
}

export async function reconfigure(
  params: StandardParams & {
    id: ResourceId;
    value: Config;
  },
) {
  return task({
    ...params,
    value: {
      action: "reconfigure",
      contents: params.value,
    },
  });
}

export async function reconfigureVolumes(
  params: StandardParams & {
    id: ResourceId;
    value: VolumeSummary[];
  },
) {
  return task({
    ...params,
    value: {
      action: "reconfigure_volumes",
      contents: params.value,
    },
  });
}

export interface ReimageParams {
  image_id: string;
  allow_incompatible?: boolean;
  overwrite_config?: boolean;
}

export async function reimage(
  params: StandardParams & {
    id: ResourceId;
    value: ReimageParams;
  },
) {
  return task({
    ...params,
    value: {
      action: "reimage",
      contents: params.value,
    },
  });
}

export interface ScaleParams {
  instances: number;
}

export async function scale(
  params: StandardParams & {
    id: ResourceId;
    value: ScaleParams;
  },
) {
  return task({
    ...params,
    value: {
      action: "scale",
      contents: params.value,
    },
  });
}

export async function remove(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links.containers().single(params.id),
  });
}

export async function task<K = {}>(
  params: StandardParams & {
    id: ResourceId;
    value: Task<ContainerAction, K>;
  },
) {
  return Request.postRequest<CreatedTask<ContainerAction, K>>({
    ...params,
    target: links.containers().tasks(params.id),
  });
}
