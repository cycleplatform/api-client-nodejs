import { Service } from "./common";
import {
  ResourceId,
  Resource,
  OwnerScope,
  Events,
  CollectionDoc,
  SingleDoc,
  CreatedTask,
  Time,
} from "../../../common/structs";
import { links, StandardParams } from "../../../common/api";
import * as Request from "../../../common/api/request";

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

export interface VPNService extends Service {
  config: VPN;
}

export interface VPNUser extends Resource {
  username: string;
  owner: OwnerScope;
  last_login: Time;
  hub_id: ResourceId;
  environment_id: ResourceId;
  events: Events;
}

export interface VPNLogin extends Resource {
  username: string;
  environment_id: ResourceId;
  ip: string;
  time: Time;
  success: boolean;
}

export interface VPNReconfigureDetails {
  enable?: boolean;
  config?: Partial<VPN>;
}

export type VPNUsersDoc = CollectionDoc<VPNUser>;
export type VPNUserDoc = SingleDoc<VPNUser>;

export type VPNLoginsDoc = CollectionDoc<VPNLogin>;

export interface VPNInfo {
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
    target: links
      .environments()
      .services()
      .vpn()
      .details(params.environmentId),
  });
}

export async function getVPNLogins(
  params: StandardParams & {
    environmentId: ResourceId;
  },
) {
  return Request.getRequest<VPNLoginsDoc>({
    ...params,
    target: links
      .environments()
      .services()
      .vpn()
      .logins(params.environmentId),
  });
}

export async function getVPNUsers(
  params: StandardParams & {
    environmentId: ResourceId;
  },
) {
  return Request.getRequest<VPNUsersDoc>({
    ...params,
    target: links
      .environments()
      .services()
      .vpn()
      .users(params.environmentId),
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
  return Request.postRequest<VPNUsersDoc>({
    ...params,
    target: links
      .environments()
      .services()
      .vpn()
      .users(params.environmentId),
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

export type Action = "reconfigure";

export async function reconfigure(
  params: StandardParams & {
    environmentId: ResourceId;
    value: VPNReconfigureDetails;
  },
) {
  return Request.postRequest<CreatedTask<Action>>({
    ...params,
    target: links
      .environments()
      .services()
      .vpn()
      .tasks(params.environmentId),
    value: {
      action: "reconfigure",
      contents: params.value,
    },
  });
}
