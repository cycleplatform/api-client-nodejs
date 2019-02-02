import { Time, ResourceId } from "../../../common/structs";
import { StandardParams, links } from "../../../common/api";
import { InstanceState } from "../../containers/instances";
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
    environmentId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .environments()
      .telemetry()
      .instances(params.environmentId),
  });
}
