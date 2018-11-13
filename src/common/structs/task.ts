import { ResourceId } from "./doc";

/**
 * Object structure for creating a job
 */
export interface Task<T extends string, K = {}> {
  action: T;
  contents?: K;
}

/**
 * Return value of requests that create jobs
 */
export interface CreatedTask<T extends string, K = {}> {
  data: {
    action: T;
    contents?: K;
    job_id: ResourceId;
  };
}
