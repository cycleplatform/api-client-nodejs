export interface StackImage {
    name: string;
    source: ImageSource;
    preload: boolean;
}

export interface ImageSource {
    docker_hub?: DockerHubSource;
    docker_registry?: DockerRegistrySource;
    local?: LocalSource;
    repo?: RepoSource;
    inherit?: InheritSource;
}

export interface DockerHubSource {
    target: string;
}

export interface DockerRegistrySource {
    target: string;
}

export interface LocalSource {
    path: string;
}

export type RepoProtocol = "http" | "https" | "ssh";

export interface RepoSource {
    path: string;
    url: string;
    tag: string;
    protocol: RepoProtocol;
    private_key?: string;
    private_key_url?: string;
}

export interface InheritSource {
    container: string;
}
