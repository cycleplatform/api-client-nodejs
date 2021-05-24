export type Origin =
  | OriginBase<"docker-file">
  | OriginBase<"docker-hub">
  | OriginBase<"docker-registry">;
// | OriginBase<"git-repo">;

/** ### `interface ImageOriginBase`
 * This interface is only for non-stack related image origins. Stacks will
 * eventually move to this style of `type` and `details` to describe the
 * origin.
 *
 * ---
 *
 * ### Cycle Info
 * __Something doesn't look right or work as intended?__ \
 * Help us make a better TypeScript Platform Interface by submitting an issue on
 * [Cycles Github](https://github.com/cycleplatform/api-client-nodejs) or
 * forking our repo and submitting a
 * [Pull Request](https://github.com/cycleplatform/api-client-nodejs/pulls).
 *
 * [General Docs](https://docs.cycle.io) /
 * [Public API Docs](https://docs.cycle.io/api/introduction) /
 * [Internal API Docs](https://docs.cycle.io/internal-api/introduction) /
 * [Cycle's Website](https://cycle.io)
 *
 * ---
 *
 * Last Updated: 2021.01.28 — Grady S
 */
export interface OriginBase<T extends AllOriginsKeys> {
  /**
   * Key of the origin. Can be any of the following:
   * - `docker-hub`
   * - `docker-registry`
   * - `git-repo`
   * - `docker-file`
   */
  type: T;
  details: AllOrigins[T];
}

export interface AllOrigins {
  "docker-hub": DockerHub;
  "docker-registry": DockerRegistry;
  // "git-repo": Repo;
  "docker-file": Dockerfile;
}

export type AllOriginsKeys = keyof AllOrigins;

/****************************** Sources ******************************/

/** Describes an image imported from the official Docker Hub registry */
export interface DockerHub {
  /** The image and tag, formatted like `image:tag` */
  target: string;
  /** Username for Docker Hub */
  username?: string;
  /** Auth token for Docker Hub. Cycle will remember this for the target specified */
  token?: string;
}

/** Describes an image imported from a private registry */
export interface DockerRegistry extends DockerHub {
  /** URL to the private registry */
  url: string;
  /** Password to the private registry */
  password?: string;
}

export type Dockerfile = DockerfileWithRepo | DockerfileWithTar;

export interface DockerfileRegistryCredentials {
  url?: string;
  username?: string;
  token?: string;
}

interface BaseDockerfile {
  /** Directory of where the BuildFile is located */
  context_dir?: string;
  /** Name of the BuildFile */
  build_file?: string;
  credentials?: DockerfileRegistryCredentials[];
}

export interface DockerfileWithRepo extends BaseDockerfile {
  repo?: Repo;
  targz_url?: never;
}

export interface DockerfileWithTar extends BaseDockerfile {
  repo?: never;
  targz_url?: string;
}
export interface Repo {
  url: string;
  auth?: RepoAuth;
  ref?: Ref;
  branch?: string;
}

export type RepoAuth = RepoAuthBase<"http"> | RepoAuthBase<"ssh">;

export interface RepoAuthBase<T extends AllAuthTypeKeys> {
  type: T;
  credentials: AllAuthTypesMap[T];
}

export interface AllAuthTypesMap {
  http: HTTPAuth;
  ssh: SSHAuth;
}

export type AllAuthTypeKeys = keyof AllAuthTypesMap;

export interface HTTPAuth {
  username: string;
  password: string;
}

export interface SSHAuth {
  username: string;
  passphrase: string;
  private_key: string;
}

export interface Ref {
  type: "hash" | "tag";
  value: string;
}
