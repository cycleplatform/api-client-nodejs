import { Time, ResourceId } from "../../../common/structs";
import { Token } from "../../../auth/token";
import { QueryParams, Settings, getRequest, links } from "../../../common/api";
import { InstanceState } from "../instances";

export type Collection = {
  data: TelemetryPoint[];
};

export interface TelemetryPoint {
  time: Time;
  instances: Record<InstanceState, number>;
}

export async function getInstancesTelemetry({
  containerId,
  token,
  query,
  settings,
}: {
  containerId: ResourceId;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return getRequest<Collection>({
    query,
    token,
    settings,
    target: links
      .containers()
      .telemetry()
      .instances(containerId),
  });
}
