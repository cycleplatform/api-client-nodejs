import * as Request from "../../../common/api";
import { links, StandardParams } from "../../../common/api";

export type Single = { data: DeploymentStrategy };

const strategyTypes = [
  "resource-density",
  "high-availability",
  "first-available",
  "manual",
  "ephemeral",
] as const;

export type StrategyTypes = typeof strategyTypes[number];

export type DeploymentStrategy = { name: string; description: string };

export async function getSingle(params: StandardParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.infrastructure().strategies(),
  });
}
