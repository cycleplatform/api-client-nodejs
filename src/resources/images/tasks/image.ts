import * as Request from "../../../common/api/request";
import { links, StandardParams } from "../../../common/api";
import { ResourceId, CreatedTask } from "../../../common/structs";
import { Spec } from "../../stacks";

export type ImageAction = "import";

export interface BuildParams {
  source: Spec.ImageSource;
}

export async function build(
  params: StandardParams & {
    value: BuildParams;
  },
) {
  return Request.postRequest<CreatedTask<"import">>({
    ...params,
    target: links.images().build(),
  });
}

export async function remove(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links.images().single(params.id),
  });
}
