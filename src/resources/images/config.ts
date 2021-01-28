export interface Config {
  /**
   * the linux user to be used. Examples would be:
   * - `nginx`
   * - `apache`
   * - `root`
   * - etc...
   */
  user: string;
  ports: Port[];
  env: Record<string, string>;
  labels: Record<string, string>;
  command: string[];
  onbuild: string[];
  entrypoint: string[];
  volumes: Volume[];
  workdir: string;
  signal_stop?: string;
}

export interface Port {
  type: string;
  host: number;
  container: number;
}

export type VolumeMode = "ro" | "rw";

export interface Volume {
  path: string;
  mode: VolumeMode;
}
