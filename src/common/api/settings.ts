import { ResourceId } from "../structs";

/**
 * Standard API call settings object.
 */
export interface Settings {
    /**
     * Overrides base url, so it can be pointed to a thin client
     */
    url?: string;

    /**
     * Sets the project scope
     */
    project?: ResourceId;

    /**
     * allow force http
     */
    useHttp?: boolean;
}

export interface ProjectRequiredSettings extends Settings {
    project: ResourceId;
}
