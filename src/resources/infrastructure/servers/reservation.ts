import { Resource, ResourceId, IP, State } from "../../../common/structs";
import { Kind, IPNet } from "../../../resources/network";
import { ProviderIdentifier } from "../provider";

export interface Reservation extends Resource {
  container_id: ResourceId;
  cloud_id: ResourceId;
  kind: Kind;
  provider: Provider;
  ip: IPNet;
  gateway: IP;
  netmask: IP;
  network: IP;
  state: State;
}

export interface Provider {
  provider: ProviderIdentifier;
  location: string;
  reservation: string;
}
