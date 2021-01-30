import { DockerHubSource } from "./docker-hub";
import { DockerRegistrySource } from "./docker-registry";
import { RepoSource } from "./git-repo";
import { LocalSource } from "./local-source";

export type Origin =
  | OriginBase<"docker-file">
  | OriginBase<"docker-hub">
  | OriginBase<"docker-registry">
  | OriginBase<"git-repo">;

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
  "docker-hub": DockerHubSource;
  "docker-registry": DockerRegistrySource;
  "git-repo": RepoSource;
  "docker-file": LocalSource;
}

export type AllOriginsKeys = keyof AllOrigins;
