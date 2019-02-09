import { PacketProvider } from "./packet";
import { VultrProvider } from "./vultr";

export interface Providers {
  packet: PacketProvider | null;
  vultr: VultrProvider | null;
}

export * from "./packet";
export * from "./vultr";
