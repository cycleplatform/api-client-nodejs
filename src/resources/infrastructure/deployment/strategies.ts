import { SingleDoc, Resource } from "common/structs";
import * as Request from "../../../common/api";
import { links } from "../../../common/api";

export type Single = SingleDoc<DeploymentStrategy>;

export interface DeploymentStrategy extends Resource {
  name: string;
  description: string;
}

export async function getSingle() {
  return Request.getRequest<Single>({
    target: links.infrastructure().strategies(),
  });
}
