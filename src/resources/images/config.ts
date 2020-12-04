/**
 * Image configuration information
 */

export interface Config {
  /** The creator of the image */
  creator: string;
  ports: Port[];
  /** Image environment variables */
  env: Record<string, string>;
  /** Labels for the image */
  labels: Record<string, string>;
  /** The startup command for the image */
  command: string[];
  /** Onbuild commands for the image */
  onbuild: string[];
  /** The image entrypoint */
  entrypoint: string[];
  /** An array of volume resources */
  volumes: Volume[];
  /** The working directory for the image */
  workdir: string;
  /** todo */
  signal_stop?: string;
}

/** Port information  */
export interface Port {
  // no clue what this is todo
  type: string;
  /** The port number for the host side of the pair */
  host: number;
  /** The internal port number where traffic from host will be sent */
  container: number;
}

/**
 * Volume configuration - either read only (ro) or read write (rw)
 */
export type VolumeMode = "ro" | "rw";

/**
 * Volume information including the path it is stored on and the mode
 */
export interface Volume {
  path: string;
  mode: VolumeMode;
}
