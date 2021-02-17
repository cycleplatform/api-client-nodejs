import * as Request from "../../../common/api/request";
import { links, StandardParams } from "../../../common/api";
import { ResourceId } from "../../../common/structs";
import { connectToSocket } from "../../../common/api/websocket";

/**
 * Parameters needed to connect to the console
 */
export interface ConsolePipelineParams extends StandardParams {
  id: ResourceId;
  containerId: ResourceId;
  /** optional typed onmessage handler */
  onMessage?: (v: string) => void;
}

/**
 * An auth response from console authentication
 */
export interface ConsoleAuthResponse {
  /** Data - including a auth token and address */
  data: {
    /** An auth token for the console authentication */
    token: string;
    /** An address TODO  */
    address: string;
  };
}

export async function connectToConsole(params: ConsolePipelineParams) {
  const target = links
    .containers()
    .instances()
    .console(params.id, params.containerId);

  const authResp = await Request.getRequest<ConsoleAuthResponse>({
    target,
    hubId: params.hubId,
    token: params.token,
    settings: params.settings,
  });

  if (!authResp.ok) {
    return authResp;
  }

  return connectToSocket({
    target: "",
    token: authResp.value.data.token,
    settings: {
      url: `${authResp.value.data.address}`,
      noVersion: true,
    },
    onMessage: params.onMessage,
    noJsonDecode: true,
  });
}
