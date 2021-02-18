import { Service } from "./common";
import {
  ResourceId,
  Resource,
  UserScope,
  Events,
  CollectionDoc,
  SingleDoc,
  CreatedTask,
  Time,
  Webhook,
} from "../../../common/structs";
import { links, StandardParams } from "../../../common/api";
import * as Request from "../../../common/api/request";

/**
 * Information about a VPN service configuration
 */
export interface VPNService extends Service {
  config: VPN;
}

/**
 * Information about a VPN service auth and network settings
 */
export interface VPN {
  auth: VPNAuth;
  /** A boolean where true represents the VPN container accepting approved connections */
  allow_internet: boolean;
}

/**
 * VPN service authorization information
 */
export interface VPNAuth {
  webhook: Webhook | null;
  /** A boolean, where true represents the ability for a user to log in to the VPN with their Cycle credentials */
  cycle_accounts: boolean;
  /** A boolean, where true represents configured VPN accounts to log in to the VPN */
  vpn_accounts: boolean;
}

/**
 * An extended resource which includes information on a VPN user
 */
export interface VPNUser extends Resource {
  /** A username for the VPN user */
  username: string;
  creator: UserScope;
  last_login: Time;
  hub_id: ResourceId;
  environment_id: ResourceId;
  events: Events;
}

/**
 * An extended resource which includes VPN login information
 */
export interface VPNLogin extends Resource {
  /** The username for the VPN user */
  username: string;
  environment_id: ResourceId;
  /** The IP of the user who is logging into the VPN service */
  ip: string;
  time: Time;
  /** A boolean, where true represents a successful login */
  success: boolean;
}

/**
 * Information containing VPN reconfiguration details
 */
export interface VPNReconfigureDetails {
  /** A boolean, where true represents the ability to reconfigure a VPN's configuration */
  enable?: boolean;
  /** A partial configuration file for a VPN -- see VPN */
  config?: Partial<VPN>;
}

export type VPNUsersDoc = CollectionDoc<VPNUser>;
export type VPNUserDoc = SingleDoc<VPNUser>;

export type VPNLoginsDoc = CollectionDoc<VPNLogin>;

/**
 * Information about a VPN service, including the VPN's url
 */
export interface VPNInfo {
  /** A url associated with the VPN service */
  url: string;
  service: VPNService;
}

export async function getVPNInfo(
  params: StandardParams & {
    environmentId: ResourceId;
  },
) {
  return Request.getRequest<{ data: VPNInfo }>({
    ...params,
    target: links.environments().services().vpn().details(params.environmentId),
  });
}

export async function getVPNLogins(
  params: StandardParams & {
    environmentId: ResourceId;
  },
) {
  return Request.getRequest<VPNLoginsDoc>({
    ...params,
    target: links.environments().services().vpn().logins(params.environmentId),
  });
}

export async function getVPNUsers(
  params: StandardParams & {
    environmentId: ResourceId;
  },
) {
  return Request.getRequest<VPNUsersDoc>({
    ...params,
    target: links.environments().services().vpn().users(params.environmentId),
  });
}

export interface CreateVPNUserParams {
  username: string;
  password: string;
}

export async function createVPNUser(
  params: StandardParams & {
    environmentId: ResourceId;
    value: CreateVPNUserParams;
  },
) {
  return Request.postRequest<VPNUserDoc>({
    ...params,
    target: links.environments().services().vpn().users(params.environmentId),
  });
}

export async function deleteVPNUser(
  params: StandardParams & {
    environmentId: ResourceId;
    userId: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links
      .environments()
      .services()
      .vpn()
      .user(params.environmentId, params.userId),
  });
}

export type VPNAction = "reconfigure";

export async function reconfigureVPN(
  params: StandardParams & {
    environmentId: ResourceId;
    value: VPNReconfigureDetails;
  },
) {
  return Request.postRequest<CreatedTask<VPNAction>>({
    ...params,
    target: links.environments().services().vpn().tasks(params.environmentId),
    value: {
      action: "reconfigure",
      contents: params.value,
    },
  });
}
