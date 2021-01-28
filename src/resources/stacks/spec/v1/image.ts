import {
  Events,
  Resource,
  ResourceId,
  State,
  UserScope,
} from "../../../../common/structs";

export interface SpecImage {
  name: string;
  source: StackImageOrigin;
}

// export type Origin = ImageOrigin | StackImageOrigin;

export type ImageOrigin =
  | OriginBase<"docker-file">
  | OriginBase<"docker-hub">
  | OriginBase<"docker-registry">
  | OriginBase<"git-repo">;

/** ### `interface OriginBase`
 * This interface is only for none stack related image origins. Stacks will
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
  details: AllOriginsMap[T];
}

export interface AllOriginsMap {
  "docker-hub": DockerHubSource;
  "docker-registry": DockerRegistrySource;
  "git-repo": RepoSource;
  "docker-file": LocalSource;
}

export type AllOriginsKeys = keyof AllOriginsMap;

/** ### `interface ImageSource`
 * Image source object for a stack
 *
 * ### Important Notes
 * This image source object type will __ONLY__ work not work with stacks.
 * If you are looking for the image sources for a stack
 * use the `StackImageSource` interface exported from this same file.
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
export interface ImageSource<M = {}> extends Resource<M> {
  name: string;
  about?: AboutImage;
  origin: ImageOrigin;
  creator: UserScope;
  hub_id: ResourceId;
  state: State<ImageSourceState>;
  events: Events;
}

/** ### `interface StackImageSource`
 * Image source object for a stack
 *
 * ### Important Notes
 * This image source object type will __ONLY__ work for a stack. If you are looking
 * for the image sources for any other resource on Cycle use the `ImageSource`
 * interface exported from this same file.
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
export interface StackImageSource<M = {}> extends Resource<M> {
  name: string;
  about?: AboutImage;
  origin: StackImageOrigin;
  creator: UserScope;
  hub_id: ResourceId;
  state: State<ImageSourceState>;
  events: Events;
}

/** ### `type ImageSourceState`
 * Shared image source state.
 * Possible states can be the follow:
 * - `live`
 * - `deleting`
 * - `deleted`
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
export type ImageSourceState = "live" | "deleting" | "deleted";

/** ### `interface StackImageOrigin`
 * Available image origins for a stack
 *
 * ---
 *
 * ### Important Notes
 * These image origins will __ONLY__ work for a stack. If you are looking
 * for the image sources for any other resource on Cycle use the `ImageOrigin`
 * type exported from this same file.
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
export interface StackImageOrigin {
  docker_hub?: DockerHubSource;
  docker_registry?: DockerRegistrySource;
  docker_file?: LocalSource;
  repo?: RepoSource;
  cycle?: CycleImageSource;
}

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
