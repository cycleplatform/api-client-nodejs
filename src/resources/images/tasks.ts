import { links, StandardParams, postRequest, deleteRequest } from "common/api";
import { ResourceId, CreatedTask } from "common/structs";
import { ImageSource } from "./source";

export type ImageAction = "import";

export interface BuildParams {
  source: ImageSource;
}

export async function build(
  params: StandardParams & {
    value: BuildParams;
  },
) {
  return postRequest<CreatedTask<"import">>({
    ...params,
    target: links.images().build(),
  });
}

export async function remove(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links.images().single(params.id),
  });
}
