import { Time, ResourceId } from "../../../common/structs";
import { StandardParams, links } from "../../../common/api";
import { InstanceState } from "../../containers/instances";
import * as Request from "../../../common/api/request";

// TODO: instances in telemetry point needs to be more specific not sure what that is
/**
 * Information including a collection of telemetry data points
 */
export type Collection = {
  data: TelemetryPoint[];
};
/**
 * Information about a single telemetry point
 */
export interface TelemetryPoint {
  time: Time;
  /** The instance state and number */
  instances: Record<InstanceState, number>;
}

export async function getInstancesTelemetry(
  params: StandardParams & {
    environmentId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.environments().telemetry().instances(params.environmentId),
  });
}
