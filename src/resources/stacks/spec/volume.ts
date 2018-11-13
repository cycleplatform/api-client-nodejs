import { DataSize, Webhook } from "../../../common/structs";

export interface Volume {
  read_only: boolean;
  local?: LocalVolume;
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
  raw?: string;
  sha512?: string;
  md5?: string;
}
