import * as Request from "../../../common/api";
import { links } from "../../../common/api";
import { Single, BSP } from "./trigger-key";

/****************************** Params ******************************/
export type RemoveParams = BSP;

/****************************** Functions ******************************/
export async function remove(params: RemoveParams) {
  return Request.deleteRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).single(params.keyId),
  });
}
