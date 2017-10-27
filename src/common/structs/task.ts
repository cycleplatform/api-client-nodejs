import { ResourceId } from "./doc";

export interface Task<T extends string, K = {}> {
    action: T;
    contents?: K;
}

export interface CreatedTask<T extends string, K = {}> {
    data: {
        action: T;
        contents?: K;
        job_id: ResourceId;
    };
}
