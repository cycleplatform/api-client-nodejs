import { DataSize, Webhook, Algorithm } from "../../../../common/structs";

export interface Volume {
  read_only: boolean;
  local?: LocalVolume;
  destination: string;
  remote_access?: VolumeRemoteAccess;
}

export interface LocalVolume {
  max_size: DataSize;
  performance?: boolean;
}

export interface VolumeRemoteAccess {
  enable: boolean;
  ips?: AuthorizedIp[];
  web_hook?: Webhook;
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
