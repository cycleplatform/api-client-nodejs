import { ResourceId, CollectionDoc } from "common/structs";
import { StandardParams, links } from "common/api";
import { getRequest } from "common/api/request";
import { Image } from "resources/images";

export type Collection = CollectionDoc<Image>;

export async function getCompatibleImages(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return getRequest<Collection>({
    ...params,
    target: links.containers().compatibleImages(params.id),
  });
}
