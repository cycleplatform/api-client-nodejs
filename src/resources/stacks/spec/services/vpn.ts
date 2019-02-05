export interface VPN {
  logins: VPNLogins;
  allow_internet_access: boolean;
  auth_api: AuthAPI;
}

export interface VPNLogins {
  allow_cycle_accounts: boolean;
  allow_environment_accounts: boolean;
}

export interface AuthAPI {
  allow: boolean;
  url: string;
}
