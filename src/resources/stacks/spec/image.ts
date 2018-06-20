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
    /** Path the Dockerfile is located in */
    path: string;
    /** Equivalent of docker-compose context. Use this Dockerfile to build the path. */
    build_file: string | null;
}

export type RepoProtocol = "http" | "https" | "ssh";

export interface RepoSource {
    path: string;
    tag: string;
    /** Equivalent of docker-compose context. Use this Dockerfile to build the path. */
    build_file: string | null;
    
    /** Build Params */

    url: string;
    protocol: RepoProtocol;
    private_key?: string;
    private_key_url?: string;
}

export interface InheritSource {
    container: string;
}
