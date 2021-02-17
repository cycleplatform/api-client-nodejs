import { Time, ResourceId } from "../../../../common/structs";
import {
  connectToSocket,
  StandardParams,
  links,
  getRequest,
} from "../../../../common/api";

/**
 * A resource telemetry snapshot
 */
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

/**
 * CPU usage and throttling combined
 */
export interface CPUSnapshot {
  usage: CPUUsage;
  throttling: CPUThrottling;
}

/**
 * CPU usage statistics
 */
export interface CPUUsage {
  /**  Total amount of CPU time since last restart */
  total: number;
  /** An array showing CPU core specific usage in nanoseconds since the last restart */
  per_core: number[];
  /** The amount of time in nanoseconds used by the kernel since last restart */
  kernel: number;
  /** The amount of time in nanoseconds taken up for user processes */
  user: number;
}
/** CPU throttling information  */
export interface CPUThrottling {
  /** The amount of periods that have passed since the last restart */
  periods?: number;
  /** How many times this instance has been throttled for using all its alloted CPU during a period */
  throttled_periods?: number;
  /** The amount of time in nanoseconds this instance has spent with throttled CPU resources */
  throttled_time?: number;
}

/**
 * Memory usage statistics
 */
export interface MemorySnapshot {
  /** The number of bytes of page cache memory being used by this instance */
  cache?: number;
  usage?: MemoryData;
  swap_usage?: MemoryData;
  kernel_usage?: MemoryData;
  kernel_tcp_usage?: MemoryData;
}

/**
 * Information about the running processes in the instance
 */
export interface ProcessesSnapshot {
  /** The current number of running processes in the instance */
  current?: number;
  /** The maximum number of running processes allowed in this instance */
  limit?: number;
}

/**
 * Memory usage data
 */
export interface MemoryData {
  /** The number of bytes of memory being used by this instance at the time of this report */
  usage?: number;
  /** The highest amount of memory usage since last restart */
  max_usage?: number;
  /** The # of times the memory limit was exceeded for this instance */
  fail_count?: number;
  /** The maximum # of bytes of memory this instance could use */
  limit?: number;
}

/**
 * HugeTLB data
 */
export interface HugeTLB {
  /** The number of bytes being consumed by huge pages of all sizes, for this instance at the time of this report */
  usage?: number;
  /** The maximum number of bytes allowed to be used for huge pages for this instance */
  max?: number;
  /** The number of times the hugeTLB memory limit has been exceeded by this instance */
  fail_count?: number;
}

/**
 * Instance telemetry report request information
 */
export interface ReportRequest {
  instance_id: ResourceId;
  start: Time;
  end: Time;
}

/**
 * Instance telemetry report
 */
export interface InstanceResourceTelemetryReport {
  request: ReportRequest;
  snapshots: ResourceSnapshot[];
}

export async function getInstanceResourcesTelemetryReport(
  params: StandardParams & {
    id: ResourceId;
    containerId: ResourceId;
  },
) {
  return getRequest<{ data: InstanceResourceTelemetryReport }>({
    ...params,
    target: links
      .containers()
      .instances()
      .telemetry()
      .resourcesReport(params.id, params.containerId),
  });
}

// todo

export interface TelemetryStreamParams extends StandardParams {
  id: ResourceId;
  containerId: ResourceId;
  /** optional typed onmessage handler */
  onMessage?: (v: ResourceSnapshot) => void;
}

/**
 * An auth response including a token and address
 */

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
