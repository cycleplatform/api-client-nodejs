import { links, StandardParams } from "common/api";
import { SourcesQuery } from "./sources";
import * as Request from "../../../common/api/request";
import { ResourceId } from "common/structs";

type BaseSingleDocParams = StandardParams<SourcesQuery> & {
  sourceId: ResourceId;
};

type RemoveParams = BaseSingleDocParams;
export async function remove(params: RemoveParams) {
  return Request.deleteRequest({
    ...params,
    target: links.images().sources().single(params.sourceId),
  });
}
