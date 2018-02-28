export interface Image {
    name: string;
    source: ImageSource;
    preload: boolean;
}

export interface ImageSource {
    docker_hub?: DockerHubSource;
    docker_registry?: DockerRegistrySource;
    docker_file?: LocalSource;
    repo?: RepoSource;
    inherit?: InheritSource;
}

export interface DockerHubSource {
    target: string;
    username?: string;
    password?: string;
}

export interface DockerRegistrySource extends DockerHubSource {
    url: string;
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
