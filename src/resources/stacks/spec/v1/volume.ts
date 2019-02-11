import { DataSize, Webhook, Algorithm } from "../../../../common/structs";

export interface Volume {
  read_only: boolean;
  local: LocalVolume | null;
  destination: string;
  remote_access: VolumeRemoteAccess;
}

export interface LocalVolume {
  max_size: DataSize;
}

export interface VolumeRemoteAccess {
  enable: boolean;
  ips?: AuthorizedIp[];
  webhook: Webhook;
  password: VolumePassword | null;
}

export interface AuthorizedIp {
  ip: string;
  read_only: boolean;
  password: VolumePassword | null;
}

export interface VolumePassword {
  algorithm: Algorithm;
  data: string;
}
