import { PacketProvider } from "./packet";
import { VultrProvider } from "./vultr";
import { AWSProvider } from "./aws";

export interface Providers {
  packet: PacketProvider | null;
  vultr: VultrProvider | null;
  aws: AWSProvider | null;
}

export * from "./packet";
export * from "./vultr";
