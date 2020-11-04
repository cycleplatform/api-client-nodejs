import { EquinixMetalProvider } from "./equinix-metal";
import { VultrProvider } from "./vultr";
import { AWSProvider } from "./aws";

export interface Providers {
  equinix_metal: EquinixMetalProvider | null;
  vultr: VultrProvider | null;
  aws: AWSProvider | null;
}

export * from "./equinix-metal";
export * from "./vultr";
