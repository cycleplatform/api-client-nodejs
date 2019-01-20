import { Time, ResourceId } from "../../../common/structs";
import { Token } from "../../../auth/token";
import { QueryParams, Settings, links } from "../../../common/api";
import { InstanceState } from "../../containers/instances";
import * as Request from "../../../common/api/request";

export type Collection = {
  data: TelemetryPoint[];
};

export interface TelemetryPoint {
  time: Time;
  instances: Record<InstanceState, number>;
}

export async function getInstancesTelemetry({
  environmentId,
  token,
  query,
  settings,
}: {
  environmentId: ResourceId;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links
      .environments()
      .telemetry()
      .instances(environmentId),
  });
}
