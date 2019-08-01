import * as Request from "../../../common/api/request";
import { links, StandardParams } from "../../../common/api";
import { ResourceId } from "../../../common/structs";
import { connectToSocket } from "../../../common/api/websocket";

export interface ConsolePipelineParams extends StandardParams {
  id: ResourceId;
  containerId: ResourceId;
  /** optional typed onmessage handler */
  onMessage?: (v: string) => void;
}

export interface ConsolePipelineResponse {
  data: {
    token: string;
    address: string;
  };
}

export async function connectToConsole(params: ConsolePipelineParams) {
  const target = links
    .containers()
    .instances()
    .console(params.id, params.containerId);

  const secretResp = await Request.getRequest<ConsolePipelineResponse>({
    target,
    hubId: params.hubId,
    token: params.token,
    settings: params.settings,
  });

  if (!secretResp.ok) {
    return secretResp;
  }

  return connectToSocket({
    target: "",
    token: secretResp.value.data.token,
    settings: {
      url: `${secretResp.value.data.address}`,
      noVersion: true,
    },
    onMessage: params.onMessage,
    noJsonDecode: true,
  });
}
