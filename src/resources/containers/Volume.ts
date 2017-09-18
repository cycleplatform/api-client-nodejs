import { Resource, ResourceId } from "../../common/Structs";

export interface Volume extends Resource {
    volume_plan_id: ResourceId;
    path: string;
    remote_access: boolean;
}
