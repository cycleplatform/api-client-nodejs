export interface StackImage {
    source: StackImageSource;
    target: string;
    preload: boolean;
    name: string;
}

export type StackImageSource =
    | "docker_hub"
    | "docker_registry"
    | "local"
    | "oci-image";
