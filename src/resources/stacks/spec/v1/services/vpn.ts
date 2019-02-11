export interface VPN {
  auth: VPNAuth;
  allow_internet: boolean;
}

export interface VPNAuth {
  auth_api: AuthAPI | null;
  allow_cycle_accounts: boolean;
  allow_environment_accounts: boolean;
}

export interface AuthAPI {
  allow: boolean;
  url: string;
}
