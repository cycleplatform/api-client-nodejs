import * as Request from "../../../common/api";
import { links, StandardParams } from "../../../common/api";

export type Single = { data: DeploymentStrategy };

export interface DeploymentStrategy {
  [key: string]: string;
}

export async function getSingle(params: StandardParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.infrastructure().strategies(),
  });
}
