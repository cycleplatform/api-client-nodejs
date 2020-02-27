export interface Image {
  name: string;
  source: ImageSource;
}

export interface ImageSource {
  docker_hub?: DockerHubSource;
  docker_registry?: DockerRegistrySource;
  docker_file?: LocalSource;
  repo?: RepoSource;
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
  dir?: string;
  /** Equivalent of docker-compose context. Use this Dockerfile to build the path. */
  build_file: string;
}

export type RepoProtocol = "http" | "https" | "ssh";
export interface Repo {
  url: string;
  protocol: RepoProtocol;
  private_key?: string;
  private_key_url?: string;
}

export interface RepoSource extends LocalSource, Repo {
  tag?: string;
}
