import {
    CollectionDoc,
    Resource,
    SingleDoc,
    Events,
    State,
    OwnerScope,
    ResourceId,
} from "../../common/structs";

export type Collection = CollectionDoc<Secret>;
export type Single = SingleDoc<Secret>;
export type SecretState = "live" | "deleting" | "deleted";

export interface Secret extends Resource {
    owner: OwnerScope;
    project_id: ResourceId;
    environment_id: ResourceId;
    container_id: ResourceId | null;
    identifier: string;
    url: string | null;
    state: State<SecretState>;
    events: Events;
}
