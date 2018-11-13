import { ResourceId, CollectionDoc } from "../../common/structs";
import { Token } from "../../auth";
import { QueryParams, Settings, links } from "../../common/api";
import * as Request from "../../common/api/request";
import { Image } from "../images";

export type Collection = CollectionDoc<Image>;

export async function getCompatibleImages({
  id,
  token,
  query,
  settings,
}: {
  id: ResourceId;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links.containers().compatibleImages(id),
  });
}
