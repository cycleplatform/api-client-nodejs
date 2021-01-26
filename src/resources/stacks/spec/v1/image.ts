import {
  Events,
  Resource,
  ResourceId,
  State,
  UserScope,
} from "../../../../common/structs";

export interface SpecImage {
  name: string;
  source: ImageSource<{}, StackImageOrigin>;
}

export type Origin = ImageOrigin | StackImageOrigin;

export interface ImageSource<M = {}, T extends Origin = ImageOrigin>
  extends Resource<M> {
  name: string;
  about?: AboutImage;
  origin: T;
  creator: UserScope;
  hub_id: ResourceId;
  state: State<ImageSourceState>;
  events: Events;
}

export type ImageSourceState = "live" | "deleting" | "deleted";

export interface ImageOrigin {
  docker_hub?: DockerHubSource;
  docker_registry?: DockerRegistrySource;
  docker_file?: LocalSource;
  repo?: RepoSource;
}

export type StackImageOrigin = ImageOrigin & {
  cycle?: CycleImageSource;
};

/** Describes an image imported from the official Docker Hub registry */
export interface DockerHubSource {
  /** The image and tag, formatted like `image:tag` */
  target: string;
  /** Username for Docker Hub */
  username?: string;
  /** Auth token for Docker Hub. Cycle will remember this for the target specified */
  token?: string;
}

/** Describes an image imported from a private registry */
export interface DockerRegistrySource extends DockerHubSource {
  /** URL to the private registry */
  url: string;
  /** Password to the private registry */
  password?: string;
}

/** Describes an image to be built off local code (inside a repo) */
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

export interface CycleImageSource {
  source_id?: ResourceId;
}

export interface AboutImage {
  description: string | null;
}
