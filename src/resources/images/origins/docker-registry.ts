import { DockerHubSource } from "./docker-hub";
/** Describes an image imported from a private registry */
export interface DockerRegistrySource extends DockerHubSource {
  /** URL to the private registry */
  url: string;
  /** Password to the private registry */
  password?: string;
}
