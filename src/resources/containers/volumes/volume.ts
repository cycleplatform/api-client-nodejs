import { Spec } from "../../stacks";

export interface ContainerVolume {
    id: string;
    hash: string;
    config: Spec.Volume;
}
