import { Time, ResourceId } from "common/structs";
import { StandardParams, links, getRequest } from "common/api";
import { InstanceState } from "resources/containers/instances";

export type Collection = {
  data: TelemetryPoint[];
};

export interface TelemetryPoint {
  time: Time;
  instances: Record<InstanceState, number>;
}

export async function getInstancesTelemetry(
  params: StandardParams & {
    environmentId: ResourceId;
  },
) {
  return getRequest<Collection>({
    ...params,
    target: links
      .environments()
      .telemetry()
      .instances(params.environmentId),
  });
}
