import { links, StandardParams } from "common/api";
import { Query } from "./sources";
import * as Request from "../../../common/api/request";
import { ResourceId } from "common/structs";

type BSP = StandardParams<Query> & {
  sourceId: ResourceId;
};

type RemoveParams = BSP;
export async function remove(params: RemoveParams) {
  return Request.deleteRequest({
    ...params,
    target: links.images().sources().single(params.sourceId),
  });
}
