import { Resource, ResourceId } from "../../common/Structs";

export interface Volume extends Resource {
    volume_plan: ResourceId;
    path: string;
    remote_access: boolean;
}
