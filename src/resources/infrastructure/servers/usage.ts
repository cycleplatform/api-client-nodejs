import { Time, Gigabytes } from "../../../common/structs";
import { Token } from "../../../auth/token";
import { QueryParams, Settings, getRequest, links } from "../../../common/api";

export type Collection = {
  data: UsageDatum[];
};

export interface UsageDatum {
  time: Time;
  nodes: number;
  memory_gb: Gigabytes;
}

export async function getServerUsage({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return getRequest<Collection>({
    query,
    token,
    settings,
    target: links
      .infrastructure()
      .servers()
      .usage(),
  });
}
