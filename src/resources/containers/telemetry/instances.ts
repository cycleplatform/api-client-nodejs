import { Time, ResourceId } from "../../../common/structs";
import { StandardParams, links } from "../../../common/api";
import { InstanceState } from "../instances";
import * as Request from "../../../common/api/request";

export type Collection = {
  data: TelemetryPoint[];
};

export interface TelemetryPoint {
  time: Time;
  instances: Record<InstanceState, number>;
}

export async function getInstancesTelemetry(
  params: StandardParams & {
    containerId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .containers()
      .telemetry()
      .instances(params.containerId),
  });
}
