import { Time, ResourceId } from "../../../../common/structs";
import {
  connectToSocket,
  StandardParams,
  links,
  getRequest,
} from "../../../../common/api";

export interface ResourceSnapshot {
  time: Time;
  hub_id?: ResourceId;
  container_id?: ResourceId;
  instance_id?: ResourceId;
  environment_id?: ResourceId;
  cpu: CPUSnapshot;
  memory: MemorySnapshot;
  processes: ProcessesSnapshot;
  hugetlb?: Record<string, HugeTLB>;
}

export interface CPUSnapshot {
  usage: CPUUsage;
}

export interface CPUUsage {
  total: number;
  per_core: number[];
  kernel: number;
  user: number;
}

export interface CPUThrottling {
  periods?: number;
  throttled_periods?: number;
  trhottled_time?: number;
}

export interface MemorySnapshot {
  cache?: number;
  usage?: MemoryData;
  swap_usage?: MemoryData;
  kernel_usage?: MemoryData;
  kernel_tcp_usage?: MemoryData;
}

export interface ProcessesSnapshot {
  current?: number;
  limit?: number;
}

export interface MemoryData {
  usage?: number;
  max_usage?: number;
  fail_count?: number;
  limit?: number;
}

export interface HugeTLB {
  usage?: number;
  max?: number;
  fail_count?: number;
}

export async function getInstanceResourcesTelemetryReport(
  params: StandardParams & {
    containerId: ResourceId;
  },
) {
  return getRequest<ResourceSnapshot>({
    ...params,
    target: links.containers().instances().collection(params.containerId),
  });
}

export interface TelemetryStreamParams extends StandardParams {
  id: ResourceId;
  containerId: ResourceId;
  /** optional typed onmessage handler */
  onMessage?: (v: ResourceSnapshot) => void;
}

export interface TelemetryAuthResponse {
  data: {
    token: string;
    address: string;
  };
}

export async function getInstanceResourceTelemetryStream(
  params: TelemetryStreamParams,
) {
  const target = links
    .containers()
    .instances()
    .telemetry()
    .resourcesStream(params.id, params.containerId);

  const authResp = await getRequest<TelemetryAuthResponse>({
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
  });
}
