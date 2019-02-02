import { Time, Gigabytes } from "../../../common/structs";
import { StandardParams, getRequest, links } from "../../../common/api";

export type Collection = {
  data: UsageDatum[];
};

export interface UsageDatum {
  time: Time;
  nodes: number;
  memory_gb: Gigabytes;
}

export async function getServerUsage(params: StandardParams) {
  return getRequest<Collection>({
    ...params,
    target: links
      .infrastructure()
      .servers()
      .usage(),
  });
}
