import { Time, ResourceId } from "../../../common/structs";
import { StandardParams, links } from "../../../common/api";
import { InstanceState } from "../instances";
import * as Request from "../../../common/api/request";

//* A collection of telemetry points for an instance */
export type Collection = {
  data: TelemetryPoint[];
};
/** A single telemetry point for an instance */
export interface TelemetryPoint {
  time: Time;
  // TODO: Need to figure out details
  instances: Record<InstanceState, number>;
}

export async function getInstancesTelemetry(
  params: StandardParams & {
    containerId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.containers().telemetry().instances(params.containerId),
  });
}
