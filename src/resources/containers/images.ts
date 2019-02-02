import { ResourceId, CollectionDoc } from "../../common/structs";
import { StandardParams, links } from "../../common/api";
import * as Request from "../../common/api/request";
import { Image } from "../images";

export type Collection = CollectionDoc<Image>;

export async function getCompatibleImages(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.containers().compatibleImages(params.id),
  });
}
