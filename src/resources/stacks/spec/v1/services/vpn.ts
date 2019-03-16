import { Webhook } from "../../../../../common/structs";

export interface VPN {
  auth: VPNAuth;
  allow_internet: boolean;
}

export interface VPNAuth {
  webhook: Webhook;
  cycle_accounts: boolean;
  vpn_accounts: boolean;
}
