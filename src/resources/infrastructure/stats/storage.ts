import { Megabytes } from "../../../common/structs";

export interface StorageStats {
  volume_groups: VolumeGroup[] | null;
  mounts: { [key: string]: MountedFS };
}

export interface VolumeGroup {
  name: string;
  size: Megabytes;
  volumes: Volume[];
}

export interface Volume {
  name: string;
  size: Megabytes;
  data_percent: number;
  meta_percent: number;
  pool: string;
}

export interface MountedFS {
  device?: string;
  type: string;
  mountpoint?: string;
  total: number;
  free: number;
  used: number;
}
